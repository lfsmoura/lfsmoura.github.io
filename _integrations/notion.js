const { Client, collectPaginatedAPI } = require("@notionhq/client");
const { NotionToMarkdown } = require("notion-to-md");
const dotenv = require("dotenv");
const fs = require("fs");
const YAML = require("yaml");
const kebabCase = require("just-kebab-case");
const axios = require("axios");
const path = require("path");

dotenv.config();

const getFileExtension = (response) => {
  try {
    const contentType = response.headers["content-type"];

    switch (contentType) {
      case "image/jpeg":
        return ".jpg";
      case "image/png":
        return ".png";
      case "image/gif":
        return ".gif";
      case "image/webp":
        return ".webp";
      default:
        return "";
    }
  } catch (error) {
    console.error("Error fetching the content type:", error);
  }
  return "";
};

// Function to download and save the image
const downloadImage = async (url, filePath) => {
  try {
    const response = await axios({
      method: "GET",
      url: url,
      responseType: "stream",
    });

    const outputFile = `${filePath}${getFileExtension(response)}`;
    const writer = fs.createWriteStream(outputFile);

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", () => resolve(outputFile));
      writer.on("error", reject);
    });
  } catch (error) {
    console.error("Failed to download or save the image:", error);
    throw error;
  }
};
// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

const syncNote = async ({ id, title, date, link }) => {
  const mdblocks = await n2m.pageToMarkdown(id);
  const frontMatter = {
    title,
    date,
    layout: "note",
    permalink: link || `/notes/${kebabCase(title)}`,
  };
  let index = 0;
  const processedBlocks = await Promise.all(
    mdblocks.map(async (block) => {
      if (block.type === "image") {
        const url = block.parent.match(/!\[.*\]\((.*)\)/)[1];
        let output = "";
        try {
          output = await downloadImage(
            url,
            path.resolve(__dirname, "../assets/note-images", `${id}_${index++}`)
          );
          const basePath = path.resolve(__dirname, "..");
          output = path.relative(basePath, output);
        } catch (error) {
          console.error("Error downloading image", error);
        }
        return {
          ...block,
          parent: block.parent.replace(/\(.*?\)/, `(${output})`),
        };
      }
      return block;
    })
  );
  const markdown = n2m.toMarkdownString(processedBlocks).parent;
  fs.writeFileSync(
    `notes/${id}.md`,
    `---\n${YAML.stringify(frontMatter)}---\n\n${
      n2m.toMarkdownString(mdblocks).parent
    }`
  );
};

const syncNotes = async () => {
  const result = await notion.databases.query({
    database_id: "eb052e4d211142909f0be0e8123568ed",
    filter: {
      property: "Type",
      select: {
        equals: "note",
      },
    },
  });
  if (result.object === "list") {
    for (let page of result.results) {
      await syncNote({
        id: page.id,
        title: page.properties.Name.title[0].text.content,
        date: page.created_time,
        link: page.properties.Link.url,
      });
    }
  }
};

// (async () => {
//   const result = await notion.databases.query({
//     database_id: "eb052e4d211142909f0be0e8123568ed",
//     filter: {
//       property: "Type",
//       select: {
//         equals: "note",
//       },
//     },
//   });
//   console.log(JSON.stringify(result, null, 2));
//   if (result.object === "list") {
//     const output = result.results.map((page) => ({
//       title: page.properties.Name.title[0].text.content,
//     }));
//     console.log();
//     fs.writeFileSync("_data/notes.yml", YAML.stringify(output));
//   }
// })();
//https://www.notion.so/eb052e4d211142909f0be0e8123568ed?v=&pvs=4
//https://www.notion.so/eb052e4d211142909f0be0e8123568ed?v=3ddf23b952b64138b40bc22bbcf64d6f&pvs=4

//84aae4f0-a131-4dec-9a7f-349e5e1da675

// (async () => {
//   //   const result = await notion.pages.retrieve({
//   //     page_id: "84aae4f0-a131-4dec-9a7f-349e5e1da675",
//   //   });
//   //   const blocks = await collectPaginatedAPI(notion.blocks.children.list, {
//   //     block_id: "84aae4f0-a131-4dec-9a7f-349e5e1da675",
//   //   });
//   //   console.log(JSON.stringify(blocks, null, 2));
//   const mdblocks = await n2m.pageToMarkdown(
//     "84aae4f0-a131-4dec-9a7f-349e5e1da675"
//   );
//   console.log(n2m.toMarkdownString(mdblocks));
//   const frontMatter = {
//     title: "Test",
//     date: "2021-09-10",
//     layout: "note",
//   };
//   fs.writeFileSync(
//     "notes/test3.md",
//     `---\n${YAML.stringify(frontMatter)}---\n\n${
//       n2m.toMarkdownString(mdblocks).parent
//     }`
//   );

//   //   if (result.object === "list") {
//   //     const output = result.results.map((page) => ({
//   //       title: page.properties.Name.title[0].text.content,
//   //     }));
//   //     console.log();
//   //     fs.writeFileSync("_data/notes.yml", YAML.stringify(output));
//   //   }
// })();

(async () => {
  await syncNotes();
})();

const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const UglifyJS = require("uglify-js");
const axios = require("axios");

async function inlineFile(filePath, type, isExternal = false) {
  let content;

  if (isExternal) {
    const response = await axios.get(filePath);
    content = response.data;
  } else {
    content = fs.readFileSync(filePath, "utf8");
  }

  switch (type) {
    case "js":
      const minifiedJs = UglifyJS.minify(content).code;
      return `<script>${minifiedJs}</script>`;
    case "img":
      if (isExternal) {
        const response = await axios.get(filePath, {
          responseType: "arraybuffer",
        });
        const base64 = Buffer.from(response.data).toString("base64");
        const ext = path.extname(filePath).substring(1);
        return `data:image/${ext};base64,${base64}`;
      } else {
        const ext = path.extname(filePath).substring(1);
        const base64 = fs.readFileSync(filePath).toString("base64");
        return `data:image/${ext};base64,${base64}`;
      }
  }
}

async function buildGame(gameName) {
  const srcDir = path.join(__dirname, "../src", gameName);
  const destDir = path.join(__dirname, "../_includes/dist");

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const html = fs.readFileSync(path.join(srcDir, "index.html"), "utf8");
  const $ = cheerio.load(html);

  // Collect CSS from head
  const headStyles = $("head style")
    .map((_, el) => $(el).html())
    .get()
    .join("\n")
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, " ")
    .replace(/'/g, "\\'");

  // Create CSS injector script if there are styles in head
  if (headStyles) {
    const styleInjector = `
      <script>
        (function() {
          const style = document.createElement('style');
          style.textContent = "${headStyles}";
          document.body.prepend(style);
        })();
      </script>
    `;
    $("body").append(styleInjector);
  }

  // Move JavaScript to body
  for (const script of $("script[src]").toArray()) {
    const src = $(script).attr("src");
    const isExternal = src.startsWith("http") || src.startsWith("//");
    const jsPath = isExternal ? src : path.join(srcDir, src);
    const inlinedJs = await inlineFile(jsPath, "js", isExternal);
    $("body").append(inlinedJs);
    $(script).remove();
  }

  // Inline images
  for (const img of $("img[src]").toArray()) {
    const src = $(img).attr("src");
    const isExternal = src.startsWith("http") || src.startsWith("//");
    const imgPath = isExternal ? src : path.join(srcDir, src);
    const base64Img = await inlineFile(imgPath, "img", isExternal);
    $(img).attr("src", base64Img);
  }

  const bodyContent = $("body").html();
  fs.writeFileSync(path.join(destDir, `${gameName}.html`), bodyContent);
}

// Build all games or specific game
const gameName = process.argv[2];
if (gameName) {
  buildGame(gameName).catch(console.error);
} else {
  const gamesDir = path.join(__dirname, "../src");
  fs.readdirSync(gamesDir)
    .filter((file) => fs.statSync(path.join(gamesDir, file)).isDirectory())
    .forEach((game) => buildGame(game).catch(console.error));
}

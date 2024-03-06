const { default: select, Separator } = require("@inquirer/select");
const fs = require("fs");

(async () => {
  // load all files in _drafts folder
  const files = await fs.promises.readdir("_drafts");
  const answer = await select({
    message: "Select article to publish",
    choices: Array.from(files).map((file) => ({
      name: file,
      value: file,
      description: `publish ${file} to _posts`,
    })),
  });
  // move file from _drafts to _posts
  const date = new Date().toISOString().split("T")[0];
  await fs.promises.rename(`_drafts/${answer}`, `_posts/${date}-${answer}`);
  console.log(`moved _drafts/${answer} to _posts/${date}-${answer}`);
})();

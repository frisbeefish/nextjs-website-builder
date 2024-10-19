const { promises: fs } = require("fs");
const path = require("path");

module.exports = async function getWebsiteJson() {
  const websiteJsonFile = path.join(
    path.sep,
    ...process.cwd().split(path.sep).slice(0, -1),
    "database",
    "charmianstewart.com",
    "website.json"
  );

  const websiteJson = JSON.parse(await fs.readFile(websiteJsonFile));

  return websiteJson;
};

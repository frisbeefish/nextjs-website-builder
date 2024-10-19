const { promises: fs } = require("fs");
const path = require("path");

module.exports = async function saveWebsiteJson(websiteJson) {
  const websiteJsonFile = path.join(
    path.sep,
    ...process.cwd().split(path.sep).slice(0, -1),
    "database",
    "charmianstewart.com",
    "website.json"
  );

  await fs.writeFile(websiteJsonFile, websiteJson);
};

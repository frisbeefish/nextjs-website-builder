import { promises as fs } from "fs";
import path from "path";

export default async function getWebsiteJson() {
  const websiteJsonFile = path.join(
    path.sep,
    ...process.cwd().split(path.sep).slice(0, -1),
    "database",
    "charmianstewart.com",
    "website.json"
  );

  const websiteJson = JSON.parse(await fs.readFile(websiteJsonFile));

  return websiteJson;
}

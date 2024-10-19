import { promises as fs } from "fs";
import path from "path";

export default async function saveWebsiteJson(websiteJson) {
  const websiteJsonFile = path.join(
    path.sep,
    ...process.cwd().split(path.sep).slice(0, -1),
    "database",
    "charmianstewart.com",
    "website.json"
  );

  await fs.writeFile(websiteJsonFile, websiteJson);
}

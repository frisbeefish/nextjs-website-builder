import { promises as fs } from "fs";

import path from "path";

import { exec } from "child_process";

const pathToGenerator =
  "/Users/scottwilliams/dev/nextjs-website-builder/website-generator/";

async function deleteFile(filePath) {
  try {
    await fs.unlink(filePath);
    console.log(`File ${filePath} has been deleted.`);
  } catch (err) {
    console.error(err);
  }
}

export default async function generateWebsite() {
  const sourceWebsiteJsonFile = path.join(
    path.sep,
    ...process.cwd().split(path.sep).slice(0, -1),
    "database",
    "charmianstewart.com",
    "website.json"
  );

  let websiteJson = await fs.readFile(sourceWebsiteJsonFile, "utf8");

  const dataWebsiteFileName = `website-${new Date().getTime()}.json`;
  let generateWebsiteShellCommand = `cd  ${pathToGenerator} && WEBSITE_JSON_FILE=${dataWebsiteFileName} npm run build`; // ./generate.sh`;

  const dataWebsiteJsonOutputFile = path.join(
    path.sep,
    ...process.cwd().split(path.sep).slice(0, -1),
    "website-generator",
    "data",
    dataWebsiteFileName
  );

  await fs.writeFile(dataWebsiteJsonOutputFile, websiteJson);

  try {
    // exec from child process, Spawns a shell then executes the command within that shell
    let child = exec(
      generateWebsiteShellCommand,
      {
        env: {
          PATH: `${process.env["PATH"]}:/usr/local/bin/node`,
        },
      },
      function (err) {
        if (err) throw err;

        console.log("Deleting temp website JSON file...");
        deleteFile(dataWebsiteJsonOutputFile)
          .then(() => {
            console.log("Deleted Temp Website JSON file");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    );

    child.stdout.on("data", (data) => {
      // this is new server output
      console.log(data.toString());
    });
    child.stderr.on("data", (data) => {
      // this is new server error output
      console.log(data.toString());
    });

    return {};
  } catch (error) {
    return {
      error,
    };
  }
}

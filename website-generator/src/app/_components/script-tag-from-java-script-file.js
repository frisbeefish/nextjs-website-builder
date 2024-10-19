import path from "path";

import { promises as fs } from "fs";

import Script from "next/script";

async function getData({ buildDirectory, scriptFileName }) {
  const parts = buildDirectory.split(path.sep);

  while (parts.length > 0) {
    const part = parts.shift();

    if (part === "server") {
      break;
    }
  }

  const scriptSourcePath = path.join("src", ...parts, scriptFileName);

  const scriptSource = await fs.readFile(
    path.join(process.cwd(), scriptSourcePath),
    "utf8"
  );

  return {
    scriptSourcePath,
    scriptSource,
  };
}

export default async function ScriptTagFromJavaScriptFile({
  buildDirectory,
  scriptFileName,
  ...rest
}) {
  const { scriptSourcePath, scriptSource } = await getData({
    buildDirectory,
    scriptFileName,
  });

  return (
    <Script
      id={scriptSourcePath}
      dangerouslySetInnerHTML={{
        __html: `
          ${scriptSource}
        `,
      }}
    ></Script>
  );
}

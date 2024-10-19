import { promises as fs } from "fs";
import path from "path";

export default async function uploadFile(file) {
  //console.log("FILE received " + file);

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = file.name;

  //console.log(" filename " + filename);

  //console.log("cwd " + process.cwd());

  const uploadDirectory = path.join(process.cwd(), "public", "static", "files");

  //console.log(" uploadDirectory " + uploadDirectory);

  //const filename = "";

  try {
    await fs.writeFile(path.join(uploadDirectory, filename), buffer);
    return {
      filename,
      url: `http://localhost:3000/static/images/${filename}`,
    };
    /*
    {
      filename: filename,
      url: `http://localhost:3000/static/images/${filename}`,
    };
    */
  } catch (error) {
    console.log("Error occured ", error);
    return { error: error };
    //return NextResponse.json({ Message: "Failed", status: 500 });
  }
}

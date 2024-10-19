import { NextResponse } from "next/server";

import { uploadImage } from "@/app/_server/services/file-upload";

export async function POST(request, { params }) {
  const formData = await request.formData();

  const file = formData.get("file");

  const { filename, error } = await uploadImage(file);

  if (filename) {
    return NextResponse.json({
      filename: filename,
      url: `http://localhost:3000/static/images/${filename}`,
    });
  } else {
    return new Response(null, {
      status: 500,
      statusText: error,
    });
  }
}

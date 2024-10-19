import { NextResponse } from "next/server";

import { getWebsiteJson, saveWebsiteJson } from "@/app/_server/services/db";

export async function GET(request, { params }) {
  const websiteJson = await getWebsiteJson();

  return NextResponse.json(websiteJson);
}

export async function POST(request, { params }) {
  const websiteJson = JSON.stringify(await request.json(), null, 3);
  await saveWebsiteJson(websiteJson);

  return new Response(null, {
    status: 200,
  });
}

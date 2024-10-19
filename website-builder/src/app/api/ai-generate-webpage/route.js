import { NextResponse } from "next/server";

import { generateWebPage } from "@/app/_server/services/ai";

export async function POST(request, { params }) {
  const { userQuery } = await request.json();

  const { webpageJson, error } = await generateWebPage({ userQuery });

  const response = error
    ? new Response(null, {
        status: 500,
        statusText: error,
      })
    : NextResponse.json(webpageJson);

  return response;
}

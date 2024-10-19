import { generateWebsite } from "@/app/_server/services/website-generation";

export async function POST(request, { params }) {
  const { error } = await generateWebsite();

  const response = error
    ? new Response(null, {
        status: 500,
        statusText: error,
      })
    : new Response(null, {
        status: 200,
      });

  return response;
}

import { google } from "googleapis";
import dotenv from "dotenv";
//mport getSystemPrompt from "./system-prompt";

dotenv.config();

console.log("hi from test");

const customsearch = google.customsearch("v1");

const youtube = google.youtube({
  version: "v3",
  auth: process.env.GOOGLE_API_KEY,
});

console.log("about to search");

async function youTubeSearch(query) {
  const response = await youtube.search.list({
    part: "snippet",
    q: query,
    maxResults: 3,
  });

  const videos = response.data.items.map(function (item) {
    return {
      videoId: item.id.videoId,
      thumbnailUrl: item.snippet.thumbnails.medium.url,
    };
  });

  return videos;
}

youTubeSearch("dogs")
  .then(function (videos) {
    console.log(JSON.stringify(videos, null, 3));
  })
  .catch((error) => {
    console.log("error " + error);
  });

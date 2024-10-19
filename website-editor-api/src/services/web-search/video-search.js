const { google } = require("googleapis");
const dotenv = require("dotenv");

dotenv.config();

const youtube = google.youtube({
  version: "v3",
  auth: process.env.GOOGLE_API_KEY,
});

module.exports = async function searchForYouTubeVideos(query) {
  const response = await youtube.search.list({
    part: "snippet",
    q: query,
    maxResults: 3,
  });

  const videos = response.data.items.map(function (item) {
    return {
      videoId: item.id.videoId,
      thumbnailImageUrl: item.snippet.thumbnails.medium.url,
    };
  });

  return videos;
};

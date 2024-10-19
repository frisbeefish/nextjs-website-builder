const { google } = require("googleapis");
const dotenv = require("dotenv");

dotenv.config();

const customsearch = google.customsearch("v1");

module.exports = async function searchForImages(query) {
  const response = await customsearch.cse.list({
    auth: process.env.GOOGLE_API_KEY,
    cx: process.env.GOOGLE_SEARCH_CX, //"e38daedf27040404f",
    q: query,
    searchType: "image",
    num: 2,
    //start,
    //num,
  });

  return response.data.items.map(function (item) {
    return {
      imageUrl: item.link,
    };
  });
};

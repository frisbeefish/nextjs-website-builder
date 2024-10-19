import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

console.log("hi from test");

const customsearch = google.customsearch("v1");

console.log("about to search");

async function searchForImages(query) {
  const response = await customsearch.cse.list({
    auth: process.env.GOOGLE_API_KEY,
    cx: process.env.GOOGLE_SEARCH_CX,
    q: query,
    searchType: "image",
    num: 2,
    //start,
    //num,
  });

  return response.data.items.map(function (item) {
    return {
      url: item.link,
    };
  });
}

searchForImages("italian cashmere")
  .then(function (images) {
    console.log(JSON.stringify(images, null, 3));
  })
  .catch((error) => {
    console.log("error " + error);
  });

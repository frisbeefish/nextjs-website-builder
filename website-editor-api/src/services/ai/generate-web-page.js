const { BLOG_POST_TYPES } = require("../../shared/constants");

const { getCreateWebpageSystemPrompt } = require("./system-prompts");
const { aiSimpleChatExchange } = require("./ai");
const { searchForImages, searchForYouTubeVideos } = require("../web-search");

module.exports = async function generateWebPage({ userQuery }) {
  const systemPrompt = await getCreateWebpageSystemPrompt();

  const response = await aiSimpleChatExchange({ systemPrompt, userQuery });

  let webpageJson = JSON.parse(response);

  const posts = [];

  for (let post of webpageJson.posts) {
    if (post.blogPostType === BLOG_POST_TYPES.IMAGE_POST) {
      post.optionalImages = await searchForImages(post.heading);
      post.imageUrl = post.optionalImages[0].imageUrl || post.imageUrl;
      post.layout = "VERTICAL_IMAGE_BELOW";
    } else if (post.blogPostType === BLOG_POST_TYPES.VIDEO_POST) {
      post.optionalVideos = await searchForYouTubeVideos(post.heading);
      post.videoId = post.optionalVideos[0].videoId || post.videoId;
      post.layout = "VERTICAL_IMAGE_BELOW";
    }
    posts.push(post);
  }

  webpageJson.posts = posts;

  return {
    webpageJson,
  };
};

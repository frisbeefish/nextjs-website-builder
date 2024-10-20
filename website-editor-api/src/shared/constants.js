const PAGE_TYPES = {
  SINGLE_IMAGE_PAGE: "SINGLE_IMAGE_PAGE",
  BLOG_PAGE: "BLOG_PAGE",
  AI_GENERATED_BLOG_PAGE: "AI_GENERATED_BLOG_PAGE",
  CONTACT_PAGE: "CONTACT_PAGE",
};

const BLOG_POST_TYPES = {
  TEXT_POST: "TEXT_POST",
  FILES_POST: "FILES_POST",
  IMAGE_POST: "IMAGE_POST",
  VIDEO_POST: "VIDEO_POST",
  EMBEDDED_HTML_TAG: "EMBEDDED_HTML_TAG",
};

const IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS = {
  HORIZONTAL_IMAGE_ON_RIGHT: "HORIZONTAL_IMAGE_ON_RIGHT",
  HORIZONTAL_IMAGE_ON_LEFT: "HORIZONTAL_IMAGE_ON_LEFT",
  VERTICAL_IMAGE_BELOW: "VERTICAL_IMAGE_BELOW",
  VERTICAL_IMAGE_ABOVE: "VERTICAL_IMAGE_ABOVE",
};

module.exports = {
  PAGE_TYPES,
  BLOG_POST_TYPES,
  IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS,
};

import { BLOG_POST_TYPES } from "@/app/_shared/constants";

import FilesPostRenderer from "./files-post-renderer";
import TextPostRenderer from "./text-post-renderer";
import ImagePostRenderer from "./image-post-renderer";
import VideoPostRenderer from "./video-post-renderer";
import EmbeddedHtmlTagRenderer from "./embedded-html-tag-renderer";

export function getBlogPostRenderer(post) {
  return {
    [BLOG_POST_TYPES.FILES_POST]: FilesPostRenderer,
    [BLOG_POST_TYPES.TEXT_POST]: TextPostRenderer,
    [BLOG_POST_TYPES.IMAGE_POST]: ImagePostRenderer,
    [BLOG_POST_TYPES.VIDEO_POST]: VideoPostRenderer,
    [BLOG_POST_TYPES.EMBEDDED_HTML_TAG]: EmbeddedHtmlTagRenderer,
  }[post.blogPostType];
}

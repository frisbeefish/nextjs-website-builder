import { PAGE_TYPES } from "./constants";

import {
  TEXT_POST_TEMPLATE,
  IMAGE_POST_TEMPLATE,
  VIDEO_POST_TEMPLATE,
} from "./page-post-templates";

const BASE_PAGE_TEMPLATE = {
  metadata: {
    title: "Replace with the page title",
    description: "Replace with the page description",
    keywords: "",
  },
  pageType: "",
  name: "",
  description: "",
  menuLabel: "",
  heading: "",
  body: "",
  clone() {
    return {
      ...this,
    };
  },
};

export const BLOG_PAGE_TEMPLATE = {
  ...BASE_PAGE_TEMPLATE,
  pageType: PAGE_TYPES.BLOG_PAGE,
  menuLabel: "Blog",
  heading: "This is a blog page",
  body: "Example page body text",
  backgroundColor: "gray.200",
  posts: [
    {
      ...TEXT_POST_TEMPLATE.clone(),
    },
    {
      ...IMAGE_POST_TEMPLATE.clone(),
    },
    {
      ...VIDEO_POST_TEMPLATE.clone(),
    },
  ],
};

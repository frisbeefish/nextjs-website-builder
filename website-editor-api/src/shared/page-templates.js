const { PAGE_TYPES } = require("./constants");

const {
  TEXT_POST_TEMPLATE,
  IMAGE_POST_TEMPLATE,
  VIDEO_POST_TEMPLATE,
} = require("./blog-post-templates");

const BASE_PAGE_TEMPLATE = {
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

const SINGLE_IMAGE_PAGE_TEMPLATE = {
  ...BASE_PAGE_TEMPLATE,
  pageType: PAGE_TYPES.SINGLE_IMAGE_PAGE,
  menuLabel: "Home",
  heading: "This is the home page",
  body: "Example page body text",
  fullBleedImage: false,
  imageUrl:
    "https://static.wixstatic.com/media/c74032_efd2ad4e1e964518b135ce61bf0c1825~mv2.jpg/v1/fill/w_2089,h_713,fp_0.50_0.50,q_85,enc_auto/c74032_efd2ad4e1e964518b135ce61bf0c1825~mv2.jpg",
};

const BLOG_PAGE_TEMPLATE = {
  ...BASE_PAGE_TEMPLATE,
  pageType: PAGE_TYPES.BLOG_PAGE,
  menuLabel: "Blog",
  heading: "This is a blog page",
  body: "Example page body text",
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

const CONTACT_PAGE_TEMPLATE = {
  ...BASE_PAGE_TEMPLATE,
  pageType: PAGE_TYPES.CONTACT_PAGE,
  menuLabel: "Contact",
  heading: "This is the contact page",
  body: "Example page body text",
  fullBleedImage: false,
  imageUrl:
    "https://images.pond5.com/beautiful-young-girl-playing-violin-084669644_prevstill.jpeg",
};

module.exports = {
  SINGLE_IMAGE_PAGE_TEMPLATE,
  BLOG_PAGE_TEMPLATE,
  CONTACT_PAGE_TEMPLATE,
};

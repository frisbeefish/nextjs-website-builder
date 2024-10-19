import {
  BLOG_POST_TYPES,
  IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS,
  BLOG_POST_BORDER,
} from "./constants";

const BASE_BLOG_POST_TEMPLATE = {
  blogPostType: "",
  postBorder: BLOG_POST_BORDER.HAS_BORDER,
  name: "",
  description: "",
  heading: "",
  body: "",
  clone() {
    return {
      ...this,
    };
  },
};

export const EMBEDDED_HTML_TAG_TEMPLATE = {
  ...BASE_BLOG_POST_TEMPLATE,
  blogPostType: BLOG_POST_TYPES.EMBEDDED_HTML_TAG,
  heading: "Embedded Html Tag example",
  body: "Example post text",
  embedTag: `
  <iframe
                width="100%"
                height="300"
                scrolling="no"
                frameborder="no"
                allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/253186645&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
              ></iframe>
              <div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;">
                <a
                  href="https://soundcloud.com/roxy-music-official"
                  title="Roxy Music"
                  target="_blank"
                  style="color: #cccccc; text-decoration: none;"
                >
                  Roxy Music
                </a>{" "}
                ·{" "}
                <a
                  href="https://soundcloud.com/roxy-music-official/more-than-this-1999-digital"
                  title="More Than This"
                  target="_blank"
                  style="color: #cccccc; text-decoration: none;"
                >
                  More Than This
                </a>
              </div>
  `,
};

export const TEXT_POST_TEMPLATE = {
  ...BASE_BLOG_POST_TEMPLATE,
  blogPostType: BLOG_POST_TYPES.TEXT_POST,
  heading: "Text Post: Example blog post heading",
  body: "Example post text",
};

export const FILES_POST_TEMPLATE = {
  ...BASE_BLOG_POST_TEMPLATE,
  blogPostType: BLOG_POST_TYPES.FILES_POST,
  heading: "Files Post: Example files post heading",
  body: "Example files post text",
  files: [
    {
      name: "sample1.pdf",
      description: "A sample 1",
      fileUrl: "static/docs/sample.pdf",
    },
    {
      name: "sample2.pdf",
      description: "A sample 2",
      fileUrl: "static/docs/sample.pdf",
    },
  ],
};

export const IMAGE_OR_VIDEO_BLOG_POST_TEMPLATE = {
  ...BASE_BLOG_POST_TEMPLATE,
  layout: "",
  postWidth: "BLOG_POST",
};

export const IMAGE_POST_TEMPLATE = {
  ...IMAGE_OR_VIDEO_BLOG_POST_TEMPLATE,
  blogPostType: BLOG_POST_TYPES.IMAGE_POST,
  layout: IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.VERTICAL_IMAGE_BELOW,
  heading: "Image Post: Example blog post heading",
  body: "Example post text",
  imageUrl:
    "https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg",
  headingPosition: "INHERIT",
};

export const VIDEO_POST_TEMPLATE = {
  ...IMAGE_OR_VIDEO_BLOG_POST_TEMPLATE,
  blogPostType: BLOG_POST_TYPES.VIDEO_POST,
  layout: IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.VERTICAL_IMAGE_BELOW,
  heading: "Video Post: Example blog post heading",
  body: "Example post text",
  videoId: "IlOemXqTOW8",
  optionalVideos: [
    {
      videoId: "jyn_orqdyHQ",
      thumbnailImageUrl: "https://i.ytimg.com/vi/jyn_orqdyHQ/mqdefault.jpg",
    },
    {
      videoId: "6fezIiROLjQ",
      thumbnailImageUrl: "https://i.ytimg.com/vi/6fezIiROLjQ/mqdefault.jpg",
    },
  ],
};

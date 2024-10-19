"use client";

import { Box } from "@chakra-ui/react";

import { getBlogPostRenderer } from "./page-post-renderers";

import { htmlizeText } from "@/app/_shared/utils";

export default function BlogPageRenderer({ page, ...rest }) {
  const posts = page.posts.map(function (post, index) {
    const PostRenderer = getBlogPostRenderer(post);

    return (
      <PostRenderer
        className="post-renderer"
        sx={{ breakInside: "avoid" }}
        marginLeft="auto"
        marginRight="auto"
        pageBackgroundColor={page.backgroundColor}
        post={post}
        key={index}
        mb={5}
      />
    );
  });

  const pageBody = htmlizeText(page.body);

  return (
    <Box
      className="blog-page-renderer"
      backgroundColor={page.backgroundColor}
      minHeight="calc(100vh - 4rem)"
      border="1px solid white"
      position="relative"
      p={0}
      {...rest}
    >
      {posts}
    </Box>
  );
}

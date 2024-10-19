import React from "react";

import {
  Badge,
  Box,
  Card,
  CardBody,
  Center,
  Flex,
  Stack,
  Text,
} from "@chakra-ui/react";

import {
  BLOG_POST_BORDER,
  IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS,
} from "@/app/_shared/constants";

import { timestampToFriendlyDate } from "@/app/_shared/utils";

import { chakraColorIsDark, htmlizeText } from "@/app/_shared/utils";

export default function ImagePostRenderer({
  pageBackgroundColor,
  post,
  ...rest
}) {
  const pageBody = htmlizeText(post.body);

  const hasHeading =
    typeof post.heading === "string" && post.heading.trim().length > 0;
  const hasBody = typeof pageBody === "string" && pageBody.trim().length > 0;

  const backgroundColorIsDark = chakraColorIsDark(pageBackgroundColor);

  const headerTextColor =
    post.postBorder !== BLOG_POST_BORDER.HAS_BORDER && backgroundColorIsDark
      ? "white"
      : "blue.500";

  const bodyTextColor =
    post.postBorder !== BLOG_POST_BORDER.HAS_BORDER && backgroundColorIsDark
      ? "white"
      : "inherit";

  const flexDirection = {
    [IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.HORIZONTAL_IMAGE_ON_RIGHT]: "row",
    [IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.HORIZONTAL_IMAGE_ON_LEFT]: "row-reverse",
    [IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.VERTICAL_IMAGE_BELOW]: "column",
    [IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.VERTICAL_IMAGE_ABOVE]: "column-reverse",
  }[post.layout];

  const imageMaxWidth = {
    [IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.HORIZONTAL_IMAGE_ON_RIGHT]: "50%",
    [IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.HORIZONTAL_IMAGE_ON_LEFT]: "50%",
    [IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.VERTICAL_IMAGE_BELOW]: "100%",
    [IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.VERTICAL_IMAGE_ABOVE]: "100%",
  }[post.layout];

  let heading;

  if (hasHeading) {
    heading = [
      IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.VERTICAL_IMAGE_BELOW,
      IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.VERTICAL_IMAGE_ABOVE,
    ].includes(post.layout) ? (
      <Flex justify="space-between">
        <Text
          color={headerTextColor}
          fontWeight="bold"
          fontSize="1.2rem"
          type="text"
        >
          {post.heading}
        </Text>

        <Center margin="auto">
          {post.creationDateTime && (
            <Badge variant="outline" colorScheme="blue">
              {timestampToFriendlyDate(post.creationDateTime)}
            </Badge>
          )}
        </Center>
      </Flex>
    ) : (
      <Box>
        <Text
          color={headerTextColor}
          fontWeight="bold"
          fontSize="1.2rem"
          type="text"
        >
          {post.heading}
        </Text>

        {post.creationDateTime && (
          <Badge variant="outline" colorScheme="blue">
            {timestampToFriendlyDate(post.creationDateTime)}
          </Badge>
        )}
      </Box>
    );
  }

  const headingStackMarginTop =
    post.layout === IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.VERTICAL_IMAGE_ABOVE
      ? 3
      : 0;

  const headingStackMarginRight =
    post.layout === IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.HORIZONTAL_IMAGE_ON_RIGHT
      ? 2
      : 0;

  const headingStackMarginLeft =
    post.layout === IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.HORIZONTAL_IMAGE_ON_LEFT
      ? 2
      : 0;

  return (
    <Card
      marginTop={5}
      maxWidth="900px"
      boxShadow={
        post.postBorder === BLOG_POST_BORDER.HAS_BORDER
          ? "var(--card-shadow)"
          : "none"
      }
      backgroundColor={
        post.postBorder === BLOG_POST_BORDER.HAS_BORDER
          ? "white"
          : "transparent"
      }
      {...rest}
    >
      <CardBody display="flex" flexDirection={flexDirection}>
        {(hasHeading || hasBody) && (
          <Stack
            mt={headingStackMarginTop}
            ml={headingStackMarginLeft}
            mr={headingStackMarginRight}
            mb="6"
            spacing="3"
            flex="1"
          >
            {heading}
            <Text
              mb={5}
              color={bodyTextColor}
              dangerouslySetInnerHTML={{
                __html: `
          ${pageBody}
        `,
              }}
            ></Text>
          </Stack>
        )}
        <Box align="center">
          <Center>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${post.videoId}`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </Center>
        </Box>
      </CardBody>
    </Card>
  );
}

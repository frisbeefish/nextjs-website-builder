import React from "react";

import {
  Badge,
  Box,
  Card,
  CardBody,
  Center,
  Flex,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

import { chakraColorIsDark, htmlizeText } from "@/app/_shared/utils";

import {
  IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS,
  BLOG_POST_WIDTH,
  HEADING_POSITION,
} from "@/app/_shared/constants";

import { timestampToFriendlyDate } from "@/app/_shared/utils";

import { BLOG_POST_BORDER } from "@/app/_shared/constants";

export default function ImagePostRenderer({
  pageBackgroundColor,
  post,
  ...rest
}) {
  const pageBody = htmlizeText(post.body);

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

  let imageMaxWidth = {
    [IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.HORIZONTAL_IMAGE_ON_RIGHT]: "50%",
    [IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.HORIZONTAL_IMAGE_ON_LEFT]: "50%",
    [IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.VERTICAL_IMAGE_BELOW]: "100%",
    [IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.VERTICAL_IMAGE_ABOVE]: "100%",
  }[post.layout];

  let imageWidth =
    post.postWidth !== BLOG_POST_WIDTH.BLOG_POST ? "100vw" : "inherit";
  let objectFit =
    post.postWidth !== BLOG_POST_WIDTH.BLOG_POST ? "cover" : "inherit";

  const borderRadius = "none"; // "lg"

  const hasHeading =
    typeof post.heading === "string" && post.heading.trim().length > 0;
  const hasBody = typeof pageBody === "string" && pageBody.trim().length > 0;

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

  let headingAboveImage =
    post.headingPosition === HEADING_POSITION.ON_TOP_OF_IMAGE ? (
      <Text
        position="absolute"
        top="10px"
        left="10px"
        color={post.headerTextColor ? post.headerTextColor : "white"}
        fontWeight="bold"
        fontSize="2rem"
        type="text"
        textShadow="1px 1px #333"
      >
        {post.heading}
      </Text>
    ) : null;

  heading = headingAboveImage ? null : heading;

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

  if (post.postWidth !== BLOG_POST_WIDTH.BLOG_POST) {
    return (
      <>
        {!headingAboveImage && (
          <Stack
            mt={headingStackMarginTop}
            ml={headingStackMarginLeft}
            mr={headingStackMarginRight}
            mb="6"
            spacing="3"
            flex="1"
          >
            {heading}
            {!headingAboveImage && (
              <Text
                mb={5}
                color={bodyTextColor}
                dangerouslySetInnerHTML={{
                  __html: `
            ${pageBody}
          `,
                }}
              ></Text>
            )}
          </Stack>
        )}

        {post.postWidth === BLOG_POST_WIDTH.FULL_BLEED && (
          <Box
            position="relative"
            backgroundImage={post.imageUrl}
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            height="100vh"
          >
            {headingAboveImage}
          </Box>
        )}

        {post.postWidth === BLOG_POST_WIDTH.FULL_WIDTH && (
          <Box position="relative" maxWidth={imageMaxWidth} width={imageWidth}>
            <Image
              src={post.imageUrl}
              maxWidth={imageMaxWidth}
              width={imageWidth}
              objectFit={objectFit}
              alt="Green double couch with wooden legs"
              borderRadius={borderRadius}
            />
            {headingAboveImage}
          </Box>
        )}
      </>
    );
  } else {
    return (
      <Card
        marginTop={post.postBorder === BLOG_POST_BORDER.HAS_BORDER ? 5 : 10}
        maxWidth="900px"
        {...rest}
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
          <Image
            src={post.imageUrl}
            maxWidth={imageMaxWidth}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
        </CardBody>
      </Card>
    );
  }
}

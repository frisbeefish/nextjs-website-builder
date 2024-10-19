import React from "react";

import { Card, CardBody, Flex, Heading, Stack, Text } from "@chakra-ui/react";

import { chakraColorIsDark, htmlizeText } from "@/app/_shared/utils";

import { BLOG_POST_BORDER } from "@/app/_shared/constants";

export default function TextPostRenderer({
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

  return (
    <Card
      marginTop={post.postBorder === BLOG_POST_BORDER.HAS_BORDER ? 5 : 10}
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
      <CardBody>
        <Stack mb="1" spacing="3">
          <Flex justify="space-between">
            {typeof post.heading === "string" &&
              post.heading.trim().length > 0 && (
                <Heading
                  color={headerTextColor}
                  fontWeight="bold"
                  fontSize="1.2rem"
                >
                  {post.heading}
                </Heading>
              )}
          </Flex>
          <Text
            mb={0}
            color={bodyTextColor}
            dangerouslySetInnerHTML={{
              __html: `
          ${pageBody}
        `,
            }}
          ></Text>
        </Stack>
      </CardBody>
    </Card>
  );
}

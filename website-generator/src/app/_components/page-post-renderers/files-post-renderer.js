import React from "react";

import {
  Card,
  CardBody,
  Flex,
  Heading,
  Stack,
  Text,
  Box,
  FormControl,
  FormHelperText,
  Link,
} from "@chakra-ui/react";

import { chakraColorIsDark, htmlizeText } from "@/app/_shared/utils";

import { BLOG_POST_BORDER } from "@/app/_shared/constants";

import { ExternalLinkIcon } from "@chakra-ui/icons";

function FileSection({ file, ...rest }) {
  return (
    <Box
      {...rest}
      backgroundColor="#f9f9f9"
      borderRadius="var(--chakra-radii-md)"
      padding="var(--chakra-space-4)"
    >
      <FormControl>
        <Link fontWeight="bold" href={file.fileUrl} isExternal>
          {file.name} <ExternalLinkIcon mx="2px" />
        </Link>

        <FormHelperText mt={2} pt={0} mb={0}>
          {file.description}
        </FormHelperText>
      </FormControl>
    </Box>
  );
}

export default function FilesPostRenderer({
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

  const fileSections = post.files.map(function (file, index) {
    return <FileSection file={file} key={index} />;
  });

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
      <CardBody>
        <Stack mb="6" spacing="3">
          <Flex justify="space-between">
            {typeof post.heading === "string" &&
              post.heading.trim().length > 0 && (
                <Heading
                  color={headerTextColor}
                  fontWeight="bold"
                  fontSize="1.2rem"
                >
                  files {post.heading}
                </Heading>
              )}
          </Flex>
          <Text
            mb={5}
            color={bodyTextColor}
            dangerouslySetInnerHTML={{
              __html: `
          ${pageBody}
        `,
            }}
          ></Text>

          {fileSections}
        </Stack>
      </CardBody>
    </Card>
  );
}

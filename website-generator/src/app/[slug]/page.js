import path from "path";

import { promises as fs } from "fs";

import { Box, Button, Flex, Heading } from "@chakra-ui/react";

import { slugify } from "@/app/_shared/utils";

import { PageRenderer } from "@/app/_components";

const baseDir = process.env.WEBSITE_ID ? `/${process.env.WEBSITE_ID}/` : "/";

async function getData(slug) {
  const WEBSITE_JSON_FILE = process.env.WEBSITE_JSON_FILE
    ? process.env.WEBSITE_JSON_FILE
    : "website.json";
  const parts = process.cwd().split(path.sep);

  const baseDirectory = parts.slice(0, -1).join(path.sep);

  let websiteJSON = await fs.readFile(
    path.join(baseDirectory, "website-generator", "data", WEBSITE_JSON_FILE),
    "utf8"
  );

  websiteJSON = JSON.parse(websiteJSON);

  const page = websiteJSON.pages.find(
    (page) => slugify(page.menuLabel) === slug
  );

  return {
    page,
    websiteJSON,
  };
}

export async function generateStaticParams() {
  const WEBSITE_JSON_FILE = process.env.WEBSITE_JSON_FILE
    ? process.env.WEBSITE_JSON_FILE
    : "website.json";

  const parts = process.cwd().split(path.sep);

  const baseDirectory = parts.slice(0, -1).join(path.sep);

  let websiteJSON = await fs.readFile(
    path.join(baseDirectory, "website-generator", "data", WEBSITE_JSON_FILE),
    "utf8"
  );

  websiteJSON = JSON.parse(websiteJSON);

  const allPagesAfterHomePage = websiteJSON.pages.slice(1);

  return allPagesAfterHomePage.map((page) => {
    return {
      slug: slugify(page.menuLabel),
    };
  });
}

export async function generateMetadata({ params, searchParams }) {
  const { slug } = params;

  const { page, websiteJSON } = await getData(slug);

  return {
    title: page.metadata.title,
    description: page.metadata.description,
    keywords: page.metadata.keywords,
  };
}

export default async function WebsitePage({ params }) {
  const { slug } = params;

  const { page, websiteJSON } = await getData(slug);

  const websiteTopMenuLabels = websiteJSON.pages.map((page, index) => {
    const isCurrentPage = slugify(page.menuLabel) === slug;

    return (
      <Button
        key={index}
        as="a"
        mr={3}
        href={index === 0 ? baseDir : `${baseDir}${slugify(page.menuLabel)}`}
        variant={isCurrentPage ? "brand-top-nav-selected" : "brand-top-nav"}
        colorScheme="teal"
        padding="10px 20px"
        cursor="pointer"
      >
        {page.menuLabel}
      </Button>
    );
  });

  return (
    <Box>
      <Box
        marginLeft="auto"
        marginRight="auto"
        minHeight="100vh"
        p={0}
        pt="calc(4rem + 0px)"
      >
        <Flex
          position="fixed"
          top="0px"
          left="0px"
          right="0px"
          zIndex="1"
          justifyContent="flex-start"
          justify="space-around"
          alignItems="center"
          height="4rem"
          backgroundColor="white"
          boxShadow="0 2px 4px 0 rgba(0,0,0,.2)"
          pt={0}
          pb={0}
        >
          <Heading
            as="h4"
            variant="brand-top-nav"
            color="black.300"
            ml={3}
            mr={6}
          >
            San Anselmo Fun
          </Heading>
          <Box
            position="absolute"
            width="900px"
            maxWidth="100vw"
            left="50%"
            top="50%"
            transform="translateX(-50%) translateY(-50%)"
          >
            {websiteTopMenuLabels}
          </Box>
        </Flex>
        <PageRenderer page={page} className="generated-page" />
      </Box>
    </Box>
  );
}

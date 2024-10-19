import path from "path";

import { promises as fs } from "fs";

import { Box, Button, Flex, Heading } from "@chakra-ui/react";

import { slugify } from "@/app/_shared/utils";

import { PageRenderer } from "@/app/_components";

async function getData() {
  const WEBSITE_JSON_FILE = process.env.WEBSITE_JSON_FILE
    ? process.env.WEBSITE_JSON_FILE
    : "website.json";

  //console.log("*** USING WEBSITE_JSON_FILE " + WEBSITE_JSON_FILE);

  const parts = process.cwd().split(path.sep);

  const baseDirectory = parts.slice(0, -1).join(path.sep);

  const websiteJSON = await fs.readFile(
    path.join(baseDirectory, "website-generator", "data", WEBSITE_JSON_FILE),
    "utf8"
  );

  return JSON.parse(websiteJSON);
}

export async function generateMetadata({ params, searchParams }) {
  const websiteJSON = await getData();
  const homePageJSON = websiteJSON.pages[0];

  /*

  FOR MORE INFO: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-fields

  openGraph: {
    title: 'Next.js',
    description: 'The React Framework for the Web',
    url: 'https://nextjs.org',
    siteName: 'Next.js',
    images: [
      {
        url: 'https://nextjs.org/og.png',
        width: 800,
        height: 600,
      },
      {
        url: 'https://nextjs.org/og-alt.png',
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: '/icon.png',
    shortcut: '/shortcut-icon.png',
    apple: '/apple-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },

  icons: {
    icon: [{ url: '/icon.png' }, new URL('/icon.png', 'https://example.com')],
    shortcut: ['/shortcut-icon.png'],
    apple: [
      { url: '/apple-icon.png' },
      { url: '/apple-icon-x3.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-touch-icon-precomposed.png',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Next.js',
    description: 'The React Framework for the Web',
    siteId: '1467726470533754880',
    creator: '@nextjs',
    creatorId: '1467726470533754880',
    images: ['https://nextjs.org/og.png'],
  },

  verification: {
    google: 'google',
    yandex: 'yandex',
    yahoo: 'yahoo',
    other: {
      me: ['my-email', 'my-link'],
    },
  },

  category: 'technology',

  */

  return {
    title: homePageJSON.metadata.title,
    description: homePageJSON.metadata.description,
    keywords: homePageJSON.metadata.keywords,
  };
}

export default async function Home() {
  const websiteJSON = await getData();

  const baseDir = process.env.WEBSITE_ID ? `/${process.env.WEBSITE_ID}/` : "/";

  const websiteTopMenuLabels = websiteJSON.pages.map((page, index) => {
    return (
      <Button
        as="a"
        key={index}
        mr={3}
        href={index === 0 ? baseDir : `${baseDir}${slugify(page.menuLabel)}`}
        variant={index === 0 ? "brand-top-nav-selected" : "brand-top-nav"}
        padding="10px 20px"
        cursor="pointer"
      >
        {page.menuLabel}
      </Button>
    );
  });

  const homePageJSON = websiteJSON.pages[0];

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
        <PageRenderer page={homePageJSON} className="generated-page" />
      </Box>
    </Box>
  );
}

"use client";

import { ChakraProvider } from "@chakra-ui/react";

import { extendTheme } from "@chakra-ui/react";

//const theme = extendTheme({});

export default function ThemeProvider({ themeJson, children }) {
  const theme = extendTheme(themeJson);

  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}

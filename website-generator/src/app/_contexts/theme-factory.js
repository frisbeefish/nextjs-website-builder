"use client";

import { createContext } from "react";

import { ChakraProvider } from "@chakra-ui/react";

const initialState = {
  extendedThemeData: {},
  setExtendedThemeData: (extendedThemeData) => {},
};

export const ThemeProviderContext = createContext(initialState);

export function ChakraProviderFactory({ theme, children }) {
  return (
    <ThemeProviderContext.Provider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>;
    </ThemeProviderContext.Provider>
  );
}

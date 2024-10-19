import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  FormLabel,
  Heading,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  MenuItem,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import logo from "./logo.svg";
import "./App.css";

import GlobalStateContextProvider from "contexts/global-state";
import ThemeProvider from "contexts/theme-provider";

import Editor from "pages/editor";

function App() {
  return (
    <ThemeProvider>
      <GlobalStateContextProvider>
        <div className="App">
          <Editor />

          {/*
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
              <Button colorScheme="blue">A Button</Button>
            </a>
          </header>
  */}
        </div>
      </GlobalStateContextProvider>
    </ThemeProvider>
  );
}

export default App;

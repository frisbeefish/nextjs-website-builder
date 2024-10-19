"use client";

import { createContext, useContext, useState } from "react";

import {
  SINGLE_IMAGE_PAGE_TEMPLATE,
  BLOG_PAGE_TEMPLATE,
  CONTACT_PAGE_TEMPLATE,
} from "@/app/_shared/page-templates";

const initialState = {
  pages: [],
  setPages: (pages) => {},
  dataHasChanged: false,
  setDataHasChanged: (dataHasChanged) => {},
  loggedInUser: null,
  setLoggedInUser: (loggedInUser) => {},
};

export const GlobalStateContext = createContext(initialState);

export const GlobalStateContextProvider = ({ children }) => {
  const [pages, _setPages] = useState([
    {
      ...SINGLE_IMAGE_PAGE_TEMPLATE.clone(),
      name: "My Home Page",
      menuLabel: "Home",
    },

    {
      ...BLOG_PAGE_TEMPLATE.clone(),
      name: "My Blog",
      menuLabel: "Blog",
    },
    {
      ...CONTACT_PAGE_TEMPLATE.clone(),
      name: "My Contact Page",
      menuLabel: "Contact",
    },
  ]);
  const [dataHasChanged, setDataHasChanged] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  function setPages(pages) {
    setDataHasChanged(true);
    _setPages(pages);
  }

  return (
    <GlobalStateContext.Provider
      value={{
        pages,
        setPages,
        dataHasChanged,
        setDataHasChanged,
        loggedInUser,
        setLoggedInUser,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};

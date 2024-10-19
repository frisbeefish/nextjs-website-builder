import { createContext, useContext, useState } from "react";

import { BLOG_PAGE_TEMPLATE } from "shared/page-templates";

const initialState = {
  pages: [],
  setPages: (pages) => {},
  dataHasChanged: false,
  setDataHasChanged: (dataHasChanged) => {},
  loggedInUser: null,
  setLoggedInUser: (loggedInUser) => {},
};

export const GlobalStateContext = createContext(initialState);

export default function GlobalStateContextProvider({ children }) {
  const [pages, _setPages] = useState([
    {
      ...BLOG_PAGE_TEMPLATE.clone(),
      name: "My Blog",
      menuLabel: "Blog",
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
}

export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};

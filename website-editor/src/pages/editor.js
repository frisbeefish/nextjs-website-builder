import React, { useState, useEffect } from "react";

import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  MenuItem,
  Tag,
  TagCloseButton,
  TagLabel,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { MdPublishedWithChanges, MdCheck } from "react-icons/md";

import { ChevronDownIcon } from "@chakra-ui/icons";

import { useGlobalState } from "contexts/global-state";

import { PAGE_TYPES, BLOG_POST_TYPES } from "shared/constants";

import { BLOG_PAGE_TEMPLATE } from "shared/page-templates";

import {
  FILES_POST_TEMPLATE,
  TEXT_POST_TEMPLATE,
  IMAGE_POST_TEMPLATE,
  VIDEO_POST_TEMPLATE,
  EMBEDDED_HTML_TAG_TEMPLATE,
} from "shared/page-post-templates";

import {
  AiGenerateWebpageModal,
  DeletePageModal,
  YouHaveUnsavedDataModal,
  PageEditor,
  PreviewWebsiteGeneratedModal,
} from "components";

import {
  apiGetWebsiteJSON,
  apiSaveWebsiteJSON,
  apiGenerateWebsite,
} from "rest-api";

export default function Editor() {
  const { pages, setPages, dataHasChanged, setDataHasChanged } =
    useGlobalState();
  const [selectedPage, setSelectedPage] = useState("");

  const [isSavingWebsite, setIsSavingWebsite] = useState(false);
  const [isGeneratingWebsite, setIsGeneratingWebsite] = useState(false);
  const [
    forceShowSaveWebsiteButtonAsActive,
    setForceShowSaveWebsiteButtonAsActive,
  ] = useState(false);
  const [
    forceShowGenerateWebsiteButtonAsActive,
    setForceShowGenerateWebsiteButtonAsActive,
  ] = useState(false);
  const [indexOfPageToDelete, setIndexOfPageToDelete] = useState(-1);
  const [nameOfPageToDelete, setNameOfPageToDelete] = useState(-1);

  const {
    isOpen: deletePageAlertIsOpen,
    onOpen: showDeletePageAlert,
    onClose: closeDeletePageAlert,
  } = useDisclosure();

  const {
    isOpen: unsavedDataModalIsOpen,
    onOpen: showUnsavedDataModal,
    onClose: closeUnsavedDataModal,
  } = useDisclosure();

  const {
    isOpen: isAiGenerateWebpageModalOpen,
    onOpen: showAiGenerateWebpageModal,
    onClose: closeAiGenerateWebpageModal,
  } = useDisclosure();

  const {
    isOpen: previewWebsiteGeneratedModalIsOpen,
    onOpen: showPreviewWebsiteGeneratedModal,
    onClose: closePreviewWebsiteGeneratedModal,
  } = useDisclosure();

  const toast = useToast();

  //
  // Only once. TODO: Might not need this once the data comes from a database.
  //
  useEffect(() => {
    apiGetWebsiteJSON()
      .then(function (websiteJSON) {
        const pages = websiteJSON.pages.map(function (page) {
          const pageTemplateObject = BLOG_PAGE_TEMPLATE.clone();

          page = {
            ...pageTemplateObject,
            ...page,
          };

          if (page.posts) {
            page.posts = page.posts.map(function (post) {
              const blogPostTemplateObject = {
                [BLOG_POST_TYPES.TEXT_POST]: TEXT_POST_TEMPLATE.clone(),
                [BLOG_POST_TYPES.FILES_POST]: FILES_POST_TEMPLATE.clone(),
                [BLOG_POST_TYPES.IMAGE_POST]: IMAGE_POST_TEMPLATE.clone(),
                [BLOG_POST_TYPES.VIDEO_POST]: VIDEO_POST_TEMPLATE.clone(),
                [BLOG_POST_TYPES.EMBEDDED_HTML_TAG_TEMPLATE]:
                  EMBEDDED_HTML_TAG_TEMPLATE.clone(),
              }[post.blogPostType];

              return {
                ...blogPostTemplateObject,
                ...post,
              };
            });
          }

          return page;
        });
        setPages(pages);
        setSelectedPage(pages[0]);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  /////////////////////////////////////////////////////////
  //
  // UI EVENT HANDLERS
  //
  /////////////////////////////////////////////////////////

  /**
   * The user chose to create a page from the dropdown.
   */
  function createNewPage(pageType) {
    if (pageType === PAGE_TYPES.AI_GENERATED_BLOG_PAGE) {
      return showAiGenerateWebpageModal();
    }

    const page = BLOG_PAGE_TEMPLATE.clone(); // createNewPageOfType(pageType);
    page.name = "Page " + new Date().getTime();
    setPages([...pages, page]);
    setSelectedPage(page);
  }

  /**
   * The user modified and saved the page data.
   */
  function saveEditedPage(e) {
    const editedPage = e.target.value;
    const index = pages.findIndex((page) => page == selectedPage);
    setPages([...pages.slice(0, index), editedPage, ...pages.slice(index + 1)]);
    setSelectedPage(editedPage);
  }

  /**
   * User clicked a top nav to select the page to edit.
   */
  function selectPageFromTopNav(page) {
    if (dataHasChanged && 1 === 2) {
      showUnsavedDataModal();
      return;
    }

    setSelectedPage(page);
  }

  /**
   * The user clicked the delete/close button on a top nav item.
   */
  function deletePageByIndex(e, index) {
    e.stopPropagation();
    showDeletePageAlert();
    setIndexOfPageToDelete(index);
    setNameOfPageToDelete(pages[index].menuLabel);
  }

  function doReallyDeletePage() {
    setPages([
      ...pages.slice(0, indexOfPageToDelete),
      ...pages.slice(indexOfPageToDelete + 1),
    ]);
    setIndexOfPageToDelete(-1);
    setNameOfPageToDelete(null);
    setSelectedPage(null);
    closeDeletePageAlert();
  }

  /**
   * Save the data to the database.
   */
  function saveWebsite() {
    console.log(JSON.stringify(pages, null, 3));

    setIsSavingWebsite(true);

    const websiteJSON = {
      metadata: {
        title: "Scott Fun Website",
        description: "The website",
        keywords: "",
      },
      theme: {
        semanticTokens: {
          colors: {
            "chakra-body-text": {
              _light: "gray.800",
              _dark: "whiteAlpha.900",
            },
            "chakra-body-bg": {
              _light: "white",
              _dark: "gray.800",
            },
          },
        },
        fontWeights: {
          hairline: 100,
          thin: 200,
          light: 300,
          normal: 400,
          medium: 500,
          semibold: 600,
          bold: 700,
          extrabold: 800,
          black: 900,
        },
        fonts: {
          heading:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
          body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
          mono: 'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
          brand: "Georgia, serif;",
        },
        colors: {
          brand: {
            100: "#ff0000",
            200: "#ff0000",
            300: "#ff0000",
            400: "#ff0000",
            500: "#ff0000",
            600: "#ff0000",
            700: "#ff0000",
            800: "#ff0000",
            900: "#ff0000",
          },
        },
        components: {
          Button: {
            baseStyle: {},
            variants: {
              "brand-top-nav": {
                fontSize: "md",
                bg: "white",
                fontFamily: "brand",
                _hover: {
                  backgroundColor: "#f9f9f9",
                },
              },
              "brand-top-nav-selected": {
                fontSize: "md",
                bg: "#f9f9f9",
                color: "var(--chakra-colors-blue-500)",
                fontFamily: "brand",
              },
            },
          },
          Heading: {
            baseStyle: {},
            variants: {
              "brand-top-nav": {
                fontFamily: "brand",
                fontSize: "lg",
                lineHeight: 1.2,
              },
            },
          },
        },
      },
      pages,
    };

    apiSaveWebsiteJSON(websiteJSON)
      .then(() => {
        console.log("successfully saved");
      })
      .catch((error) => {
        alert("error " + error);
      })
      .finally(() => {
        setForceShowSaveWebsiteButtonAsActive(true);
        setIsSavingWebsite(false);
        setDataHasChanged(false);
        setTimeout(() => {
          setForceShowSaveWebsiteButtonAsActive(false);
        }, 2000);
        toast({
          title: "Website saved.",
          description: "You have successfully saved the website.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      });
    /*
    setTimeout(() => {
      setForceShowSaveWebsiteButtonAsActive(true);
      setIsSavingWebsite(false);
      setDataHasChanged(false);
      setTimeout(() => {
        setForceShowSaveWebsiteButtonAsActive(false);
      }, 2000);
      toast({
        title: "Website saved.",
        description: "You have successfully saved the website.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }, 3000);
    */
  }

  function onWebPageGenerated(generatedPage) {
    closeAiGenerateWebpageModal();
    setPages([...pages, generatedPage]);
  }

  /*
  function aiGenerateWebPage() {
    // apiAiGenerateWebPage
    //alert("CALLING aiGenerateWebPage");
    apiAiGenerateWebPage({ userQuery: aiGenerateWebPageQuery })
      .then((response) => {
        const generatedPage = {
          ...BLOG_PAGE_TEMPLATE.clone(),
          ...response,
        };
        //alert("responbse " + response);
        //alert(JSON.stringify(response, null, 3));
        generatedPage.posts = generatedPage.posts.map(function (post) {
          const blogPostObject = {
            [BLOG_POST_TYPES.TEXT_POST]: TEXT_POST_TEMPLATE.clone(),
            [BLOG_POST_TYPES.IMAGE_POST]: IMAGE_POST_TEMPLATE.clone(),
            [BLOG_POST_TYPES.VIDEO_POST]: VIDEO_POST_TEMPLATE.clone(),
          }[post.blogPostType];

          return {
            ...blogPostObject,
            ...post,
          };

        
        });
        setPages([...pages, generatedPage]);
      })
      .catch((error) => {
        alert("error " + error);
      })
      .finally(() => {});
  }
  */

  /**
   * Save the data to the database and then invoke the function that generates
   * the website.
   */
  function generateWebsite() {
    setIsGeneratingWebsite(true);

    apiGenerateWebsite(pages)
      .then(() => {
        console.log("successfully generated website");
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setForceShowGenerateWebsiteButtonAsActive(true);
        setIsGeneratingWebsite(false);
        //setDataHasChanged(false);
        setTimeout(() => {
          setForceShowGenerateWebsiteButtonAsActive(false);
        }, 2000);
        showPreviewWebsiteGeneratedModal();
        /*
        toast({
          title: "Website generated.",
          description: "Your website has been generated.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        */
      });
    /*
    setTimeout(() => {
      setForceShowGenerateWebsiteButtonAsActive(true);
      setIsGeneratingWebsite(false);
      //setDataHasChanged(false);
      setTimeout(() => {
        setForceShowGenerateWebsiteButtonAsActive(false);
      }, 2000);
      toast({
        title: "Website generated.",
        description: "Your website has been generated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }, 3000);
    */
  }

  /////////////////////////////////////////////////////////
  //
  // DRAG AND DROP SUPPORT
  //
  /////////////////////////////////////////////////////////

  function onDragStart(e, index) {
    const bbox = e.target.getBoundingClientRect();
    const xOffset = e.clientX - bbox.left;

    e.dataTransfer.setData(
      "index",
      JSON.stringify({
        index,
        xOffset,
      })
    );
  }

  function onDragOver(e) {
    e.preventDefault();
  }

  function onDrop(e) {
    const { index: droppedMenuLabelIndex, xOffset } = JSON.parse(
      e.dataTransfer.getData("index")
    );

    const droppedItemX = e.clientX - xOffset;

    const topMenuLabels = document.querySelectorAll(".website-top-menu-label");

    let rightmostEdgeOfLastItem = 0;
    let insertAtIndex = null;

    topMenuLabels.forEach(function (menuLabel, index) {
      const bbox = menuLabel.getBoundingClientRect();

      if (droppedItemX >= bbox.left && droppedItemX <= bbox.left + bbox.width) {
        insertAtIndex = index;
      }

      rightmostEdgeOfLastItem = bbox.left + bbox.width;
    });

    if (droppedItemX >= rightmostEdgeOfLastItem) {
      insertAtIndex = topMenuLabels.length - 1;
    }

    if (insertAtIndex === droppedMenuLabelIndex || insertAtIndex === null) {
      console.log("Nothing to do");
    } else {
      const pageToMove = pages[droppedMenuLabelIndex];
      const left = pages.slice(0, droppedMenuLabelIndex);
      const right = pages.slice(droppedMenuLabelIndex + 1);
      const newPages = [...left, ...right];
      newPages.splice(insertAtIndex, 0, pageToMove);
      setPages(newPages);
    }
  }

  /////////////////////////////////////////////////////////
  //
  // DYNNAMICALLY GENERATED UI COMPONENTS
  //
  /////////////////////////////////////////////////////////

  const websiteTopMenuLabels = pages.map((page, index) => {
    return (
      <Center
        className="website-top-menu-label"
        key={index}
        mr={3}
        draggable
        onDragStart={(e) => onDragStart(e, index)}
      >
        <Tag
          onClick={() => selectPageFromTopNav(page)}
          colorScheme="teal"
          backgroundColor="#d5e1e1"
          padding="10px 20px"
          cursor="pointer"
        >
          <TagLabel>{page.menuLabel}</TagLabel>
          <TagCloseButton onClick={(e) => deletePageByIndex(e, index)} />
        </Tag>
      </Center>
    );
  });

  /*
     isOpen: isAiGenerateWebpageModalOpen,
    onOpen: showAiGenerateWebpageModal,
    onClose: closeAiGenerateWebpageModal,
  */

  //const PageEditor = BlogPageEditor; // getEditorForPage(selectedPage);

  //console.log("EDITOR " + PageEditor);

  // backgroundColor="#EAF0F0"
  return (
    <Box backgroundColor="#f0f4f4" position="relative" pt={0}>
      <AiGenerateWebpageModal
        isOpen={isAiGenerateWebpageModalOpen}
        onClose={closeAiGenerateWebpageModal}
        onWebPageGenerated={onWebPageGenerated}
      />

      <PreviewWebsiteGeneratedModal
        isOpen={previewWebsiteGeneratedModalIsOpen}
        websiteUrl={"http://localhost:8080"}
        onClose={closePreviewWebsiteGeneratedModal}
      />

      <DeletePageModal
        isOpen={deletePageAlertIsOpen}
        nameOfPageToDelete={nameOfPageToDelete}
        onClose={closeDeletePageAlert}
        onDelete={doReallyDeletePage}
      />

      <YouHaveUnsavedDataModal
        isOpen={unsavedDataModalIsOpen}
        onClose={closeUnsavedDataModal}
      />

      <Box marginLeft="auto" marginRight="auto" minHeight="100vh" p={0}>
        <Flex
          justifyContent="flex-start"
          justify="space-around"
          p={2}
          mb={0}
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e)}
        >
          <Heading as="h2" color="black.300">
            Website Editor
          </Heading>

          <Center marginLeft="auto" mr={3}>
            <Button
              isDisabled={
                !dataHasChanged && !forceShowSaveWebsiteButtonAsActive
              }
              isLoading={isSavingWebsite}
              loadingText="Saving Website"
              leftIcon={<MdCheck />}
              colorScheme="teal"
              onClick={saveWebsite}
            >
              Save Changes
            </Button>
          </Center>

          <Center>
            <Button
              isDisabled={
                dataHasChanged && !forceShowGenerateWebsiteButtonAsActive
              }
              isLoading={isGeneratingWebsite}
              loadingText="Generating Website"
              leftIcon={<MdPublishedWithChanges />}
              colorScheme="teal"
              onClick={generateWebsite}
            >
              Generate Website
            </Button>
          </Center>
        </Flex>
        <Flex
          className="website-top-menu-labels-holder"
          justifyContent="flex-start"
          justify="space-around"
          p={0}
          p={2}
          height="4rem"
          backgroundColor="white"
          mb={5}
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e)}
        >
          {websiteTopMenuLabels}

          <Center ml={6} mr={3}>
            <Menu>
              <MenuButton
                as={Button}
                _hover={{
                  color: "white",
                  backgroundColor: "var(--chakra-colors-teal-500)",
                }}
                rightIcon={<ChevronDownIcon />}
              >
                Add Page
              </MenuButton>
              <MenuList>
                {/*
                <MenuItem onClick={() => createNewPage(PAGE_TYPES.HOME_PAGE)}>
                  Home Page
                </MenuItem>
                <MenuItem onClick={() => createNewPage(PAGE_TYPES.HERO_PAGE)}>
                  Hero Page
                </MenuItem>
              */}
                {/*
                <MenuItem
                  onClick={() => createNewPage(PAGE_TYPES.SINGLE_IMAGE_PAGE)}
                >
                  Page With One Image
                </MenuItem>
            */}
                <MenuItem onClick={() => createNewPage(PAGE_TYPES.BLOG_PAGE)}>
                  User-Created Web Page
                </MenuItem>

                {/*
                <MenuItem
                  onClick={() => createNewPage(PAGE_TYPES.CONTACT_PAGE)}
                >
                  Contact Page
                </MenuItem>
          */}

                <MenuDivider />

                <MenuItem
                  onClick={() =>
                    createNewPage(PAGE_TYPES.AI_GENERATED_BLOG_PAGE)
                  }
                >
                  AI-Generated Web Page
                </MenuItem>
              </MenuList>
            </Menu>
          </Center>
        </Flex>

        <Box maxWidth="1000px" marginLeft="auto" marginRight="auto">
          {selectedPage && PageEditor && (
            <PageEditor page={selectedPage} onChange={saveEditedPage} />
          )}
        </Box>

        {/*
        <Card maxWidth="1000px" marginLeft="auto" marginRight="auto">
          <CardBody backgroundColor="gray.200">
            {selectedPage && PageEditor && (
              <PageEditor page={selectedPage} onChange={saveEditedPage} />
            )}
          </CardBody>
        </Card>
            */}
      </Box>
    </Box>
  );
}

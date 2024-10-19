"use client";

import React, { useState, useEffect } from "react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";

import { MdCheck } from "react-icons/md";

import { ChevronDownIcon } from "@chakra-ui/icons";

import { BLOG_POST_TYPES } from "shared/constants";

import {
  TEXT_POST_TEMPLATE,
  FILES_POST_TEMPLATE,
  IMAGE_POST_TEMPLATE,
  VIDEO_POST_TEMPLATE,
  EMBEDDED_HTML_TAG_TEMPLATE,
} from "shared/page-post-templates";

import {
  ImagePostEditor,
  TextPostEditor,
  FilesPostEditor,
  VideoPostEditor,
  EmbeddedHtmlTagEditor,
} from "components/page-post-editors";

import { ColorPicker } from "components";

import { chakraColorIsDark } from "shared/utils";

function AddPostMenu({ onAddPost, ...rest }) {
  return (
    <Menu {...rest}>
      <MenuButton
        as={Button}
        backgroundColor="white"
        rightIcon={<ChevronDownIcon />}
      >
        Add Content
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => onAddPost(BLOG_POST_TYPES.TEXT_POST)}>
          Text
        </MenuItem>
        <MenuItem onClick={() => onAddPost(BLOG_POST_TYPES.IMAGE_POST)}>
          Image
        </MenuItem>
        <MenuItem onClick={() => onAddPost(BLOG_POST_TYPES.VIDEO_POST)}>
          Video
        </MenuItem>
        <MenuItem onClick={() => onAddPost(BLOG_POST_TYPES.FILES_POST)}>
          Files Section
        </MenuItem>
        <MenuItem onClick={() => onAddPost(BLOG_POST_TYPES.EMBEDDED_HTML_TAG)}>
          Embedded Html Tag
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default function PageEditor({ page, onChange, ...rest }) {
  const [editedPage, _setEditedPage] = useState(page.clone());
  const [posts, setPosts] = useState([]);
  const [indexOfPostToDelete, setIndexOfPostToDelete] = useState(-1);
  const {
    isOpen,
    onOpen: showDeleteBlogPostAlert,
    onClose: closeDeleteBlogPostAlert,
  } = useDisclosure();
  const cancelRef = React.useRef();

  const [pageHasChanged, setPageHasChanged] = useState(false);
  const [saveButtonIcon, setSaveButtonIcon] = useState(null);
  const [saveButtonLabel, setSaveButtonLabel] = useState("Save Page");
  const [menuLabelTextColor, setMenuLabelTextColor] = useState("inherit");

  useEffect(() => {
    setEditedPage(page);
  }, [page]);

  useEffect(() => {
    const postComponents = [
      <Center mb={1} key={-1}>
        <AddPostMenu
          onAddPost={(blogPostType) => addPost(blogPostType, 0)}
          key={0}
        />
      </Center>,
    ];

    editedPage.posts.forEach((post, index) => {
      const BlogPostEditor = {
        [BLOG_POST_TYPES.IMAGE_POST]: ImagePostEditor,
        [BLOG_POST_TYPES.TEXT_POST]: TextPostEditor,
        [BLOG_POST_TYPES.FILES_POST]: FilesPostEditor,
        [BLOG_POST_TYPES.VIDEO_POST]: VideoPostEditor,
        [BLOG_POST_TYPES.EMBEDDED_HTML_TAG]: EmbeddedHtmlTagEditor,
      }[post.blogPostType];
      postComponents.push(
        <BlogPostEditor
          key={index}
          post={post}
          onChange={(e) => handlePostChanged(e, index)}
          onDelete={() => handleDeletePost(index)}
          mb={1}
        />
      );
      postComponents.push(
        <Center mb={1}>
          <AddPostMenu
            key={`button-${index}`}
            onAddPost={(blogPostType) => addPost(blogPostType, index + 1)}
          />
        </Center>
      );
    });
    setPosts(postComponents);
  }, [editedPage]);

  /*
  onChange={(color) => {
          setEditedPage({
            ...editedPage,
            backgroundColor: color,
          });
        }}
  */

  function handlePageBackgroundColorChanged(color) {
    const backgroundColorIsDark = chakraColorIsDark(color);

    //  color.indexOf(".") > 0 && parseInt(color.split(".")[1]) > 400;

    setMenuLabelTextColor(backgroundColorIsDark ? "white" : "inherit");

    setEditedPage({
      ...editedPage,
      backgroundColor: color,
    });
  }

  function addPost(blogPostType, index) {
    //alert("add " + blogPostType + " at index " + index);

    const newPost = {
      [BLOG_POST_TYPES.IMAGE_POST]: IMAGE_POST_TEMPLATE.clone(),
      [BLOG_POST_TYPES.TEXT_POST]: TEXT_POST_TEMPLATE.clone(),
      [BLOG_POST_TYPES.FILES_POST]: FILES_POST_TEMPLATE.clone(),
      [BLOG_POST_TYPES.VIDEO_POST]: VIDEO_POST_TEMPLATE.clone(),
      [BLOG_POST_TYPES.EMBEDDED_HTML_TAG]: EMBEDDED_HTML_TAG_TEMPLATE.clone(),
    }[blogPostType];

    const updatedEditedPage = {
      ...editedPage,
      posts: [
        ...editedPage.posts.slice(0, index),
        newPost,
        ...editedPage.posts.slice(index),
      ],
    };

    _setEditedPage(() => {
      return updatedEditedPage;
    });
  }

  function setEditedPage(updatedEditedPage) {
    _setEditedPage(updatedEditedPage);
    setPageHasChanged(true);
  }

  function saveChanges() {
    onChange({
      target: {
        value: editedPage,
      },
    });

    setSaveButtonIcon(<MdCheck />);
    setSaveButtonLabel("Saved");
    setTimeout(() => {
      setSaveButtonLabel("Save Page");
      setSaveButtonIcon(null);
      setPageHasChanged(false);
    }, 1000);
  }

  function handlePostChanged(e, index) {
    const updatedEditedPage = {
      ...editedPage,
      posts: [
        ...editedPage.posts.slice(0, index),
        e.target.value,
        ...editedPage.posts.slice(index + 1),
      ],
    };

    _setEditedPage(() => {
      return updatedEditedPage;
    });

    onChange({
      target: {
        value: updatedEditedPage,
      },
    });
  }

  function handleDeletePost(index) {
    setIndexOfPostToDelete(index);
    showDeleteBlogPostAlert();
  }

  function reallyDoDeletePost() {
    closeDeleteBlogPostAlert();

    const updatedEditedPage = {
      ...editedPage,
      posts: [
        ...editedPage.posts.slice(0, indexOfPostToDelete),
        ...editedPage.posts.slice(indexOfPostToDelete + 1),
      ],
    };

    _setEditedPage(() => {
      return updatedEditedPage;
    });

    onChange({
      target: {
        value: updatedEditedPage,
      },
    });

    setIndexOfPostToDelete(-1);
  }

  //const menuLabelTextColor = backgroundColorIsDark ? "white" : "inherit";

  return (
    <Box
      backgroundColor={editedPage.backgroundColor}
      borderRadius="lg"
      position="relative"
      p={6}
      {...rest}
    >
      <ColorPicker
        position="absolute"
        top="0"
        right="-30px"
        color={editedPage.backgroundColor}
        onChange={(color) => {
          handlePageBackgroundColorChanged(color);
        }}
      />
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={closeDeleteBlogPostAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Blog Post
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&apos;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={closeDeleteBlogPostAlert}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={reallyDoDeletePost} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <FormControl mb={6}>
        <Flex
          position="relative"
          flexDirection="row"
          alignItems="center"
          gap={2}
        >
          <FormLabel
            position="relative"
            top="3px"
            color={menuLabelTextColor}
            fontWeight="bold"
            whiteSpace="nowrap"
          >
            Website Top Nav Label:
          </FormLabel>
          <Input
            type="text"
            value={editedPage.menuLabel}
            onChange={(e) =>
              setEditedPage({
                ...editedPage,
                menuLabel: e.target.value,
              })
            }
            backgroundColor="white"
          />
          <Button
            flex="initial"
            pl={6}
            pr={6}
            isDisabled={!pageHasChanged}
            leftIcon={saveButtonIcon}
            onClick={saveChanges}
            colorScheme="blue"
          >
            {saveButtonLabel}
          </Button>
        </Flex>
      </FormControl>

      <Box height={1} marginTop="36px" mb={5} backgroundColor="gray.100"></Box>
      <VStack
        marginLeft="auto"
        marginRight="auto"
        maxWidth="1000px"
        spacing={4}
        p={0}
        mb={3}
        align="stretch"
      >
        {posts}
      </VStack>
    </Box>
  );
}

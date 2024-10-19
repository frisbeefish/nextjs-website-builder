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
  FormHelperText,
  Heading,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Textarea,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";

import { MdCheck } from "react-icons/md";

import { ChevronDownIcon } from "@chakra-ui/icons";

import { BLOG_POST_TYPES } from "@/app/_shared/constants";

import {
  TEXT_POST_TEMPLATE,
  FILES_POST_TEMPLATE,
  IMAGE_POST_TEMPLATE,
  VIDEO_POST_TEMPLATE,
  EMBEDDED_HTML_TAG_TEMPLATE,
} from "@/app/_shared/blog-post-templates";

import {
  ImagePostEditor,
  TextPostEditor,
  FilesPostEditor,
  VideoPostEditor,
  EmbeddedHtmlTagEditor,
} from "@/app/_client/components/blog-post-editors";

function AddPostMenu({ onAddPost, ...rest }) {
  return (
    <Menu {...rest}>
      <MenuButton
        as={Button}
        backgroundColor="white"
        rightIcon={<ChevronDownIcon />}
      >
        Add Post
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => onAddPost(BLOG_POST_TYPES.TEXT_POST)}>
          Text Post
        </MenuItem>
        <MenuItem onClick={() => onAddPost(BLOG_POST_TYPES.IMAGE_POST)}>
          Image Post
        </MenuItem>
        <MenuItem onClick={() => onAddPost(BLOG_POST_TYPES.VIDEO_POST)}>
          Video Post
        </MenuItem>
        <MenuItem onClick={() => onAddPost(BLOG_POST_TYPES.FILES_POST)}>
          Files Post
        </MenuItem>
        <MenuItem onClick={() => onAddPost(BLOG_POST_TYPES.EMBEDDED_HTML_TAG)}>
          Embedded Html Tag
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default function BlogPageEditor({ page, onChange, ...rest }) {
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

  return (
    <Box backgroundColor="gray.200" position="relative" p={4} {...rest}>
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
      <Heading size="md" color="blue.500" mb={4}>
        Blog Page Editor
      </Heading>

      <FormControl mb={6}>
        <FormLabel>Menu Label</FormLabel>
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
        <FormHelperText>
          The lable that shows up for the page in the top nav of your website.
        </FormHelperText>
      </FormControl>

      <FormControl mb={6}>
        <FormLabel>Page Heading:</FormLabel>
        <Input
          type="text"
          value={editedPage.heading}
          onChange={(e) =>
            setEditedPage({
              ...editedPage,
              heading: e.target.value,
            })
          }
          backgroundColor="white"
        />
      </FormControl>

      <FormControl mb={6}>
        <FormLabel>Main Page Text</FormLabel>
        <Textarea
          backgroundColor="white"
          value={editedPage.body}
          onChange={(e) =>
            setEditedPage({
              ...editedPage,
              body: e.target.value,
            })
          }
          placeholder="Enter the text that you would like to show in the main area of this webpage."
        />
      </FormControl>

      <Flex justifyContent="right" mb={6}>
        <Button
          isDisabled={!pageHasChanged}
          leftIcon={saveButtonIcon}
          onClick={saveChanges}
          colorScheme="blue"
        >
          {saveButtonLabel}
        </Button>
      </Flex>

      <Box height={1} backgroundColor="gray.100"></Box>

      <Heading size="md" color="blue.500" mt={4} mb={4}>
        Posts:
      </Heading>

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

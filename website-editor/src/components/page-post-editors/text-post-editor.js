import React, { useState, useEffect } from "react";

import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Divider,
  Flex,
  Input,
  Textarea,
  Stack,
  Text,
} from "@chakra-ui/react";

import { MdCheck } from "react-icons/md";

import { timestampToFriendlyDate } from "shared/date-utils";

import PostBorderSelector from "./post-border-selector";

import { BLOG_POST_BORDER } from "shared/constants";

export default function TextPostEditor({ post, onChange, onDelete, ...rest }) {
  const [editedPost, _setEditedPost] = useState(post.clone());
  const [postHasChanged, setPostHasChanged] = useState(false);
  const [saveButtonIcon, setSaveButtonIcon] = useState(null);
  const [saveButtonLabel, setSaveButtonLabel] = useState("Save Post");

  useEffect(() => {
    _setEditedPost(post);
  }, [post]);

  function setEditedPost(updatedPost) {
    setPostHasChanged(true);
    _setEditedPost(updatedPost);
  }

  function saveChanges() {
    onChange({
      target: {
        value: editedPost,
      },
    });
    setSaveButtonIcon(<MdCheck />);
    setSaveButtonLabel("Saved");
    setTimeout(() => {
      setPostHasChanged(false);
      setSaveButtonLabel("Save Post");
      setSaveButtonIcon(null);
    }, 1000);
  }

  function handleChangePostBorder(e) {
    setEditedPost({
      ...editedPost,
      postBorder: e.target.value,
    });
  }

  let decodedBody = "";

  try {
    decodedBody = decodeURIComponent(post.body);
  } catch (error) {
    try {
      decodedBody = unescape(post.body);
    } catch (error) {}
  }

  return (
    <Card
      {...rest}
      boxShadow={
        editedPost.postBorder === BLOG_POST_BORDER.HAS_BORDER
          ? "var(--card-shadow)"
          : "none"
      }
    >
      <CardHeader>
        <Flex
          position="relative"
          justifyContent="flex-start"
          justify="space-around"
          p={0}
          backgroundColor="white"
        >
          <PostBorderSelector
            mr={3}
            postBorder={editedPost.postBorder}
            onChange={handleChangePostBorder}
          />{" "}
          <Text
            color="gray.400"
            fontWeight="bold"
            position="absolute"
            left="50%"
            top="50%"
            transform="translateX(-50%) translateY(-50%)"
          >
            Text Post
          </Text>
          <Center marginLeft="auto">
            <Button
              colorScheme="gray"
              _hover={{
                color: "white",
                backgroundColor: "var(--chakra-colors-red-500)",
              }}
              size="sm"
              mr={2}
              onClick={onDelete}
            >
              Delete
            </Button>
            <Button
              isDisabled={!postHasChanged}
              leftIcon={saveButtonIcon}
              colorScheme="blue"
              size="sm"
              onClick={saveChanges}
            >
              {saveButtonLabel}
            </Button>
          </Center>
        </Flex>
      </CardHeader>
      <Box pl={2} pr={2}>
        <Divider />
      </Box>
      <CardBody>
        <Stack mb="6" spacing="3">
          <Flex justify="space-between">
            <Center flex="1" mr={2}>
              <Input
                color="blue.500"
                fontWeight="bold"
                fontSize="1.2rem"
                type="text"
                value={editedPost.heading}
                onChange={(e) =>
                  setEditedPost({
                    ...editedPost,
                    heading: e.target.value,
                  })
                }
              />
            </Center>
            <Center>
              {editedPost.creationDateTime && (
                <Badge variant="outline" colorScheme="blue">
                  {timestampToFriendlyDate(editedPost.creationDateTime)}
                </Badge>
              )}
            </Center>
          </Flex>
          <Textarea
            value={editedPost.body}
            onChange={(e) =>
              setEditedPost({
                ...editedPost,
                body: e.target.value,
              })
            }
            placeholder="Enter the text that you would like to show in the main area of this webpage."
          />
        </Stack>
      </CardBody>
    </Card>
  );
}

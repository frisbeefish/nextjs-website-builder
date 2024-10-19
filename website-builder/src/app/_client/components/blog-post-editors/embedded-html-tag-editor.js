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
  useDisclosure,
} from "@chakra-ui/react";

import { MdOutlineImage, MdMenu, MdCheck } from "react-icons/md";

import { timestampToFriendlyDate } from "@/app/_shared/date-utils";

import EmbedTagEditorModal from "./embed-tag-editor-modal";

export default function EmbeddedHtmlTagEditor({
  post,
  onChange,
  onDelete,
  ...rest
}) {
  const [editedPost, _setEditedPost] = useState(post.clone());
  const [postHasChanged, setPostHasChanged] = useState(false);
  const [saveButtonIcon, setSaveButtonIcon] = useState(null);
  const [saveButtonLabel, setSaveButtonLabel] = useState("Save Post");

  const {
    isOpen,
    onOpen: showEditEmbedTagModal,
    onClose: closeEditEmbedTagModal,
  } = useDisclosure();

  useEffect(() => {
    _setEditedPost(post);
  }, [post]);

  function setEditedPost(updatedPost) {
    setPostHasChanged(true);
    _setEditedPost(updatedPost);
  }

  function handleUpdateEmbedTag(e) {
    setEditedPost({
      ...editedPost,
      embedTag: e.target.value,
    });
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

  let decodedBody = "";

  try {
    decodedBody = decodeURIComponent(post.body);
  } catch (error) {
    try {
      decodedBody = unescape(post.body);
    } catch (error) {}
  }

  return (
    <Card {...rest}>
      <EmbedTagEditorModal
        embedTag={editedPost.embedTag}
        isOpen={isOpen}
        onClose={closeEditEmbedTagModal}
        onChange={handleUpdateEmbedTag}
      />

      <CardHeader>
        <Flex
          position="relative"
          justifyContent="flex-start"
          justify="space-around"
          p={0}
          backgroundColor="white"
        >
          <Text
            color="gray.400"
            fontWeight="bold"
            position="absolute"
            left="50%"
            top="50%"
            transform="translateX(-50%) translateY(-50%)"
          >
            Embedded Html Tag
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
            mb={2}
            value={editedPost.body}
            onChange={(e) =>
              setEditedPost({
                ...editedPost,
                body: e.target.value,
              })
            }
            placeholder="Enter the text that you would like to show in the main area of this webpage."
          />

          <Box align="center">
            <Button mb={5} onClick={showEditEmbedTagModal}>
              Edit Html Tag
            </Button>
            <Box
              dangerouslySetInnerHTML={{
                __html: `
                ${editedPost.embedTag}
        `,
              }}
            ></Box>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}

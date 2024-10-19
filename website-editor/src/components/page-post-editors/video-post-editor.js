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

import { MdCheck } from "react-icons/md";

import { timestampToFriendlyDate } from "shared/date-utils";

import {
  BLOG_POST_BORDER,
  IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS,
} from "shared/constants";

import VideoChooserModal from "./video-chooser-modal";
import PostLayoutSelector from "./post-layout-selector";
import PostBorderSelector from "./post-border-selector";

export default function VideoPostEditor({ post, onChange, onDelete, ...rest }) {
  const [editedPost, _setEditedPost] = useState(post.clone());
  const [postHasChanged, setPostHasChanged] = useState(false);
  const [saveButtonIcon, setSaveButtonIcon] = useState(null);
  const [saveButtonLabel, setSaveButtonLabel] = useState("Save Post");

  const {
    isOpen,
    onOpen: showEditVideoModal,
    onClose: closeEditVideoModal,
  } = useDisclosure();

  useEffect(() => {
    _setEditedPost(post);
  }, [post]);

  function setEditedPost(updatedPost) {
    setPostHasChanged(true);
    _setEditedPost(updatedPost);
  }

  function handleChangePostBorder(e) {
    setEditedPost({
      ...editedPost,
      postBorder: e.target.value,
    });
  }

  function handleChangeLayout(e) {
    setEditedPost({
      ...editedPost,
      layout: e.target.value,
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

  function handleUpdateVideoId(e) {
    setEditedPost({
      ...editedPost,
      videoId: e.target.value,
    });
  }

  let decodedBody = "";

  try {
    decodedBody = decodeURIComponent(editedPost.body);
  } catch (error) {
    try {
      decodedBody = unescape(editedPost.body);
    } catch (error) {}
  }

  const flexDirection = {
    [IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.HORIZONTAL_IMAGE_ON_RIGHT]: "row",
    [IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.HORIZONTAL_IMAGE_ON_LEFT]: "row-reverse",
    [IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.VERTICAL_IMAGE_BELOW]: "column",
    [IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.VERTICAL_IMAGE_ABOVE]: "column-reverse",
  }[editedPost.layout];

  const heading = [
    IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.VERTICAL_IMAGE_BELOW,
    IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.VERTICAL_IMAGE_ABOVE,
  ].includes(editedPost.layout) ? (
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
  ) : (
    <Box>
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

      {editedPost.creationDateTime && (
        <Badge variant="outline" colorScheme="blue">
          {timestampToFriendlyDate(editedPost.creationDateTime)}
        </Badge>
      )}
    </Box>
  );

  const headingStackMarginTop =
    editedPost.layout === IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.VERTICAL_IMAGE_ABOVE
      ? 3
      : 0;

  const headingStackMarginRight =
    editedPost.layout ===
    IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.HORIZONTAL_IMAGE_ON_RIGHT
      ? 2
      : 0;

  const headingStackMarginLeft =
    editedPost.layout ===
    IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.HORIZONTAL_IMAGE_ON_LEFT
      ? 2
      : 0;

  return (
    <Card
      boxShadow={
        editedPost.postBorder === BLOG_POST_BORDER.HAS_BORDER
          ? "var(--card-shadow)"
          : "none"
      }
      {...rest}
    >
      <VideoChooserModal
        videoId={editedPost.videoId}
        optionalVideos={editedPost.optionalVideos}
        isOpen={isOpen}
        onClose={closeEditVideoModal}
        onChange={handleUpdateVideoId}
      />

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
          />
          <PostLayoutSelector
            layout={editedPost.layout}
            onChange={handleChangeLayout}
          />
          <Text
            color="gray.400"
            fontWeight="bold"
            position="absolute"
            left="50%"
            top="50%"
            transform="translateX(-50%) translateY(-50%)"
          >
            Video Post
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
      <CardBody display="flex" flexDirection={flexDirection}>
        <Stack
          mt={headingStackMarginTop}
          ml={headingStackMarginLeft}
          mr={headingStackMarginRight}
          mb="6"
          spacing="3"
          flex="1"
        >
          {heading}
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

        <Box align="center">
          <Button mb={5} onClick={() => showEditVideoModal()}>
            Change Video
          </Button>
          <Center>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${editedPost.videoId}`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </Center>
        </Box>
      </CardBody>
    </Card>
  );
}

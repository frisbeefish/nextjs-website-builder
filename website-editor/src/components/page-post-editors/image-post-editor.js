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
  FormControl,
  FormLabel,
  Image,
  Input,
  Textarea,
  Select,
  Stack,
  Switch,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { MdCheck } from "react-icons/md";

import { timestampToFriendlyDate } from "shared/date-utils";

import {
  IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS,
  BLOG_POST_WIDTH,
  HEADING_POSITION,
  BLOG_POST_BORDER,
} from "shared/constants";

import { ColorPicker, ImageChooserModal } from "components";

import PostLayoutSelector from "./post-layout-selector";
import PostBorderSelector from "./post-border-selector";

export default function ImagePostEditor({ post, onChange, onDelete, ...rest }) {
  const [editedPost, _setEditedPost] = useState(post.clone());
  const [postHasChanged, setPostHasChanged] = useState(false);
  const [saveButtonIcon, setSaveButtonIcon] = useState(null);
  const [saveButtonLabel, setSaveButtonLabel] = useState("Save Post");

  const {
    isOpen,
    onOpen: showEditImageModal,
    onClose: closeEditImageModal,
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
      headingPosition: [
        IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.HORIZONTAL_IMAGE_ON_RIGHT,
        IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.HORIZONTAL_IMAGE_ON_LEFT,
      ].includes(e.target.value)
        ? HEADING_POSITION.INHERIT
        : editedPost.headingPosition,
      postWidth: [
        IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.HORIZONTAL_IMAGE_ON_RIGHT,
        IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.HORIZONTAL_IMAGE_ON_LEFT,
      ].includes(e.target.value)
        ? BLOG_POST_WIDTH.BLOG_POST
        : editedPost.postWidth,
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

  function handleUpdateImageUrl(e) {
    setEditedPost({
      ...editedPost,
      imageUrl: e.target.value,
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

  const imageMaxWidth = {
    [IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.HORIZONTAL_IMAGE_ON_RIGHT]: "50%",
    [IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.HORIZONTAL_IMAGE_ON_LEFT]: "50%",
    [IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.VERTICAL_IMAGE_BELOW]: "100%",
    [IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.VERTICAL_IMAGE_ABOVE]: "100%",
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

  const imageSizeOptions = [
    <option key="0" value={BLOG_POST_WIDTH.BLOG_POST}>
      Blog Post Style
    </option>,
    <option key="0" value={BLOG_POST_WIDTH.FULL_BLEED}>
      Full Bleed - Size of Browser
    </option>,
    <option key="0" value={BLOG_POST_WIDTH.FULL_WIDTH}>
      Full Width of Browser
    </option>,
  ];

  function handleImageSizeChanged(e) {
    setEditedPost({
      ...editedPost,
      postWidth: e.target.value,
      headingPosition:
        e.target.value !== BLOG_POST_WIDTH.BLOG_POST
          ? editedPost.headingPosition
          : HEADING_POSITION.INHERIT,
    });
  }

  const extraPostControls = [
    IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.VERTICAL_IMAGE_BELOW,
    IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.VERTICAL_IMAGE_ABOVE,
  ].includes(editedPost.layout) ? (
    <>
      <Box p={4} pl={5}>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="full-bleed-post-width" whiteSpace="nowrap" mb="0">
            Image Size
          </FormLabel>
          <Select
            variant="filled"
            maxWidth="20rem"
            onChange={handleImageSizeChanged}
          >
            {imageSizeOptions}
          </Select>
        </FormControl>

        {editedPost.postWidth !== BLOG_POST_WIDTH.BLOG_POST && (
          <FormControl display="flex" alignItems="center" mt={4}>
            <FormLabel htmlFor="heading-on-top-of-image" mb="0">
              Place heading on top of image?
            </FormLabel>
            <Switch
              id="heading-on-top-of-image"
              isChecked={
                editedPost.headingPosition === HEADING_POSITION.ON_TOP_OF_IMAGE
              }
              onChange={(e) =>
                setEditedPost({
                  ...editedPost,
                  headingPosition: e.target.checked
                    ? HEADING_POSITION.ON_TOP_OF_IMAGE
                    : HEADING_POSITION.INHERIT,
                })
              }
            />
          </FormControl>
        )}
      </Box>

      <Box pl={2} pr={2}>
        <Divider />
      </Box>
    </>
  ) : null;

  return (
    <Card
      {...rest}
      boxShadow={
        editedPost.postBorder === BLOG_POST_BORDER.HAS_BORDER
          ? "var(--card-shadow)"
          : "none"
      }
    >
      <ImageChooserModal
        imageUrl={editedPost.imageUrl}
        optionalImages={editedPost.optionalImages}
        isOpen={isOpen}
        onClose={closeEditImageModal}
        onChange={handleUpdateImageUrl}
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
            Image Post
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

      {extraPostControls}

      <CardBody display="flex" flexDirection={flexDirection}>
        <Stack
          mt={headingStackMarginTop}
          ml={headingStackMarginLeft}
          mr={headingStackMarginRight}
          mb="6"
          spacing="3"
          flex="1"
        >
          {editedPost.headingPosition !== HEADING_POSITION.ON_TOP_OF_IMAGE &&
            heading}
          {editedPost.headingPosition !== HEADING_POSITION.ON_TOP_OF_IMAGE && (
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
          )}
        </Stack>

        <Box align="center" maxWidth={imageMaxWidth} position="relative">
          <Button mb={5} onClick={() => showEditImageModal()}>
            Change Image
          </Button>
          <Image
            src={editedPost.imageUrl}
            cursor="pointer"
            onClick={showEditImageModal}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
            width={
              editedPost.postWidth === BLOG_POST_WIDTH.FULL_BLEED
                ? "100%"
                : "inherit"
            }
          />
          {editedPost.headingPosition === HEADING_POSITION.ON_TOP_OF_IMAGE && (
            <Flex
              flexDirection="row"
              alignItems="center"
              position="absolute"
              top="5rem"
              left="10px"
              right="10px"
              gap={2}
            >
              <Input
                color={
                  editedPost.headerTextColor
                    ? editedPost.headerTextColor
                    : "white"
                }
                backgroundColor="transparent"
                textShadow="1px 1px #333"
                fontWeight="bold"
                fontSize="2rem"
                type="text"
                value={editedPost.heading}
                onChange={(e) =>
                  setEditedPost({
                    ...editedPost,
                    heading: e.target.value,
                  })
                }
              />

              <ColorPicker
                color={
                  editedPost.headerTextColor
                    ? editedPost.headerTextColor
                    : "white"
                }
                onChange={(color) => {
                  setEditedPost({
                    ...editedPost,
                    headerTextColor: color,
                  });
                }}
              />
            </Flex>
          )}
        </Box>
      </CardBody>
    </Card>
  );
}

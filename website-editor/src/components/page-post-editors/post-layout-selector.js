import { useState } from "react";

import { Button, Center } from "@chakra-ui/react";

import { MdOutlineImage, MdMenu } from "react-icons/md";

import { IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS } from "shared/constants";

export default function PostLayoutSelector({ layout, onChange, ...rest }) {
  const [editedLayout, setEditedLayout] = useState(layout);

  function handleChangeLayout(layout) {
    setEditedLayout(layout);
    onChange({
      target: {
        value: layout,
      },
    });
  }

  return (
    <Center {...rest}>
      <Button
        display="flex"
        flexDirection="column"
        borderTopLeftRadius="md"
        borderBottomLeftRadius="md"
        borderTopRightRadius={0}
        borderBottomRightRadius={0}
        colorScheme="blue"
        size="sm"
        variant={
          editedLayout === IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.VERTICAL_IMAGE_BELOW
            ? "solid"
            : "outline"
        }
        height="2.5rem"
        onClick={() =>
          handleChangeLayout(
            IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.VERTICAL_IMAGE_BELOW
          )
        }
      >
        <MdMenu />
        <MdOutlineImage />
      </Button>
      <Button
        display="flex"
        flexDirection="column"
        position="relative"
        left="-1px"
        borderRadius={0}
        colorScheme="blue"
        size="sm"
        variant={
          editedLayout === IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.VERTICAL_IMAGE_ABOVE
            ? "solid"
            : "outline"
        }
        height="2.5rem"
        onClick={() =>
          handleChangeLayout(
            IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.VERTICAL_IMAGE_ABOVE
          )
        }
      >
        <MdOutlineImage />
        <MdMenu />
      </Button>
      <Button
        display="flex"
        flexDirection="row"
        gap={1}
        position="relative"
        left="-2px"
        borderRadius={0}
        colorScheme="blue"
        size="sm"
        variant={
          editedLayout ===
          IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.HORIZONTAL_IMAGE_ON_RIGHT
            ? "solid"
            : "outline"
        }
        height="2.5rem"
        onClick={() =>
          handleChangeLayout(
            IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.HORIZONTAL_IMAGE_ON_RIGHT
          )
        }
      >
        <MdMenu />
        <MdOutlineImage />
      </Button>
      <Button
        display="flex"
        flexDirection="row"
        gap={1}
        position="relative"
        left="-3px"
        borderTopLeftRadius={0}
        borderBottomLeftRadius={0}
        borderTopRightRadius="md"
        borderBottomRightRadius="md"
        colorScheme="blue"
        size="sm"
        variant={
          editedLayout ===
          IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.HORIZONTAL_IMAGE_ON_LEFT
            ? "solid"
            : "outline"
        }
        height="2.5rem"
        onClick={() =>
          handleChangeLayout(
            IMAGE_OR_VIDEO_BLOG_POST_LAYOUTS.HORIZONTAL_IMAGE_ON_LEFT
          )
        }
      >
        <MdOutlineImage />
        <MdMenu />
      </Button>
    </Center>
  );
}

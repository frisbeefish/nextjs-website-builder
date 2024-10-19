import { useState } from "react";

import { Button, Center } from "@chakra-ui/react";

import { MdBorderClear, MdBorderOuter } from "react-icons/md";

import { BLOG_POST_BORDER } from "shared/constants";

export default function PostBorderSelector({ postBorder, onChange, ...rest }) {
  const [editedPostBorder, setEditedPostBorder] = useState(postBorder);

  function handleChangePostBorder(postBorder) {
    setEditedPostBorder(postBorder);
    onChange({
      target: {
        value: postBorder,
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
        title="Has Border"
        variant={
          editedPostBorder === BLOG_POST_BORDER.HAS_BORDER ? "solid" : "outline"
        }
        height="2.5rem"
        onClick={() => handleChangePostBorder(BLOG_POST_BORDER.HAS_BORDER)}
      >
        <MdBorderOuter fontSize="2em" />
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
        title="No Border"
        variant={
          editedPostBorder === BLOG_POST_BORDER.NO_BORDER ? "solid" : "outline"
        }
        height="2.5rem"
        onClick={() => handleChangePostBorder(BLOG_POST_BORDER.NO_BORDER)}
      >
        <MdBorderClear fontSize="2em" opacity=".5" />
      </Button>
    </Center>
  );
}

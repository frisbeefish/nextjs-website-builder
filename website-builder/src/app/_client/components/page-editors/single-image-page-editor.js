"use client";

import { useState, useEffect } from "react";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormHelperText,
  Heading,
  Image,
  Input,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";

import { ImageChooserModal } from "@/app/_client/components";

export default function SingleImagePageEditor({ page, onChange, ...rest }) {
  const [editedPage, setEditedPage] = useState(page.clone());

  const {
    isOpen,
    onOpen: showEditImageModal,
    onClose: closeEditImageModal,
  } = useDisclosure();

  useEffect(() => {
    setEditedPage(page);
  }, [page]);

  function handleUpdateImageUrl(e) {
    setEditedPage({
      ...editedPage,
      imageUrl: e.target.value,
    });
  }

  function saveChanges() {
    onChange({
      target: {
        value: editedPage,
      },
    });
  }

  return (
    <Box backgroundColor="gray.200" position="relative" p={4} {...rest}>
      <ImageChooserModal
        imageUrl={editedPage.imageUrl}
        isOpen={isOpen}
        onClose={closeEditImageModal}
        onChange={handleUpdateImageUrl}
      />

      <Heading size="md" color="blue.500" mb={4}>
        About Page Editor
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

      <FormControl mb={6}>
        <FormLabel>Page Image</FormLabel>

        <Image
          src={editedPage.imageUrl}
          maxWidth="100%"
          alt="Green double couch with wooden legs"
          cursor="pointer"
          onClick={showEditImageModal}
          borderRadius="lg"
        />
      </FormControl>

      <Flex justifyContent="right">
        <Button onClick={saveChanges} colorScheme="blue">
          Save
        </Button>
      </Flex>
    </Box>
  );
}

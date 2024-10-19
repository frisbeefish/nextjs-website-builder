"use client";

import React from "react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Text,
} from "@chakra-ui/react";

export default function DeletePageModal({
  isOpen,
  nameOfPageToDelete,
  onClose,
  onDelete,
  ...rest
}) {
  const cancelRef = React.useRef();

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} {...rest}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Page
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure you want to delete the{" "}
            <Text as="span" fontWeight="bold" color="blue.500">
              {nameOfPageToDelete}
            </Text>{" "}
            page?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={onDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

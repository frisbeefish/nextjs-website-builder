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
} from "@chakra-ui/react";

export default function YouHaveUnsavedDataModal({ isOpen, onClose, ...rest }) {
  const cancelRef = React.useRef();

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} {...rest}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Please Save Your Changes
          </AlertDialogHeader>

          <AlertDialogBody>
            You have unsaved data. Please save your data before proceeding.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} colorScheme="blue" onClick={onClose}>
              OK
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

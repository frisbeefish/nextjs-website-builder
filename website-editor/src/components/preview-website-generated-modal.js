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
  Link,
  Text,
} from "@chakra-ui/react";

import { ExternalLinkIcon } from "@chakra-ui/icons";

export default function PreviewWebsiteGeneratedModal({
  isOpen,
  websiteUrl,
  onClose,
  ...rest
}) {
  const cancelRef = React.useRef();

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} {...rest}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Website Preview is Ready
          </AlertDialogHeader>

          <AlertDialogBody>
            <Link
              fontWeight="bold"
              href={websiteUrl}
              onClick={onClose}
              isExternal
            >
              Click to preview your website.
              <ExternalLinkIcon mx="2px" />
            </Link>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

"use client";

import React, { useState, useEffect } from "react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Center,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";

import { BLOG_POST_TYPES } from "shared/constants";

import { BLOG_PAGE_TEMPLATE } from "shared/page-templates";

import {
  TEXT_POST_TEMPLATE,
  IMAGE_POST_TEMPLATE,
  VIDEO_POST_TEMPLATE,
} from "shared/page-post-templates";

import { apiAiGenerateWebPage } from "rest-api";

export default function AiGenerateWebpageModal({
  isOpen,
  onClose,
  onDelete,
  onWebPageGenerated,
  ...rest
}) {
  const cancelRef = React.useRef();

  const [aiGenerateWebPageQuery, setAiGenerateWebPageQuery] = useState("");
  const [isCreatingPage, setIsCreatingPage] = useState(false);

  function aiGenerateWebPage() {
    setIsCreatingPage(true);
    apiAiGenerateWebPage({ userQuery: aiGenerateWebPageQuery })
      .then((response) => {
        const generatedPage = {
          ...BLOG_PAGE_TEMPLATE.clone(),
          ...response,
        };

        generatedPage.posts = generatedPage.posts.map(function (post) {
          const blogPostObject = {
            [BLOG_POST_TYPES.TEXT_POST]: TEXT_POST_TEMPLATE.clone(),
            [BLOG_POST_TYPES.IMAGE_POST]: IMAGE_POST_TEMPLATE.clone(),
            [BLOG_POST_TYPES.VIDEO_POST]: VIDEO_POST_TEMPLATE.clone(),
          }[post.blogPostType];

          return {
            ...blogPostObject,
            ...post,
          };
        });

        onWebPageGenerated(generatedPage);
      })
      .catch((error) => {
        alert("error " + error);
      })
      .finally(() => {
        setIsCreatingPage(false);
      });
  }

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} {...rest}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Generate a Web Page of 5-7 Posts
          </AlertDialogHeader>

          <AlertDialogBody>
            <FormLabel pt={1}>Question:</FormLabel>
            <Input
              mr={2}
              value={aiGenerateWebPageQuery}
              onChange={(e) => {
                setAiGenerateWebPageQuery(e.target.value);
              }}
            />
          </AlertDialogBody>

          <AlertDialogFooter>
            {!isCreatingPage && (
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
            )}

            <Button
              colorScheme="teal"
              onClick={aiGenerateWebPage}
              ml={3}
              isLoading={isCreatingPage}
              loadingText="Creating Page..."
            >
              Create Page
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

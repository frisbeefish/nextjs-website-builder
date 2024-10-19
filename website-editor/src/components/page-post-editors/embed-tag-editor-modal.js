import React, { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";

export default function EmbedTagEditorModal({
  isOpen,
  embedTag,
  onClose,
  onChange,
  ...rest
}) {
  const [editedEmbedTag, setEditedEmbedTag] = useState(embedTag);
  const cancelRef = React.useRef();

  useEffect(() => {
    setEditedEmbedTag(embedTag);
  }, [embedTag, isOpen]);

  function updateEmbedTag() {
    onChange({
      target: {
        value: editedEmbedTag,
      },
    });
    onClose();
  }

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} {...rest}>
      <AlertDialogOverlay>
        <AlertDialogContent width="900px" maxWidth="900px">
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Edit Embed Tag
          </AlertDialogHeader>

          <FormControl mb={6} pl={6} pr={6}>
            <FormLabel>Edit or Paste Embed Tag:</FormLabel>

            <Textarea
              rows="7"
              backgroundColor="white"
              value={editedEmbedTag}
              onFocus={(e) => e.target.select()}
              onChange={(e) => setEditedEmbedTag(e.target.value)}
              placeholder="Enter the text HTML embed tag."
            />
          </FormControl>

          <Center>
            <Box
              dangerouslySetInnerHTML={{
                __html: `
                ${editedEmbedTag}
        `,
              }}
            ></Box>
          </Center>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={updateEmbedTag} ml={3}>
              Save
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

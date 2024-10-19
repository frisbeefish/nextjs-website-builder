import React, { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  VStack,
} from "@chakra-ui/react";

function OptionalVideosCard({ optionalVideos, onVideoSelected, ...rest }) {
  const optionalVideoThumbnails = optionalVideos.map(function (
    optionalVideo,
    index
  ) {
    //console.log("optIONAl image " + optionalImage.imageUrl);
    return (
      <Image
        key={index}
        onClick={() => onVideoSelected(optionalVideo.videoId)}
        cursor="pointer"
        maxHeight="100px"
        src={optionalVideo.thumbnailImageUrl}
        alt="Green double couch with wooden legs"
        borderRadius="sm"
      />
    );
  });

  return (
    <VStack {...rest}>
      <FormLabel mb={3}>
        Optional: Click the video you would like to use:
      </FormLabel>
      <Flex flexWrap="wrap" gap={2}>
        {optionalVideoThumbnails}
      </Flex>
    </VStack>
  );
}

export default function VideoChooserModal({
  isOpen,
  videoId,
  optionalVideos = [],
  onClose,
  onChange,
  ...rest
}) {
  const [editedVideoId, setEditedVideoId] = useState(videoId);
  const cancelRef = React.useRef();

  useEffect(() => {
    setEditedVideoId(videoId);
    //alert("should have set to " + imageUrl);
  }, [videoId, isOpen]);

  function updateVideoId() {
    onChange({
      target: {
        value: editedVideoId,
      },
    });
    onClose();
  }

  function handleOptionalVideoSelected(videoId) {
    setEditedVideoId(videoId);
  }

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} {...rest}>
      <AlertDialogOverlay>
        <AlertDialogContent width="900px" maxWidth="900px">
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Choose Video
          </AlertDialogHeader>

          <FormControl mb={6} pl={6} pr={6}>
            <FormLabel>You Tube Video Url or Id:</FormLabel>

            <Input
              type="text"
              value={editedVideoId}
              onChange={(e) => {
                if (e.target.value.indexOf("?si=") > 0) {
                  let parts = e.target.value.split("?si=");
                  parts = parts[0].split("/");
                  setEditedVideoId(parts.at(-1));
                } else if (e.target.value.indexOf("v=") > 0) {
                  const parts = e.target.value.split("v=");
                  setEditedVideoId(parts.at(-1));
                } else {
                  setEditedVideoId(e.target.value);
                }
                // https://youtu.be/IT2ASOvESRg?si=G5n1cS5RR9pOZcBa
                // https://www.youtube.com/watch?v=5AO_IfuHU70
                //const parts = e.target.value.split("v=");
                //setEditedVideoId(parts.at(-1)); //e.target.value);
              }}
              backgroundColor="white"
            />
          </FormControl>

          {optionalVideos && optionalVideos.length > 0 && (
            <OptionalVideosCard
              marginLeft="auto"
              marginRight="auto"
              maxWidth="90%"
              optionalVideos={optionalVideos}
              onVideoSelected={handleOptionalVideoSelected}
              mb={3}
            />
          )}

          <Center>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${editedVideoId}`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </Center>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={updateVideoId} ml={3}>
              Save
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

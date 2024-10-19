import React, { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Center,
  FormControl,
  FormLabel,
  FormHelperText,
  Flex,
  Image,
  Input,
  VStack,
} from "@chakra-ui/react";

import FileUploadButton from "./file-upload-button";

import { apiUploadImage } from "@/app/_client/rest-api";

function OptionalImagesCard({ optionalImages, onImageSelected, ...rest }) {
  const optionalImageThumbnails = optionalImages.map(function (
    optionalImage,
    index
  ) {
    //console.log("optIONAl image " + optionalImage.imageUrl);
    return (
      <Image
        key={index}
        onClick={() => onImageSelected(optionalImage.imageUrl)}
        cursor="pointer"
        maxHeight="100px"
        src={optionalImage.imageUrl}
        alt="Green double couch with wooden legs"
        borderRadius="sm"
      />
    );
  });

  return (
    <VStack {...rest}>
      <FormLabel mb={3}>
        Optional: Click the image you would like to use:
      </FormLabel>
      <Flex flexWrap="wrap" gap={2}>
        {optionalImageThumbnails}
      </Flex>
    </VStack>
  );
}

export default function ImageChooserModal({
  isOpen,
  imageUrl,
  optionalImages = [],
  onClose,
  onChange,
  ...rest
}) {
  const [editedImageUrl, setEditedImageUrl] = useState(imageUrl);
  const [fileUploadFormData, setFileUploadFormData] = useState(null);
  const cancelRef = React.useRef();

  useEffect(() => {
    setEditedImageUrl(imageUrl);
  }, [imageUrl, isOpen]);

  function handleSelectedFile(file) {
    //alert("got file " + file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const selectedImageSrc = e.target.result;
      //alert("selectedImageSrc " + selectedImageSrc);
      setEditedImageUrl(selectedImageSrc);

      const formData = new FormData();
      formData.append("file", file);
      //setEditedImageUrl(null);
      setFileUploadFormData(formData);
    };
    reader.readAsDataURL(file);
  }

  function saveNewImageUrl() {
    //alert("save new image url");
    onChange({
      target: {
        value: editedImageUrl,
      },
    });
    onClose();
  }

  function uploadFileAndSaveNewImageUrl() {
    apiUploadImage(fileUploadFormData)
      .then(function (response) {
        //alert("got response");
        //alert(JSON.stringify(response, null, 3));

        onChange({
          target: {
            value: response.url,
          },
        });
        onClose();
      })
      .catch((error) => {
        alert("error " + error);
      })
      .finally(() => {
        console.log("finally");
      });

    // apiUploadFile

    /*
    onChange({
      target: {
        value: editedImageUrl,
      },
    });
    onClose();
    */
  }

  function handleOptionalImageSelected(imageUrl) {
    //alert("selected " + imageUrl);
    setEditedImageUrl(imageUrl);
    setFileUploadFormData(null);
  }

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} {...rest}>
      <AlertDialogOverlay>
        <AlertDialogContent width="900px" maxWidth="900px">
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Choose Image
          </AlertDialogHeader>
          <FormControl mb={6} pl={6} pr={6}>
            <FileUploadButton
              buttonLabel="Choose an image from your computer..."
              handleFile={handleSelectedFile}
            />
          </FormControl>
          <FormControl mb={4} pl={6} pr={6}>
            <FormLabel mb={2}>Or... Paste your Image URL here</FormLabel>

            <Input
              type="text"
              value={editedImageUrl}
              onFocus={(e) => e.target.select()}
              onChange={(e) => {
                setFileUploadFormData(null);
                setEditedImageUrl(e.target.value);
              }}
              backgroundColor="white"
            />
          </FormControl>

          {optionalImages && optionalImages.length > 0 && (
            <OptionalImagesCard
              marginLeft="auto"
              marginRight="auto"
              maxWidth="90%"
              optionalImages={optionalImages}
              onImageSelected={handleOptionalImageSelected}
              mb={3}
            />
          )}

          <Center>
            <Image
              maxHeight="300px"
              src={editedImageUrl}
              alt="Green double couch with wooden legs"
              borderRadius="lg"
            />
          </Center>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={
                fileUploadFormData
                  ? uploadFileAndSaveNewImageUrl
                  : saveNewImageUrl
              }
              ml={3}
            >
              Save
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

import React, { useState, useEffect } from "react";

import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  Input,
  Link,
  Textarea,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import {
  DoYouWantToDeleteModal,
  FileUploadButton,
} from "@/app/_client/components";

import { ExternalLinkIcon } from "@chakra-ui/icons";

import { MdCheck } from "react-icons/md";

import { apiUploadFile } from "@/app/_client/rest-api";

import { timestampToFriendlyDate } from "@/app/_shared/date-utils";

function FileSection({ file, onChange, onDelete, ...rest }) {
  const [editedDescription, setEditedDescription] = useState(null);

  const descriptionField =
    editedDescription !== null ? (
      <Flex alignItems="center" mt={3}>
        <Input
          flex={1}
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          backgroundColor="white"
          placeholder="Please enter a description of the file."
        />
        <Button
          colorScheme="gray"
          size="sm"
          ml={2}
          mr={2}
          onClick={() => setEditedDescription(null)}
        >
          Cancel
        </Button>
        <Button
          colorScheme="blue"
          size="sm"
          onClick={() => {
            onChange({
              target: {
                value: editedDescription,
              },
            });
            setEditedDescription(null);
          }}
        >
          Save
        </Button>
      </Flex>
    ) : (
      <FormHelperText
        mt={2}
        pt={0}
        mb={0}
        onClick={() => setEditedDescription(file.description)}
      >
        {file.description}
      </FormHelperText>
    );

  return (
    <Box
      {...rest}
      backgroundColor="#f9f9f9"
      borderRadius="var(--chakra-radii-md)"
      padding="var(--chakra-space-4)"
    >
      <FormControl>
        <Link fontWeight="bold" href={file.fileUrl} isExternal>
          {file.name} <ExternalLinkIcon mx="2px" />
        </Link>
        <Button
          size="sm"
          minWidth="inherit"
          height="inherit"
          p="2px"
          px="6px"
          pb="4px"
          backgroundColor="transparent"
          _hover={{
            backgroundColor: "var(--chakra-colors-red-500)",
            color: "white",
          }}
          ml={1}
          position="relative"
          top="0px"
          color="var(--chakra-colors-red-700)"
          onClick={onDelete}
        >
          &times;
        </Button>
        {descriptionField}
      </FormControl>
    </Box>
  );
}

export default function FilesPostEditor({ post, onChange, onDelete, ...rest }) {
  const [editedPost, _setEditedPost] = useState(post.clone());
  const [postHasChanged, setPostHasChanged] = useState(false);
  const [saveButtonIcon, setSaveButtonIcon] = useState(null);
  const [saveButtonLabel, setSaveButtonLabel] = useState("Save Post");
  const [fileToDelete, setFileToDelete] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(false);

  const {
    isOpen: isDoYouWantToDeleteOpen,
    onOpen: showDoYouWantToDeletModal,
    onClose: _closeDoYouWantToDeletModal,
  } = useDisclosure();

  useEffect(() => {
    _setEditedPost(post);
  }, [post]);

  function setEditedPost(updatedPost) {
    setPostHasChanged(true);
    _setEditedPost(updatedPost);
  }

  function saveChanges() {
    onChange({
      target: {
        value: editedPost,
      },
    });
    setSaveButtonIcon(<MdCheck />);
    setSaveButtonLabel("Saved");
    setTimeout(() => {
      setPostHasChanged(false);
      setSaveButtonLabel("Save Post");
      setSaveButtonIcon(null);
    }, 1000);
  }

  function closeDoYouWantToDeletModal() {
    setFileToDelete(null);
    _closeDoYouWantToDeletModal();
  }

  function doReallyDeleteFile() {
    //alert("do really delete");

    const deletedFileIndex = editedPost.files.indexOf(fileToDelete);
    //alert("deletedFileIndex " + deletedFileIndex);
    //alert("changedFile " + changedFile);
    setEditedPost({
      ...editedPost,
      files: [
        ...editedPost.files.slice(0, deletedFileIndex),
        ...editedPost.files.slice(deletedFileIndex + 1),
      ],
    });

    closeDoYouWantToDeletModal();
  }

  /*
  let decodedBody = "";

  try {
    decodedBody = decodeURIComponent(post.body);
  } catch (error) {
    try {
      decodedBody = unescape(post.body);
    } catch (error) {}
  }
  */

  function handleChangeFileDescription(e, file) {
    // alert("changed " + e.target.value);
    const changedFileIndex = editedPost.files.indexOf(file);
    //alert("changedFile " + changedFile);
    setEditedPost({
      ...editedPost,
      files: [
        ...editedPost.files.slice(0, changedFileIndex),
        {
          ...editedPost.files[changedFileIndex],
          description: e.target.value,
        },
        ...editedPost.files.slice(changedFileIndex + 1),
      ],
    });
  }

  function handleDeleteFile(file) {
    setFileToDelete(file);
    showDoYouWantToDeletModal();
    /*
    return;
    const deletedFileIndex = editedPost.files.indexOf(file);
    //alert("changedFile " + changedFile);
    setEditedPost({
      ...editedPost,
      files: [
        ...editedPost.files.slice(0, deletedFileIndex),
        ...editedPost.files.slice(deletedFileIndex + 1),
      ],
    });
    */
  }

  /*
  return NextResponse.json({
      filename: filename,
      url: `static/files/${filename}`,
    });
  */

  function uploadSelectedFile(file) {
    //alert("do the upload");

    const reader = new FileReader();
    reader.onload = (e) => {
      //const selectedImageSrc = e.target.result;
      //alert("selectedImageSrc " + selectedImageSrc);
      //setEditedImageUrl(selectedImageSrc);

      const formData = new FormData();
      formData.append("file", file);

      //alert("ready");

      setUploadingFile(true);
      apiUploadFile(formData)
        .then(function (response) {
          //alert("got response");
          //alert(JSON.stringify(response, null, 3));

          /*
           "name": "sample1.pdf",
              "description": "A sample 1",
              "fileUrl": "static/files/sample.pdf"
          */

          setEditedPost({
            ...editedPost,
            files: [
              ...editedPost.files,
              {
                name: response.filename,
                fileUrl: response.url,
                description: "Please enter a description of the file.",
              },
            ],
          });

          /*
        onChange({
          target: {
            value: response.url,
          },
        });
        onClose();
        */
        })
        .catch((error) => {
          alert("error " + error);
        })
        .finally(() => {
          console.log("finally");
          setUploadingFile(false);
        });

      //setEditedImageUrl(null);
      //setFileUploadFormData(formData);
    };
    reader.readAsDataURL(file);
  }

  const fileSections = editedPost.files.map(function (file, index) {
    return (
      <FileSection
        file={file}
        key={index}
        onChange={(e) => handleChangeFileDescription(e, file)}
        onDelete={() => handleDeleteFile(file)}
      />
    );
  });

  return (
    <Card {...rest}>
      <DoYouWantToDeleteModal
        heading="Do you really want to delete this file?"
        message={fileToDelete ? `File: ${fileToDelete.name}` : ""}
        isOpen={isDoYouWantToDeleteOpen}
        onClose={closeDoYouWantToDeletModal}
        onDelete={doReallyDeleteFile}
      />
      <CardHeader>
        <Flex
          position="relative"
          justifyContent="flex-start"
          justify="space-around"
          p={0}
          backgroundColor="white"
        >
          <Text
            color="gray.400"
            fontWeight="bold"
            position="absolute"
            left="50%"
            top="50%"
            transform="translateX(-50%) translateY(-50%)"
          >
            Files Post
          </Text>
          <Center marginLeft="auto">
            <Button
              colorScheme="gray"
              _hover={{
                color: "white",
                backgroundColor: "var(--chakra-colors-red-500)",
              }}
              size="sm"
              mr={2}
              onClick={onDelete}
            >
              Delete
            </Button>
            <Button
              isDisabled={!postHasChanged}
              leftIcon={saveButtonIcon}
              colorScheme="blue"
              size="sm"
              onClick={saveChanges}
            >
              {saveButtonLabel}
            </Button>
          </Center>
        </Flex>
      </CardHeader>
      <Box pl={2} pr={2}>
        <Divider />
      </Box>
      <CardBody>
        <Stack mb={0} pb={0} spacing="3">
          <Flex justify="space-between">
            <Center flex="1" mr={2}>
              <Input
                color="blue.500"
                fontWeight="bold"
                fontSize="1.2rem"
                type="text"
                value={editedPost.heading}
                onChange={(e) =>
                  setEditedPost({
                    ...editedPost,
                    heading: e.target.value,
                  })
                }
              />
            </Center>
            <Center>
              {editedPost.creationDateTime && (
                <Badge variant="outline" colorScheme="blue">
                  {timestampToFriendlyDate(editedPost.creationDateTime)}
                </Badge>
              )}
            </Center>
          </Flex>
          <Textarea
            value={editedPost.body}
            onChange={(e) =>
              setEditedPost({
                ...editedPost,
                body: e.target.value,
              })
            }
            placeholder="Enter the text that you would like to show in the main area of this webpage."
          />

          {fileSections}

          <Center>
            <FileUploadButton
              handleFile={uploadSelectedFile}
              buttonLabel="Choose File..."
              uploading={uploadingFile}
            />
          </Center>
        </Stack>
      </CardBody>
    </Card>
  );
}

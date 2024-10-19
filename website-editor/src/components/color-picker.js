import React, { useState, useEffect } from "react";

import {
  Box,
  Button,
  Center,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  SimpleGrid,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";

const colors = [
  "white",
  "gray.500",
  "red.500",
  "gray.700",
  "green.500",
  "blue.500",
  //"blue.800",
  "yellow.500",
  "orange.500",
  "purple.500",
  "pink.500",
];

export default function ColorPicker({ color, onChange, ...rest }) {
  const [editedColor, setEditedColor] = useState(color);
  const [colorVariant, setColorVariant] = useState(
    color.indexOf("white") >= 0 ? 500 : color.split(".")[1]
  );

  useEffect(() => {
    setEditedColor(updateColorWithCurrentColorVariant(color));
    setColorVariant(color.indexOf("white") >= 0 ? 500 : color.split(".")[1]);
  }, [color]);

  function updateColorWithCurrentColorVariant(
    color,
    _colorVariant = colorVariant
  ) {
    if (color.indexOf("white") === -1) {
      const colorNoVariant = color.split(".")[0];
      color = `${colorNoVariant}.${_colorVariant}`;
    }
    return color;
  }

  function handleColorChange(color) {
    color = updateColorWithCurrentColorVariant(color);

    setEditedColor(color);

    onChange(color);
  }

  function handleColorVariantChange(val) {
    val = Math.min(900, Math.max(100, val));

    setColorVariant(val);
    const color = updateColorWithCurrentColorVariant(editedColor, val);
    setEditedColor(color);
    onChange(color);
  }

  return (
    <Popover variant="picker">
      <PopoverTrigger>
        <Button
          aria-label={editedColor}
          background={editedColor}
          height="22px"
          width="22px"
          {...rest}
          padding={0}
          minWidth="unset"
          border={
            editedColor === "white"
              ? "1px solid #999"
              : `1px solid var(--chakra-colors-${
                  editedColor.split(".")[0]
                }-300)`
          }
          borderRadius={3}
        ></Button>
      </PopoverTrigger>
      <PopoverContent width="170px">
        <PopoverArrow bg={editedColor} />
        <PopoverCloseButton color="white" />
        <PopoverHeader
          height="100px"
          backgroundColor={editedColor}
          borderTopLeftRadius={5}
          borderTopRightRadius={5}
          color={editedColor.indexOf("white") >= 0 ? "#333" : "white"}
        >
          <Center height="100%">{editedColor}</Center>
        </PopoverHeader>
        <PopoverBody height={editedColor === "white" ? "80px" : "120px"}>
          <SimpleGrid columns={5} spacing={2}>
            {colors.map((c) => (
              <Button
                key={c}
                aria-label={c}
                background={c}
                height="22px"
                width="22px"
                padding={0}
                minWidth="unset"
                borderRadius={3}
                border={c === "white" ? "1px solid #999" : ""}
                _hover={{ background: c }}
                onClick={() => {
                  handleColorChange(c);
                }}
              ></Button>
            ))}
          </SimpleGrid>
          {editedColor !== "white" && (
            <Slider
              mt={6}
              defaultValue={500}
              onChange={handleColorVariantChange}
              min={0}
              max={1000}
              step={100}
            >
              <SliderTrack bg="#eeeeee">
                <Box position="relative" right={10} />
                <SliderFilledTrack bg={editedColor} />
              </SliderTrack>
              <SliderThumb boxSize={4} backgroundColor={editedColor} />
            </Slider>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

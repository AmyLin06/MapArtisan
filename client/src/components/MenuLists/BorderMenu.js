import { CirclePicker } from "react-color";
import { BorderColor as BorderColorIcon } from "@mui/icons-material";
import React, { useState } from "react";
import { IconButton, Popover } from "@mui/material";

export default function BorderMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFillColor, setSelectedColor] = useState(""); // Set a default color

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
    // You can perform additional actions on color change if needed
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <IconButton
        aria-label="fill-in"
        onClick={handleClick}
        sx={{ color: selectedFillColor }}
      >
        <BorderColorIcon />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <CirclePicker
          color={selectedFillColor}
          onChangeComplete={handleColorChange}
          width={"100%"}
        />
      </Popover>
    </>
  );
}

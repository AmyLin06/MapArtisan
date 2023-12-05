import { CirclePicker } from "react-color";
import { BorderColor as BorderColorIcon } from "@mui/icons-material";
import React, { useState, useContext, useEffect } from "react";
import { IconButton, Popover, Tooltip } from "@mui/material";
import { EditMapContext } from "../../store/EditMapStore";

export default function BorderMenu() {
  const { editStore } = useContext(EditMapContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBorderColor, setSelectedColor] = useState(""); // Set a default color

  // useEffect(() => {
  //   console.log(editStore.activeTool);
  //   console.log(editStore.activeTool.detail.hex);
  //   // Perform actions here that rely on the updated activeTool state
  // }, [editStore.activeTool]); // This useEffect will re-run when editStore.activeTool changes

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
    editStore.setActiveBorder(color);
    // You can perform additional actions on color change if needed
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Tooltip title="Border" disableFocusListener disableTouchListener>
        <IconButton
          aria-label="border"
          onClick={handleClick}
          sx={{
            color: selectedBorderColor,
            border:
              editStore.activeTool.tool === "BORDER"
                ? "2px solid #246BAD"
                : "none",
          }}
        >
          <BorderColorIcon />
        </IconButton>
      </Tooltip>

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
        sx={{ width: "60%" }}
      >
        <CirclePicker
          color={selectedBorderColor}
          onChangeComplete={handleColorChange}
          width={"100%"}
        />
      </Popover>
    </>
  );
}

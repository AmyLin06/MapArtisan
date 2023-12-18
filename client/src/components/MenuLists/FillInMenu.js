import { SketchPicker } from "react-color";
import { FormatColorFill as FormatColorFillIcon } from "@mui/icons-material";
import React, { useState, useContext } from "react";
import { IconButton, Popover, Tooltip } from "@mui/material";
import { EditMapContext } from "../../store/EditMapStore";

export default function ExportMenuList() {
  const { editStore } = useContext(EditMapContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFillColor, setSelectedColor] = useState(""); // Set a default color

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
    editStore.setActiveFillin(color);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Tooltip title="Fill-in" disableFocusListener disableTouchListener>
        <IconButton
          aria-label="fill-in"
          onClick={handleClick}
          sx={{
            color: selectedFillColor,
            border:
              editStore.activeTool.tool === "FILLIN"
                ? "2px solid #246BAD"
                : "none",
          }}
        >
          <FormatColorFillIcon />
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
      >
        <SketchPicker
          color={selectedFillColor}
          onChangeComplete={handleColorChange}
          disableAlpha
        />
      </Popover>
    </>
  );
}

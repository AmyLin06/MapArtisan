import { SketchPicker } from "react-color";
import { BorderColor as BorderColorIcon } from "@mui/icons-material";
import React, { useState, useContext } from "react";
import { IconButton, Popover, Tooltip } from "@mui/material";
import { EditMapContext } from "../../store/EditMapStore";

export default function BorderMenu() {
  const { editStore } = useContext(EditMapContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBorderColor, setSelectedColor] = useState("");

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
          horizontal: "right",
        }}
      >
        <SketchPicker
          color={selectedBorderColor}
          onChangeComplete={handleColorChange}
          disableAlpha
        />
      </Popover>
    </>
  );
}

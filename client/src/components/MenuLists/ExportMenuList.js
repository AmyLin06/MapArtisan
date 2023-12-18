import React, { useState, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Paper, Tooltip } from "@mui/material";
import CanvasDataContext from "../../store/ContextProviders/CanvasDataContext";
import EditMapContext from "../../store/EditMapStore";

//menu that opens and displays options for data formats the user can export the map in
export default function ExportMenuList() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { editStore } = useContext(EditMapContext);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePNGExport = () => {
    console.log(editStore.mapImageUrl);
    const link = document.createElement("a");
    link.href = editStore.mapImageUrl;
    link.download = "exported-map.png";
    link.click();
    handleClose();
  };
  const open = Boolean(anchorEl);

  return (
    <>
      <Tooltip title="Export Map" disableFocusListener disableTouchListener>
        <IconButton onClick={handleOpen}>
          <ArrowUpwardIcon />
        </IconButton>
      </Tooltip>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
        }}
      >
        <Paper style={{ background: "#FFFDF3" }}>
          {/* <MenuItem
            onClick={handleClose}
            sx={{
              "&:hover": {
                background: "#246BAD",
              },
            }}
          >
            {"Custom JSON"}
          </MenuItem> */}
          <MenuItem
            onClick={handleClose}
            sx={{
              "&:hover": {
                background: "#246BAD",
              },
            }}
          >
            {"JPG"}
          </MenuItem>
          <MenuItem
            onClick={handlePNGExport}
            sx={{
              "&:hover": {
                background: "#246BAD",
              },
            }}
          >
            {"PNG"}
          </MenuItem>
        </Paper>
      </Popover>
    </>
  );
}

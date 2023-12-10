import { React, useState, useRef, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Typography, Box, Paper, Tooltip } from "@mui/material";
import { EditMapContext } from "../../store/EditMapStore";

//menu that opens and displays options for data formats the user can import
export default function ImportMenuList() {
  const { editStore } = useContext(EditMapContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const fileInputRef = useRef(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleImportFile = (event) => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    const selectedFile = event.target.files[0];
    editStore.addLayer(selectedFile);
    handleClose();
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <Tooltip title="Import File" disableFocusListener disableTouchListener>
        <IconButton onClick={handleOpen}>
          <ArrowDownwardIcon />
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
          <MenuItem
            onClick={handleImportFile}
            sx={{
              "&:hover": {
                background: "#246BAD",
              },
            }}
          >
            {"KML"}
          </MenuItem>
          <MenuItem
            onClick={handleImportFile}
            sx={{
              "&:hover": {
                background: "#246BAD",
              },
            }}
          >
            {"GeoJSON"}
          </MenuItem>
          <MenuItem
            onClick={handleImportFile}
            sx={{
              "&:hover": {
                background: "#246BAD",
              },
            }}
          >
            {"Shapefile"}
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            sx={{
              "&:hover": {
                background: "#246BAD",
              },
            }}
          >
            {"Custom JSON"}
          </MenuItem>
        </Paper>
      </Popover>
    </>
  );
}

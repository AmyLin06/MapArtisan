import { React, useState, useRef, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Typography, Box, Paper } from "@mui/material";
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

  const handleGeoJson = (event) => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    // Add the GeoJSON file as a layer to the current map
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const data = JSON.parse(event.target.result);
      editStore.addLayer(data, "GEOJSON");
    };
    fileReader.readAsText(event.target.files[0]);
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

      <IconButton onClick={handleOpen}>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            verticalAlign: "center",
          }}
        >
          <ArrowDownwardIcon style={{ fontSize: "1rem" }} />
          <Typography style={{ verticalAlign: "middle" }}>Import</Typography>
        </Box>
      </IconButton>
      <Popover open={open} anchorEl={anchorEl} onClose={handleClose}>
        <Paper style={{ background: "#FFFDF3" }}>
          <MenuItem
            onClick={handleClose}
            sx={{
              "&:hover": {
                background: "#246BAD",
              },
            }}
          >
            {"KML"}
          </MenuItem>
          <MenuItem
            onClick={handleGeoJson}
            sx={{
              "&:hover": {
                background: "#246BAD",
              },
            }}
          >
            {"GeoJSON"}
          </MenuItem>
          <MenuItem
            onClick={handleClose}
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

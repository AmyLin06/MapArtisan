import { React, useState, useRef, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Paper, Tooltip } from "@mui/material";
import { EditMapContext } from "../../store/EditMapStore";
import { read } from "shapefile";
import toGeoJSON from "togeojson";

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

  const getFileExtension = (filename) => {
    return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();

    if (
      getFileExtension(selectedFile.name) === "json" ||
      getFileExtension(selectedFile.name) === "geojson"
    ) {
      // Add the GeoJSON file as a layer to the current map
      fileReader.onload = (event) => {
        const data = JSON.parse(event.target.result);
        editStore.addLayer(selectedFile.name, data, "GEOJSON");
      };
      fileReader.readAsText(event.target.files[0]);
    } else if (getFileExtension(selectedFile.name) === "kml") {
      fileReader.onload = (event) => {
        const parser = new DOMParser();
        const text = parser.parseFromString(event.target.result, "text/xml");
        const data = toGeoJSON.kml(text);
        editStore.addLayer(selectedFile.name, data, "GEOJSON");
      };
      fileReader.readAsText(event.target.files[0]);
    } else if (getFileExtension(selectedFile.name) === "shp") {
      fileReader.onload = async (event) => {
        const arrayBuffer = event.target.result; // ArrayBuffer from FileReader

        try {
          const { features } = await read(arrayBuffer);
          const geoJson = {
            type: "FeatureCollection",
            features: features || [],
          };
          editStore.addLayer(selectedFile.name, geoJson, "SHAPEFILE");
        } catch (error) {
          console.error("Error parsing shapefile SAD:", error);
        }
      };
      fileReader.readAsArrayBuffer(event.target.files[0]);
    }
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
          <ArrowDownwardIcon style={{ fontSize: "1rem" }} />
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

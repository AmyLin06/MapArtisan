import { React, useState, useRef, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Paper, Tooltip } from "@mui/material";
import { EditMapContext } from "../../store/EditMapStore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import storage from "../../firebaseConfig";
import toGeoJSON from "togeojson";
import { read } from "shapefile";

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
    const file = event.target.files[0];
    const fileReader = new FileReader();
    let data = null;
    if (
      getFileExtension(file.name) === "json" ||
      getFileExtension(file.name) === "geojson"
    ) {
      fileReader.onload = (event) => {
        data = JSON.parse(event.target.result);
        uploadToFirebase(data, file.name);
      };
      fileReader.readAsText(file);
    } else if (getFileExtension(file.name) === "kml") {
      fileReader.onload = (event) => {
        const parser = new DOMParser();
        const text = parser.parseFromString(event.target.result, "text/xml");
        data = toGeoJSON.kml(text);
        uploadToFirebase(data, file.name);
      };
      fileReader.readAsText(file);
    } else if (getFileExtension(file.name) === "shp") {
      fileReader.onload = async (event) => {
        const arrayBuffer = event.target.result; // ArrayBuffer from FileReader
        try {
          const { features } = await read(arrayBuffer);
          data = {
            type: "FeatureCollection",
            features: features || [],
          };
          uploadToFirebase(data, file.name);
        } catch (error) {
          console.error("Error parsing shapefile SAD:", error);
        }
      };
      fileReader.readAsArrayBuffer(file);
    }
    handleClose();
  };

  const uploadToFirebase = (data, fileName) => {
    const storageRef = ref(
      storage,
      `/geo-json-datas/map-id-${editStore.currentMapMetaData._id}/${fileName}`
    );
    uploadString(storageRef, JSON.stringify(data), "raw", {
      contentType: "application/json",
    })
      .then((snapshot) => {
        console.log("Upload complete.");
        return getDownloadURL(snapshot.ref);
      })
      .then((url) => {
        editStore.addLayer(fileName, url);
      })
      .catch((error) => {
        console.error("Error uploading", error);
      });
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
        </Paper>
      </Popover>
    </>
  );
}

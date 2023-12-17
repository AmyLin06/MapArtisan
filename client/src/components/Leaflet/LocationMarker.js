import React, { useContext, useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { EditMapContext } from "../../store/EditMapStore";
import L from "leaflet";
import mapMarkers from "../../assets/mapPins/markers/mapMarkers";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  IconButton,
  Typography,
  Box,
  ButtonGroup,
  Switch,
  Tooltip,
} from "@mui/material";
import DriveFileRenameOutline from "@mui/icons-material/DriveFileRenameOutline";
import MarkerDialog from "./MarkerDialog";

const LocationMarker = () => {
  const { editStore } = useContext(EditMapContext);
  const [open, setOpen] = useState(false);
  const [activeMarker, setActiveMarker] = useState({
    index: null,
    message: "",
  });

  const handleMarkerEdit = (index, text) => {
    setActiveMarker({ index: index, message: text });
    setOpen(true);
  };

  const handleClose = (updatedText) => {
    setOpen(false);
    editStore.updateMarkerMessage(activeMarker.index, updatedText);
    setActiveMarker({ index: null, message: "" });
  };

  const createMarkerIcon = (iconKey) => {
    return new L.Icon({
      iconUrl: mapMarkers[iconKey],
      popupAnchor: [-0, -0],
      iconSize: [35, 45],
    });
  };

  // eslint-disable-next-line
  const map = useMapEvents({
    click(e) {
      if (editStore.activeTool.tool === "MARKER") {
        const newMarker = {
          iconKey: editStore.activeTool.detail,
          coordinates: e.latlng,
          message: "",
          draggable: false,
        };
        editStore.addMarker(newMarker); //Add the coordinate to edit store as well
      }
    },
  });

  const handleMarkerDelete = (event, index) => {
    event.stopPropagation();
    editStore.deleteMarker(index);
  };

  const toggleMarkerDraggable = (event, index) => {
    event.stopPropagation();
    editStore.updateMarkerDraggable(index);
  };

  return (
    <>
      {editStore.currentMapGraphic
        ? editStore.currentMapGraphic.markers.map((marker, index) => (
            <Marker
              key={index}
              draggable={marker.draggable}
              position={marker.coordinates}
              icon={createMarkerIcon(marker.iconKey)}
              eventHandlers={{
                dragend: (e) => {
                  const newCoords = e.target.getLatLng();
                  editStore.updateMarkerCoords(index, newCoords);
                },
              }}
            >
              <Popup>
                <Box
                  sx={{
                    maxWidth: "300px",
                    maxHeight: "200px",
                    overflow: "auto",
                  }}
                >
                  <Typography sx={{ wordWrap: "break-word" }}>
                    {marker.message}
                  </Typography>
                </Box>

                <ButtonGroup>
                  <Tooltip
                    arrow
                    title={marker.draggable ? "Disable Drag" : "Enable Drag"}
                  >
                    <Switch
                      checked={marker.draggable}
                      onChange={(event) => toggleMarkerDraggable(event, index)}
                    />
                  </Tooltip>
                  <Tooltip arrow title="Edit Text">
                    <IconButton
                      onClick={() => handleMarkerEdit(index, marker.message)}
                    >
                      <DriveFileRenameOutline />
                    </IconButton>
                  </Tooltip>
                  <Tooltip arrow title="Delete Marker">
                    <IconButton
                      onClick={(event) => handleMarkerDelete(event, index)}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Tooltip>
                </ButtonGroup>
              </Popup>
            </Marker>
          ))
        : null}
      <MarkerDialog
        open={open}
        onClose={handleClose}
        text={activeMarker.message}
      />
    </>
  );
};

export default LocationMarker;

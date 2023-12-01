import React, { useState, useContext } from "react";
import mapMarkers from "../assets/mapPins/markers/mapMarkers";
import Button from "@mui/material/Button";
import { EditMapContext } from "../store/EditMapStore";

const MapPins = () => {
  const { editStore } = useContext(EditMapContext);
  const [selectedMarker, setSelectedMarker] = useState(editStore.activeMarker);

  const handleIconClick = (key) => {
    if (key === selectedMarker) {
      setSelectedMarker(null);
      editStore.setActiveMarker(null);
    } else {
      setSelectedMarker(key);
      editStore.setActiveMarker(key);
    }
  };

  return (
    <div>
      {Object.entries(mapMarkers).map(([key, icon], index) => (
        <Button
          key={index}
          variant="text"
          style={{
            border: selectedMarker === key ? "2px solid #246BAD" : "none",
          }}
          onClick={() => handleIconClick(key)}
        >
          <img
            src={icon}
            alt={`${key}-${index}`}
            style={{ width: "25px", height: "25px" }}
          />
        </Button>
      ))}
    </div>
  );
};

export default MapPins;

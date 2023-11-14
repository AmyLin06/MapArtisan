import React from "react";
import best from "../assets/mapPins/best-place.png";
import bus from "../assets/mapPins/bus.png";
import google from "../assets/mapPins/google-maps.png";
import loc from "../assets/mapPins/location-1.png";
import loc2 from "../assets/mapPins/location-pin.png";
import loc3 from "../assets/mapPins/location.png";
import park from "../assets/mapPins/park.png";
import pin from "../assets/mapPins/pin.png";
import place from "../assets/mapPins/placeholder.png";
import place2 from "../assets/mapPins/placeholder-1.png";

import Button from "@mui/material/Button";

const MapPins = () => {
  var iconList = [best, bus, google, loc, loc2, loc3, park, pin, place, place2];

  return (
    <div>
      {iconList.map((icon, index) => (
        <Button key={index} variant="text" color="primary">
          <img
            src={icon}
            alt={`icon-${index}`}
            style={{ width: "25px", height: "25px" }}
          />
        </Button>
      ))}
    </div>
  );
};

export default MapPins;

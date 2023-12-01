import React, { useState, useContext } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { EditMapContext } from "../../store/EditMapStore";
import L from "leaflet";
import mapMarkers from "../../assets/mapPins/markers/mapMarkers";

const LocationMarker = () => {
  const { editStore } = useContext(EditMapContext);
  const [markers, setMarkers] = useState([]);

  const createMarkerIcon = (iconKey) => {
    return new L.Icon({
      iconUrl: mapMarkers[iconKey],
      popupAnchor: [-0, -0],
      iconSize: [35, 45],
    });
  };

  const map = useMapEvents({
    click(e) {
      if (editStore.activeMarker) {
        const newMarker = [
          ...markers,
          { iconKey: editStore.activeMarker, coordinates: e.latlng },
        ];
        setMarkers(newMarker);
        editStore.addMarker(newMarker); //Add the coordinate to edit store as well
      }
    },
  });

  return (
    <>
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker.coordinates}
          icon={createMarkerIcon(marker.iconKey)}
        >
          <Popup>Hi</Popup>
        </Marker>
      ))}
    </>
  );
};

export default LocationMarker;

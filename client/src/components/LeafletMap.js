import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { Box } from "@mui/material";
import "leaflet/dist/leaflet.css";
import { useContext, useEffect, useState } from "react";
import { EditMapContext } from "../store/EditMapStore";
import RenderGeoJson from "../services/RenderGeoJson";

function LeafletMap() {
  const { editStore } = useContext(EditMapContext);
  const center = [40.902771, -73.13385];
  // const map = useMap();

  // useEffect(() => {
  const mapLayers = editStore.currentMap.layers.map((layer, index) => {
    if (layer.layerType === "GEOJSON") {
      return (
        <RenderGeoJson
          key={index}
          // map={map}
          mapData={layer.data} // Assuming the 'data' property contains GeoJSON data
        />
      );
    }

    // Add additional conditions for other layer types if needed
    return null; // or a default component if the layer type is unknown
  });
  // }, []);

  return (
    <Box>
      <MapContainer center={center} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      {mapLayers}
      {/* <RenderGeoJson mapData={editStore.currentMap.layers[0]} /> */}
    </Box>
  );
}

export default LeafletMap;

import { MapContainer, TileLayer } from "react-leaflet";
import { Box } from "@mui/material";
import "leaflet/dist/leaflet.css";
import { useContext, useRef } from "react";
import { EditMapContext } from "../../store/EditMapStore";
import RenderGeoJson from "./GeoJsonLayer";
import RenderKML from "./KMLLayer";
import LocationMarker from "./LocationMarker";

function LeafletMap() {
  const { editStore } = useContext(EditMapContext);
  const center = [40.902771, -73.13385];
  const map_container_ref = useRef(null);

  const mapLayers = editStore.currentMap.layers.map((layer, index) => {
    if (layer.layerType === "GEOJSON" || layer.layerType === "SHAPEFILE") {
      return <RenderGeoJson mapData={layer.data} />;
    }
    if (layer.layerType === "KML") {
      return <RenderKML mapData={layer.data} />;
    }
    // Add additional conditions for other layer types if needed
    return null; // or a default component if the layer type is unknown
  });

  return (
    <Box>
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        ref={map_container_ref}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {mapLayers}
        <LocationMarker />
      </MapContainer>
    </Box>
  );
}

export default LeafletMap;

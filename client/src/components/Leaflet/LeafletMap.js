import { MapContainer, TileLayer } from "react-leaflet";
import { Box } from "@mui/material";
import "leaflet/dist/leaflet.css";
import { useContext, useRef } from "react";
import { EditMapContext } from "../../store/EditMapStore";
import RenderGeoJson from "./GeoJsonLayer";
import LocationMarker from "./LocationMarker";

function LeafletMap() {
  const { editStore } = useContext(EditMapContext);
  const center = [40.902771, -73.13385];
  const map_container_ref = useRef(null);

  let mapLayers = null;
  if (editStore.currentMapGraphic) {
    mapLayers = editStore.currentMapGraphic.layers.map((layer, index) => {
      return <RenderGeoJson mapData={layer.data} />;
    });
  }

  return (
    <Box>
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        ref={map_container_ref}
      >
        <TileLayer
          noWrap
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

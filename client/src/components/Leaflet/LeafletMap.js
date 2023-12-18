import { MapContainer, TileLayer } from "react-leaflet";
import { Box } from "@mui/material";
import "leaflet/dist/leaflet.css";
import { useContext } from "react";
import { EditMapContext } from "../../store/EditMapStore";
import RenderGeoJson from "./GeoJsonLayer";
import LocationMarker from "./LocationMarker";
import ChoroplethMap from "./ChoroplethMap";

function LeafletMap() {
  const { editStore } = useContext(EditMapContext);
  const center = [40.902771, -73.13385];
  // const [map, setMap] = useState(null);

  let mapLayers = null;
  mapLayers = editStore.currentMapGraphic?.layers.map((layer, index) => {
    console.log(layer);
    if (layer.filename == "ChoroplethMap") {
      console.log(layer);
      return <ChoroplethMap mapData={layer} />;
    } else {
      return <RenderGeoJson layer={layer} />;
    }
  });

  return (
    <Box>
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        // ref={setMap}
      >
        <TileLayer
          noWrap
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {mapLayers}
        <LocationMarker />
        {/* <RoutingTemplate /> */}
      </MapContainer>
    </Box>
  );
}

export default LeafletMap;

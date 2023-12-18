import { MapContainer, TileLayer } from "react-leaflet";
import { Box } from "@mui/material";
import "leaflet/dist/leaflet.css";
import { useContext } from "react";
import { EditMapContext } from "../../store/EditMapStore";
import RenderGeoJson from "./GeoJsonLayer";
import LocationMarker from "./LocationMarker";
import ChoroplethMap from "./ChoroplethMap";
import RoutingTemplate from "./Template/RoutingTemplate";
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

  console.log(editStore.currentMapMetaData);
  console.log(editStore.currentMapGraphic);

  return (
    <Box>
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        // ref={setMap}
      >
        <LocationMarker />
        <TileLayer
          noWrap
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {mapLayers}
        {!!(
          editStore.currentMapMetaData?.template == "Routing" &&
          editStore.currentMapGraphic?.markers.length != 0
        ) && (
          <RoutingTemplate
            pt1={editStore.currentMapGraphic?.markers[0]}
            pt2={editStore.currentMapGraphic?.markers[1]}
          />
        )}
      </MapContainer>
    </Box>
  );
}

export default LeafletMap;

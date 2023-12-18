import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { Avatar, Box, Button } from "@mui/material";
import "leaflet/dist/leaflet.css";
import { useContext, useState, useEffect } from "react";
import { EditMapContext } from "../../store/EditMapStore";
import RenderGeoJson from "./GeoJsonLayer";
import LocationMarker from "./LocationMarker";
import ChoroplethMap from "./ChoroplethMap";
import leafletImage from "leaflet-image";
import CanvasDataContext from "../../store/ContextProviders/CanvasDataContext";

function LeafletMap() {
  const { editStore } = useContext(EditMapContext);
  const center = [40.902771, -73.13385];
  const [map, setMap] = useState(null);

  let mapLayers = null;
  mapLayers = editStore.currentMapGraphic?.layers.map((layer, index) => {
    if (layer.filename == "ChoroplethMap") {
      return <ChoroplethMap mapData={layer} />;
    } else {
      return <RenderGeoJson layer={layer} />;
    }
  });

  // const handleExport = () => {
  //   if (map) {
  //     leafletImage(map, function (err, canvas) {
  //       // now you have canvas
  //       // example thing to do with that canvas:
  //       // var img = document.createElement("img");
  //       // var dimensions = map.getSize();
  //       // img.width = dimensions.x;
  //       // img.height = dimensions.y;
  //       // img.src = canvas.toDataURL();
  //       // document.getElementById("images").innerHTML = "";
  //       // document.getElementById("images").appendChild(img);
  //       // editStore.exportMapImgUrl(canvas.toDataURL());
  //       const link = document.createElement("a");
  //       link.href = canvas.toDataURL();
  //       link.download = "exported-map.png";
  //       link.click();
  //     });
  //   }
  // };

  return (
    <Box>
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        ref={setMap}
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

import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet/hooks";
// import { EditMapContext } from "../../../store/EditMapStore";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
});

function RoutingTemplate() {
  const map = useMap();

  //   const waypoints = editStore.currentMapGraphic.markers.map((marker) => {
  //     return L.latLng(marker.coordinates.lat, marker.coordinates.lng);
  //   });

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(57.74, 11.94), L.latLng(57.6792, 11.949)],
      routeWhileDragging: true,
      //   geocoder: L.Control.Geocoder.nominatim(),
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map]);

  return null;
}

export default RoutingTemplate;

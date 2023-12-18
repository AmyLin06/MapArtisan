import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import React from "react";
import { useMap } from "react-leaflet/hooks";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
});

const createRoutingMachineLayer = ({ pt1, pt2 }) => {
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(pt1.coordinates.lat, pt1.coordinates.lng),
      L.latLng(pt2.coordinates.lat, pt2.coordinates.lng),
    ],
    show: false,
    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: false,
  });
  return instance;
};

const RoutingTemplate = createControlComponent(createRoutingMachineLayer);

export default RoutingTemplate;

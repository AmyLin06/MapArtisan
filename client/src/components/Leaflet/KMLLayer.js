import React from "react";
import ReactLeafletKml from "react-leaflet-kml";

const KmlMap = (prop) => {
  const { mapData } = prop;
  return <div>{mapData && <ReactLeafletKml kml={mapData} />}</div>;
};
export default KmlMap;

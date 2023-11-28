import { useEffect } from "react";
import { GeoJSON, useMap } from "react-leaflet";

const RenderGeoJson = (prop) => {
  const { mapData } = prop;
  // const map = useMap();

  return <div>{mapData?.features && <GeoJSON data={mapData?.features} />}</div>;
};
export default RenderGeoJson;

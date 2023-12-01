import { GeoJSON } from "react-leaflet";

const RenderGeoJson = (mapData) => {
  return (
    <div>
      {mapData?.mapData?.features && (
        <GeoJSON data={mapData.mapData?.features} />
      )}
    </div>
  );
};
export default RenderGeoJson;

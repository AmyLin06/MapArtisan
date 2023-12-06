import { GeoJSON } from "react-leaflet";
import { useContext } from "react";
import { EditMapContext } from "../../store/EditMapStore";

const RenderGeoJson = (mapData) => {
  const { editStore } = useContext(EditMapContext);

  const geoJSONStyle = {
    weight: 1,
    opacity: 1,
    dashArray: "2",
    fillOpacity: 0.5,
  };

  const handleClick = (e) => {
    const layer = e.target;
    editStore.polygonOnclick(layer);
  };

  const handleOnEachFeature = (feature, layer) => {
    layer.on({
      click: handleClick,
    });
  };

  return (
    <div>
      {mapData?.mapData?.features && (
        <GeoJSON
          data={mapData.mapData?.features}
          style={() => geoJSONStyle}
          onEachFeature={handleOnEachFeature}
        />
      )}
    </div>
  );
};
export default RenderGeoJson;

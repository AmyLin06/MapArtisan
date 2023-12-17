import React, { useState, useEffect } from "react";
import { GeoJSON } from "react-leaflet";

const ChoroplethMap = ({ mapData }) => {
  const [features, setFeatures] = useState(mapData);

  const mapStyle = {
    fillColor: "white",
    weight: 1,
    color: "black",
    fillOpacity: 1,
  };
  console.log(mapData);

  const handleOnEachFeature = (country, layer) => {
    layer.options.fillColor = country.properties.color;
    const name = country.properties[0];
    const statInfo = country.properties.stat;
    layer.bindPopup(`${name} ${statInfo}`);
  };

  console.log(mapData);
  return (
    <>
      {!!mapData && (
        <GeoJSON
          data={mapData}
          style={() => mapStyle}
          onEachFeature={handleOnEachFeature}
        />
      )}
    </>
  );
};

export default ChoroplethMap;

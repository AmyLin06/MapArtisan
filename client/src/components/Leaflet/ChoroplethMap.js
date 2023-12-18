import React, { useState, useEffect } from "react";
import { GeoJSON } from "react-leaflet";
import storage from "../../firebaseConfig";
import { getDownloadURL, ref } from "firebase/storage";
const ChoroplethMap = ({ mapData }) => {
  const [features, setFeatures] = useState(null);

  const mapStyle = {
    // fillColor: "white",
    weight: 1,
    color: "black",
    fillOpacity: 1,
  };

  useEffect(() => {
    const downloadAndParseFile = async (layer) => {
      const downloadURL = await getDownloadURL(ref(storage, layer.fileRef));
      const response = await fetch(downloadURL);
      const geojsonData = await response.json();
      console.log(geojsonData);
      setFeatures(geojsonData);
    };
    downloadAndParseFile(mapData);
    // eslint-disable-next-line
  }, []);

  const handleOnEachFeature = (country, layer) => {
    layer.options.fillColor = country.properties.color;
    const name = country.properties["indexColumn"];
    const statInfo = country.properties.stat;
    layer.bindPopup(`${name} ${statInfo}`);
  };

  return (
    <>
      {!!features && (
        <GeoJSON
          data={features}
          style={() => mapStyle}
          onEachFeature={handleOnEachFeature}
        />
      )}
    </>
  );
};

export default ChoroplethMap;

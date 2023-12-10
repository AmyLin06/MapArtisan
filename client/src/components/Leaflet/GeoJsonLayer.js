import { GeoJSON } from "react-leaflet";
import { useContext, useEffect, useState } from "react";
import { EditMapContext } from "../../store/EditMapStore";
import toGeoJSON from "togeojson";
import { read } from "shapefile";

const RenderGeoJson = (props) => {
  const { file } = props;

  console.log(file);
  const { editStore } = useContext(EditMapContext);
  const [mapData, setMapData] = useState(null);

  const getFileExtension = (filename) => {
    return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
  };

  useEffect(() => {
    const fileReader = new FileReader();

    if (
      getFileExtension(file.name) === "json" ||
      getFileExtension(file.name) === "geojson"
    ) {
      // Add the GeoJSON file as a layer to the current map
      fileReader.onload = (event) => {
        const data = JSON.parse(event.target.result);
        setMapData(data);
      };
      fileReader.readAsText(file);
    } else if (getFileExtension(fileReader.name) === "kml") {
      fileReader.onload = (event) => {
        const parser = new DOMParser();
        const text = parser.parseFromString(event.target.result, "text/xml");
        const data = toGeoJSON.kml(text);
        setMapData(data);
      };
      fileReader.readAsText(file);
    } else if (getFileExtension(file.name) === "shp") {
      fileReader.onload = async (event) => {
        const arrayBuffer = event.target.result; // ArrayBuffer from FileReader
        try {
          const { features } = await read(arrayBuffer);
          const geoJson = {
            type: "FeatureCollection",
            features: features || [],
          };
          setMapData(geoJson);
        } catch (error) {
          console.error("Error parsing shapefile SAD:", error);
        }
      };
      fileReader.readAsArrayBuffer(file);
    }
  }, []);

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
      {mapData?.features && (
        <GeoJSON
          data={mapData?.features}
          style={() => geoJSONStyle}
          onEachFeature={handleOnEachFeature}
        />
      )}
    </div>
  );
};
export default RenderGeoJson;

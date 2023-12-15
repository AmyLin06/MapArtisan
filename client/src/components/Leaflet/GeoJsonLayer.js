import { GeoJSON } from "react-leaflet";
import { useContext } from "react";
import { EditMapContext } from "../../store/EditMapStore";
import storage from "../../firebaseConfig";
import { getDownloadURL, ref } from "firebase/storage";

const RenderGeoJson = (props) => {
  const { layer } = props;
  const { editStore } = useContext(EditMapContext);
  const [mapData, setMapData] = useState(null);
  let layerKey = 0;

  useEffect(() => {
    const downloadAndParseFile = async (layer) => {
      const downloadURL = await getDownloadURL(ref(storage, layer.fileRef));
      const response = await fetch(downloadURL);
      const geojsonData = await response.json();
      setMapData(geojsonData);
    };
    downloadAndParseFile(layer);
  }, []);

  const geoJSONStyle = {
    weight: 1,
    opacity: 1,
    dashArray: "2",
    fillOpacity: 0.5,
  };

  const handleClick = async (e) => {
    const feature = e.target;
    editStore.polygonOnclick(feature);
  };

  const handleOnEachFeature = (feature, leafletLayer) => {
    leafletLayer.fileRef = layer.fileRef;
    leafletLayer.uniqueKey = layerKey;
    layerKey = layerKey + 1;
    const storedColorStyle = layer.polygonColorStyle;
    const colorInfo = storedColorStyle.find(
      (item) => item.layerKey === leafletLayer.uniqueKey
    );
    if (colorInfo) {
      leafletLayer.setStyle({
        color: colorInfo.border,
        fillColor: colorInfo.color,
      });
    }
    leafletLayer.on({
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

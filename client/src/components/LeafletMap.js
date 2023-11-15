import currentMap from "../assets/currentUser.json";

function LeafletMap() {
  return (
    <Box>
      <img src={currentMap.mapPicture} />
    </Box>
  );
}

export default LeafletMap;

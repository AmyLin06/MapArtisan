import currentMap from "../assets/currentUser.json";
import Box from "@mui/material/Box";
function LeafletMap() {
  return (
    <Box>
      <img src={currentMap.mapPicture} />
    </Box>
  );
}

export default LeafletMap;

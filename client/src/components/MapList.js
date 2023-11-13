import { Box, List, Grid } from "@mui/material";
import MapCard from "./MapCard";

const MapList = (props) => {
  const { maps } = props;

  let mapcards = "";
  mapcards = maps.map((m, index) => (
    <Grid item xs={4} key={"grid" + index} sx={{ paddingBottom: 1 }}>
      <MapCard id={"map" + index} currentMap={m} screen={"COMMUNITY"} />
    </Grid>
  ));

  return (
    <Box>
      <List sx={{ width: "100%" }}>
        <Grid container spacing={5}>
          {mapcards}
        </Grid>
      </List>
    </Box>
  );
};

export default MapList;

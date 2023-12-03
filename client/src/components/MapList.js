import { Box, List, Grid } from "@mui/material";
import MapCard from "./MapCard";

const MapList = (props) => {
  const { maps, screen } = props;

  let mapcards = "";
  mapcards = maps.map((m, index) => (
    <Grid item xs={3} key={"grid" + index} sx={{ paddingBottom: 1 }}>
      <MapCard id={m._id} currentMap={m} screen={screen} />
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

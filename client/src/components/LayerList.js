import { Box, List, Grid } from "@mui/material";
import LayerCard from "./LayerCard";

const LayerList = (props) => {
  const { layers } = props;

  let layercards = "";
  if (layers) {
    layercards = layers.map((l, index) => (
      <Grid
        item
        xs={12}
        key={"grid" + index}
        sx={{
          border: "1px solid #fff",
          color: "#fff",
        }}
      >
        <LayerCard id={"layer" + index} layerName={l.layerName} />
      </Grid>
    ));
  }

  return (
    <Box>
      <List sx={{ width: "100%" }}>
        <Grid container>{layercards}</Grid>
      </List>
    </Box>
  );
};

export default LayerList;

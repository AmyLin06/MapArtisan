import * as React from "react";
import Typography from "@mui/material/Typography";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Grid } from "@mui/material/";

//TODO: may need to make changes later so that function that handles deleting a layer has necessary info
export default function LayerCard(props) {
  const { layerName } = props;
  return (
    <Grid
      container
      xs={12}
      style={{ backgroundColor: "#246BAD", padding: "0.5rem" }}
    >
      <Grid item xs={11} style={{ display: "flex", alignItems: "center" }}>
        <Typography>{layerName}</Typography>
      </Grid>
      <Grid item xs={1} container alignItems="center">
        <DeleteOutlineIcon />
      </Grid>
    </Grid>
  );
}

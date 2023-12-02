import * as React from "react";
import Typography from "@mui/material/Typography";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box, IconButton } from "@mui/material/";

//TODO: may need to make changes later so that function that handles deleting a layer has necessary info
export default function LayerCard(props) {
  const { layerName } = props;
  return (
    <Box display="flex" alignItems="center">
      <Typography>{layerName}</Typography>
      <IconButton>
        <DeleteOutlineIcon />
      </IconButton>
    </Box>
  );
}

import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box, IconButton } from "@mui/material/";
import { EditMapContext } from "../store/EditMapStore";

//TODO: may need to make changes later so that function that handles deleting a layer has necessary info
export default function LayerCard(props) {
  const { editStore } = useContext(EditMapContext);
  const { layerIndex, layerName } = props;

  const handleDeleteLayer = () => {
    editStore.removeLayer(layerIndex);
  };

  return (
    <Box display="flex" alignItems="center">
      <Typography>{layerName}</Typography>
      <IconButton onClick={handleDeleteLayer}>
        <DeleteOutlineIcon />
      </IconButton>
    </Box>
  );
}

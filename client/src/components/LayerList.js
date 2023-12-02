import { Box, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import LayerCard from "./LayerCard";
import React, { useState } from "react";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";

const LayerList = (props) => {
  const { layers } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  let layercards = "";
  if (layers && layers.length > 0) {
    layercards = layers.map((layer, index) => (
      <MenuItem key={index}>
        <LayerCard layerName={layer.layerName} />
      </MenuItem>
    ));
  } else {
    layercards = <MenuItem>No layers...Add one :)</MenuItem>;
  }

  return (
    <Box>
      <Tooltip title="Layers">
        <IconButton onClick={handleOpenMenu} size="small">
          <LayersOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {layercards}
      </Menu>
    </Box>
  );
};

export default LayerList;

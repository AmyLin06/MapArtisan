import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Typography, Box, Paper } from "@mui/material";

//menu that opens and displays options for data formats the user can import
export default function ImportMenuList() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            verticalAlign: "center",
          }}
        >
          <ArrowDownwardIcon style={{ fontSize: "1rem" }} />
          <Typography style={{ verticalAlign: "middle" }}>Import</Typography>
        </Box>
      </IconButton>
      <Popover open={open} anchorEl={anchorEl} onClose={handleClose}>
        <Paper style={{ background: "#FFFDF3" }}>
          <MenuItem
            onClick={handleClose}
            sx={{
              "&:hover": {
                background: "#246BAD",
              },
            }}
          >
            {"KML"}
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            sx={{
              "&:hover": {
                background: "#246BAD",
              },
            }}
          >
            {"GeoJSON"}
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            sx={{
              "&:hover": {
                background: "#246BAD",
              },
            }}
          >
            {"Shapefile"}
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            sx={{
              "&:hover": {
                background: "#246BAD",
              },
            }}
          >
            {"Custom JSON"}
          </MenuItem>
        </Paper>
      </Popover>
    </>
  );
}

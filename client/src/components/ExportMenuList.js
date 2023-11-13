import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Typography, Box, Paper } from "@mui/material";

//menu that opens and displays options for data formats the user can export the map in
export default function ExportMenuList() {
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
          <ArrowUpwardIcon style={{ fontSize: "1rem" }} />
          <Typography style={{ verticalAlign: "middle" }}>Export</Typography>
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
            {"Custom JSON"}
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            sx={{
              "&:hover": {
                background: "#246BAD",
              },
            }}
          >
            {"JPG"}
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            sx={{
              "&:hover": {
                background: "#246BAD",
              },
            }}
          >
            {"PNG"}
          </MenuItem>
        </Paper>
      </Popover>
    </>
  );
}

import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Paper, Tooltip } from "@mui/material";

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
      <Tooltip title="Export Map" disableFocusListener disableTouchListener>
        <IconButton onClick={handleOpen}>
          <ArrowUpwardIcon />
        </IconButton>
      </Tooltip>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
        }}
      >
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

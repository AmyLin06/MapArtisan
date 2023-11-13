import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import FilterListIcon from "@mui/icons-material/FilterList";

//menu that opens and displays options to filter search results
export default function FilterMenuList() {
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
        <FilterListIcon style={{ marginTop: 10, fontSize: "1.5rem" }} />
      </IconButton>
      <Popover open={open} anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem onClick={handleClose}>{"Alphabetical order"}</MenuItem>
        <MenuItem onClick={handleClose}>{"Most duplicates"}</MenuItem>
        <MenuItem onClick={handleClose}>{"Most likes"}</MenuItem>
        <MenuItem onClick={handleClose}>{"Publish date"}</MenuItem>
      </Popover>
    </>
  );
}

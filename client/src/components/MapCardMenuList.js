import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ForkRightIcon from "@mui/icons-material/ForkRight";

//menu that opens and displays options for the map card in home screen and community screen
export default function MapCardMenuList(props) {
  const { isPublished, screen } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  if (screen === "HOME") {
    return (
      <>
        <IconButton onClick={handleOpen}>
          <MoreVertIcon style={{ marginTop: 10, fontSize: "2rem" }} />
        </IconButton>
        <Popover open={open} anchorEl={anchorEl} onClose={handleClose}>
          {!isPublished && (
            <MenuItem onClick={handleClose}>
              <DriveFileRenameOutlineIcon />
              {"Rename"}
            </MenuItem>
          )}
          <MenuItem onClick={handleClose}>
            <DeleteOutlineIcon />
            {"Delete"}
          </MenuItem>
        </Popover>
      </>
    );
  }

  //screen==="COMMUNITY"
  return (
    <>
      <IconButton onClick={handleOpen}>
        <MoreVertIcon style={{ marginTop: 10, fontSize: "2rem" }} />
      </IconButton>
      <Popover open={open} anchorEl={anchorEl} onClose={handleClose}>
        {
          <MenuItem onClick={handleClose}>
            <FavoriteIcon style={{ marginRight: 4 }} />
            {"Like"}
          </MenuItem>
        }
        <MenuItem onClick={handleClose}>
          <ForkRightIcon style={{ marginRight: 4 }} />
          {"Duplicate"}
        </MenuItem>
      </Popover>
    </>
  );
}

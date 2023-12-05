import React, { useContext, useState } from "react";
import { GlobalStoreContext } from "../../store/GlobalStore";
import { IconButton, Popover, MenuItem } from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  DeleteOutline as DeleteOutlineIcon,
  DriveFileRenameOutline as DriveFileRenameOutlineIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ForkRight as ForkRightIcon,
} from "@mui/icons-material";
import InputModal from "../Modals/InputModal";
import ConfirmModal from "../Modals/ConfirmModal";
import { InputModalTypes, ConfirmModalTypes } from "../Modals/ModalTypes";
import AuthContext from "../../auth";

//menu that opens and displays options for the map card in home screen and community screen
export default function MapCardMenuList(props) {
  const { isPublished, screen } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
    event.stopPropagation();
  };

  const handleRename = (event) => {
    store.showEditMapNameModal();
    handleClose(event);
  };

  const handleDelete = (event) => {
    store.showDeleteMapModal();
    handleClose(event);
    event.stopPropagation();
  };
  const handleDuplicate = (event) => {
    handleClose(event);
    event.stopPropagation();
  };

  const handleLikes = (event) => {
    handleClose(event);
    event.stopPropagation();
  };
  const open = Boolean(anchorEl);

  if (screen === "HOME") {
    return (
      <>
        <IconButton onClick={handleOpen} sx={{ borderRadius: "50%" }}>
          <MoreVertIcon style={{ marginTop: 10, fontSize: "2rem" }} />
        </IconButton>
        <Popover open={open} anchorEl={anchorEl} onClose={handleClose}>
          {!isPublished && (
            <MenuItem onClick={handleRename}>
              <DriveFileRenameOutlineIcon />
              {"Rename"}
            </MenuItem>
          )}
          <MenuItem onClick={handleDelete}>
            <DeleteOutlineIcon />
            {"Delete"}
          </MenuItem>
        </Popover>
        <InputModal modalType={InputModalTypes.RENAME_MAP} />
        <ConfirmModal modalType={ConfirmModalTypes.DELETE_MAP} />
      </>
    );
  }

  //screen==="COMMUNITY"
  return (
    <div>
      <IconButton onClick={handleOpen}>
        <MoreVertIcon style={{ marginTop: 10, fontSize: "2rem" }} />
      </IconButton>
      <Popover open={open} anchorEl={anchorEl} onClose={handleClose}>
        {auth.guest ? null : (
          <MenuItem onClick={handleLikes}>
            <FavoriteBorderIcon style={{ marginRight: 4 }} />
            {"Like"}
          </MenuItem>
        )}
        <MenuItem onClick={handleDuplicate}>
          <ForkRightIcon style={{ marginRight: 4 }} />
          {"Duplicate"}
        </MenuItem>
      </Popover>
    </div>
  );
}

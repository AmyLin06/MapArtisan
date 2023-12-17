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
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import InputModal from "../Modals/InputModal";
import ConfirmModal from "../Modals/ConfirmModal";
import {
  InputModalTypes,
  ConfirmModalTypes,
  GuestModalTypes,
} from "../Modals/ModalTypes";
import GuestModal from "../Modals/GuestModal";
import AuthContext from "../../auth";
import EditMapContext from "../../store/EditMapStore";

//menu that opens and displays options for the map card in home screen and community screen
export default function MapCardMenuList(props) {
  const { isPublished, screen } = props;
  const { store } = useContext(GlobalStoreContext);
  const { editStore } = useContext(EditMapContext);
  const { auth } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [likedMap, setLikedMap] = useState(false);

  const checkIsLiked = async () => {
    const bool = await store.isLikedMap(store.currentMap?._id);
    setLikedMap(bool);
  };

  const handleOpen = async (event) => {
    setAnchorEl(event.currentTarget);
    await checkIsLiked();
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
    store.duplicateMap(store.currentMap._id);
    handleClose(event);
    event.stopPropagation();
  };

  const handleLikes = async (event) => {
    event.stopPropagation();
    if (auth.guest) {
      store.showGuestLikeModal();
    } else {
      await store.likeMap(editStore);
      await checkIsLiked();
    }
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
        <MenuItem onClick={handleLikes}>
          {likedMap ? (
            <FavoriteOutlinedIcon style={{ marginRight: 4, color: "246BAD" }} />
          ) : (
            <FavoriteBorderIcon style={{ marginRight: 4 }} />
          )}
          {"Like"}
        </MenuItem>
        <GuestModal
          modalType={GuestModalTypes.LIKE_MAP}
          initialAnchorEl={anchorEl}
          handleClose={handleClose}
        />
        <MenuItem onClick={handleDuplicate}>
          <ForkRightIcon style={{ marginRight: 4 }} />
          {"Duplicate"}
        </MenuItem>
      </Popover>
    </div>
  );
}

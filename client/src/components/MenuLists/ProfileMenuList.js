import { useState, useContext } from "react";
import { IconButton, Popover, MenuItem, Avatar } from "@mui/material";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../auth";
import EditMapContext from "../../store/EditMapStore";
import GlobalStoreContext from "../../store/GlobalStore";

export default function ProfileMenuList() {
  const { auth } = useContext(AuthContext);
  const { editStore } = useContext(EditMapContext);
  const { store } = useContext(GlobalStoreContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleAccSet() {
    handleClose();
    navigate("/account-setting");
  }
  function handleProfile() {
    handleClose();
    navigate("/profile");
  }
  function handleLogout() {
    handleClose();
    auth.logoutUser();
    editStore.closeMap();
    store.closeMap();
    navigate("/");
  }

  return (
    <>
      <IconButton onClick={handleOpen} sx={{ padding: 0 }}>
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          R
        </Avatar>
      </IconButton>
      <Popover open={open} anchorEl={anchorEl} onClose={handleClose}>
        {auth.guest ? null : (
          <MenuItem onClick={handleProfile}>{"Profile"}</MenuItem>
        )}
        {auth.guest ? null : (
          <MenuItem onClick={handleAccSet}>{"Account Setting"}</MenuItem>
        )}
        <MenuItem onClick={handleLogout}>{"Logout"}</MenuItem>
      </Popover>
    </>
  );
}

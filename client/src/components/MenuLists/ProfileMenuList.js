import { useState, useContext } from "react";
import { IconButton, Popover, MenuItem, Avatar } from "@mui/material";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../auth";

export default function ProfileMenuList() {
  const { auth } = useContext(AuthContext);
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
    navigate("/profile", { state: { id: auth.user.id } });
  }
  function handleLogout() {
    handleClose();
    auth.logoutUser();
    navigate("/");
  }

  return (
    <>
      <IconButton onClick={handleOpen} sx={{ padding: 0 }}>
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          {auth.getUserInitials()}
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

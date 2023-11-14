import { useState } from "react";
import { IconButton, Popover, MenuItem, Avatar } from "@mui/material";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

export default function ProfileMenuList() {
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
        <MenuItem onClick={handleProfile}>{"Profile"}</MenuItem>
        <MenuItem onClick={handleAccSet}>{"Account Setting"}</MenuItem>
        <MenuItem onClick={handleLogout}>{"Logout"}</MenuItem>
      </Popover>
    </>
  );
}

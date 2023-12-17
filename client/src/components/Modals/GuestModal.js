import React, { useState, useContext } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import GlobalStoreContext from "../../store/GlobalStore";
import CustomButton from "../CustomButton";
import AuthContext from "../../auth";
import EditMapContext from "../../store/EditMapStore";

export default function GuestModal(props) {
  const { modalType, initialAnchorEl, handleClose } = props;
  // eslint-disable-next-line
  const [anchorEl, setAnchorEl] = useState(initialAnchorEl);
  const { store } = useContext(GlobalStoreContext);
  const { editStore } = useContext(EditMapContext);
  const { auth } = useContext(AuthContext);
  const handleClick = (event) => {
    auth.logoutGuest();
    event.stopPropagation();
  };

  return (
    <Popover
      open={
        store.currentModal === modalType.name ||
        editStore.currentModal === modalType.name
      }
      anchorEl={anchorEl}
      onClose={handleClose}
    >
      <Typography sx={{ p: 2 }}>{modalType.text}</Typography>
      <Link to="/login">
        <CustomButton
          text="Login"
          onPress={handleClick}
          sx={{ marginX: 2, marginBottom: 1 }}
        />
      </Link>
    </Popover>
  );
}

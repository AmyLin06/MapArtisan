import React, { useContext } from "react";
import { GlobalStoreContext } from "../../store/GlobalStore";
import { EditMapContext } from "../../store/EditMapStore";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import CustomButton from "../CustomButton";
import { ConfirmModalStyle } from "../../styles/ConfirmModalStyle";
import { ConfirmModalTypes } from "./ModalTypes";

//Modal that displays in the middle of the screen asking the user to confirm the change they initialized
//Example of a way to create a ConfirmModal, see ModalTypes.js for definition of "ConfirmModalTypes.DELETE_LAYER"
//<ConfirmModal modalType={ConfirmModalTypes.DELETE_LAYER}></ConfirmModal>
export default function ConfirmModal(props) {
  const { store } = useContext(GlobalStoreContext);
  const { editStore } = useContext(EditMapContext);
  const { modalType } = props;

  const handleClose = (event) => {
    event.stopPropagation();
    store.hideModals();
    editStore.hideModals();
  };
  const handleConfirm = (event) => {
    event.stopPropagation();
    switch (modalType) {
      case ConfirmModalTypes.PUBLISH_MAP:
        editStore.publishMap();
        break;
      case ConfirmModalTypes.DELETE_MAP:
        store.deleteMap();
        break;
      default:
        break;
    }
    store.hideModals();
    editStore.hideModals();
  };
  //TODO: onClick() functionality
  //TODO: add map/layer name to typography in return, using map from store??
  return (
    <Modal
      open={
        store.currentModal === modalType.name ||
        editStore.currentModal === modalType.name
      }
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ boxShadow: "none" }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(0,0,0,0.05)",
          },
        },
      }}
    >
      <Box sx={ConfirmModalStyle}>
        <Typography
          sx={{ border: "none", fontWeight: "bold" }}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          {modalType.title}
        </Typography>
        <Box sx={{ position: "absolute", top: "0px", right: "0px" }}>
          <Button>
            <CloseIcon
              style={{ fontSize: "2.5vw", color: "#000000" }}
              onClick={handleClose}
            />
          </Button>
        </Box>
        <Divider
          sx={{
            borderBottomWidth: 3,
            p: "5px",
            transform: "translate(-5.5%, 0%)",
            width: "45%",
          }}
        />
        <Box>
          <Typography
            id="modal-modal-description"
            variant="h7"
            sx={{ mt: 1, marginBottom: 2 }}
          >
            {modalType.text}
            <Typography
              display="inline"
              id="modal-modal-description"
              variant="h7"
              sx={{ fontStyle: "italic" }}
            >
              {"MYMAP"}
            </Typography>{" "}
          </Typography>

          <Typography
            sx={{ fontSize: "small", color: "gray", marginTop: 1 }}
            id="modal-modal-subtext"
            variant="body2"
          >
            {modalType.warning}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "5%",
            gap: "3%",
          }}
        >
          <CustomButton text={"Confirm"} onPress={handleConfirm}></CustomButton>
          <CustomButton text={"Cancel"} onPress={handleClose}></CustomButton>
        </Box>
      </Box>
    </Modal>
  );
}

import React, { useContext } from "react";
import { Box, Modal, Typography, Button, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CustomButton from "../CustomButton";
import { GlobalStoreContext } from "../../store/GlobalStore";

//Modal that displays in the middle of the screen allowing the user to enter input
//Example of a way to create a InputModal, see ModalTypes.js for definition of "InputModalTypes.MESSAGE_MODAL"
//<InputModal modalType={InputModalTypes.MESSAGE_MODAL}></InputModal>

export default function InputModal(props) {
  const { store } = useContext(GlobalStoreContext);
  const { modalType } = props;
  const heightValue = modalType.name === "RENAME_MAP" ? 150 : 450;
  const InputModalStyle = {
    position: "absolute",
    top: "50%",
    left: "45%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    height: heightValue,
    backgroundSize: "contain",
    backgroundColor: "#FFFDF3",
    color: "#000000",
    border: "3px solid #FFFDF3",
    padding: "20px",
  };

  const handleClose = (event) => {
    event.stopPropagation();
    store.hideModals();
  };

  const handleInputClick = (event) => {
    event.stopPropagation();
  };
  var InputField = (
    <TextField
      variant="outlined"
      fullWidth
      onClick={handleInputClick}
      // defaultValue={
      //   store.currentMap?.titleMap ? store.currentMap.titleMap : "MyMap"
      // }
      defaultValue={"some map name"}
    />
  );
  if (modalType.name === "MESSAGE_MODAL") {
    InputField = (
      <Box
        border="1px solid #ccc"
        borderRadius="5px"
        overflow="auto"
        position="relative"
        style={{ maxHeight: "45vh" }}
      >
        <TextField
          variant="outlined"
          fullWidth
          multiline
          rows={10}
          placeholder="Hi, I'm Bob and I just wanted to say that the map you created was awesome..."
          onClick={handleInputClick}
          style={{
            "& fieldset": { border: "none" },
            width: "100%",
            resize: "none",
            overflow: "auto",
          }}
        />
      </Box>
    );
  }

  //TODO: add map/user name to typography in return
  return (
    <Modal
      //TODO: conditionally open modal
      //   open={store.listMarkedForDeletion !== null}
      open={store.currentModal === modalType.name}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      slotProps={{
        backdrop: {
          sx: {
            //Your style here....
            backgroundColor: "rgba(0,0,0,0.05)",
          },
        },
      }}
    >
      <Box sx={InputModalStyle}>
        <Box
          sx={{
            position: "absolute",
            top: "0px",
            right: "0px",
          }}
        >
          <Button>
            <CloseIcon
              style={{ fontSize: "2.5vw", color: "#000000" }}
              onClick={handleClose}
            />
          </Button>
        </Box>
        <Box>
          <Typography
            id="modal-modal-description"
            variant="h6"
            sx={{ mt: 1, marginTop: 4, display: "inline" }}
          >
            {modalType.title}
          </Typography>
          <Typography
            display="inline"
            id="modal-modal-description"
            variant="h6"
            sx={{ fontStyle: "italic" }}
          >
            {" MYFRIEND"}
          </Typography>
          {InputField}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "30px",
            gap: "15px",
          }}
        >
          <CustomButton text={"Confirm"} onPress={handleClose}></CustomButton>
          <CustomButton text={"Cancel"} onPress={handleClose}></CustomButton>
        </Box>
      </Box>
    </Modal>
  );
}

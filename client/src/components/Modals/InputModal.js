// import { useContext } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import CustomButton from "../CustomButton";

export default function InputModal(props) {
  // const { store } = useContext(GlobalStoreContext);
  const { modalType } = props;

  const heightValue = modalType.name === "RENAME_MAP" ? "20%" : "50%";
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

  var InputField = (
    <TextField
      variant="outlined"
      fullWidth
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
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
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
              onClick={modalType.confirmAction}
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
          <CustomButton
            text={"Confirm"}
            onPress={modalType.confirmAction}
          ></CustomButton>
          <CustomButton
            text={"Cancel"}
            onPress={modalType.cancelAction}
          ></CustomButton>
        </Box>
      </Box>
    </Modal>
  );
}

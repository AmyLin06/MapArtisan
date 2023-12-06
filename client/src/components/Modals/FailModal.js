import { useEffect, useContext } from "react";
import * as React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { FailModalTypes } from "./ModalTypes";
import { GlobalStoreContext } from "../../store/GlobalStore";
import AuthContext from "../../auth";
import { Typography } from "@mui/material";

//Modal that displays a message in the lower-left of the screen for 5sec, with an option to prematurely close the modal
//Example of a way to create a SuccessModal, see ModalTypes.js for definition of "SuccessModalTypes.MESSAGE_SUCCESS":
//<SuccessModal
//  modalType={SuccessModalTypes.MESSAGE_SUCCESS}
// ></SuccessModal>

export default function FailModal(props) {
  const { modalType } = props;
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const styles = {
    biggerSnackbar: {
      minWidth: 400, // Adjust the width as needed
    },
    biggerText: {
      fontSize: "1.5rem", // Adjust the font size as needed
    },
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      auth.hideModals();
    }, 5000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, []);

  var text = modalType.text + "MYMAP";
  if (modalType === FailModalTypes.ACCOUNT_UPDATE_FAIL) {
    text = modalType.text;
  }
  if (modalType === FailModalTypes.ACCOUNT_LOGIN_FAIL) {
    text = modalType.text;
  }
  if (modalType === FailModalTypes.ACCOUNT_REGISTER_FAIL) {
    text = modalType.text;
  }
  if (modalType === FailModalTypes.EMAIL_SEND_FAIL) {
    text = modalType.text;
  }
  if (modalType === FailModalTypes.PASSWORD_RESET_FAIL) {
    text = modalType.text;
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={
        auth.currentModal === modalType.name ||
        store.currentModal === modalType.name
      }
      autoHideDuration={5000}
      onClose={() => {
        auth.hideModals();
      }}
    >
      <Alert
        onClose={() => {
          auth.hideModals();
        }}
        severity="error"
        // sx={styles.biggerSnackbar}
      >
        <Typography variant="body1" sx={styles.biggerText}>
          {text}
        </Typography>
        {"" + modalType.subtext}
        {auth.errorMessage}
      </Alert>
    </Snackbar>
  );
}

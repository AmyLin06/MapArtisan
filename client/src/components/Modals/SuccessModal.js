import { useEffect, useContext } from "react";
import * as React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { SuccessModalTypes } from "./ModalTypes";
import { GlobalStoreContext } from "../../store/GlobalStore";
import AuthContext from "../../auth";

//Modal that displays a message in the lower-left of the screen for 5sec, with an option to prematurely close the modal
//Example of a way to create a SuccessModal, see ModalTypes.js for definition of "SuccessModalTypes.MESSAGE_SUCCESS":
//<SuccessModal
//  modalType={SuccessModalTypes.MESSAGE_SUCCESS}
// ></SuccessModal>

export default function SuccessModal(props) {
  const { modalType } = props;
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (modalType.name !== SuccessModalTypes.MESSAGE_SUCCESS) {
        auth.hideModals();
      }
    }, 5000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, []);

  var text = modalType.text + "MYMAP";
  if (modalType === SuccessModalTypes.ACCOUNT_UPDATE_SUCCESS) {
    text = modalType.text;
  }
  if (modalType === SuccessModalTypes.ACCOUNT_LOGIN_SUCCESS) {
    text = modalType.text;
  }
  if (modalType === SuccessModalTypes.EMAIL_SEND_SUCCESS) {
    text = modalType.text;
  }
  if (modalType === SuccessModalTypes.PASSWORD_RESET_SUCCESS) {
    text = modalType.text;
  }
  if (modalType === SuccessModalTypes.MESSAGE_SUCCESS) {
    text = modalType.text;
  }

  if (modalType === SuccessModalTypes.MESSAGE_SUCCESS) {
    return (
      <Snackbar
        open={store.currentModal === modalType.name}
        autoHideDuration={5000}
        onClose={() => {
          store.hideModals();
        }}
      >
        <Alert
          onClose={() => {
            store.hideModals();
          }}
          severity="success"
        >
          {text}
          {". " + modalType.subtext}
        </Alert>
      </Snackbar>
    );
  }

  return (
    <Snackbar
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
        severity="success"
      >
        {text}
        {". " + modalType.subtext}
      </Alert>
    </Snackbar>
  );
}

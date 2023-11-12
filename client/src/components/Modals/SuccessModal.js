import { useState, useEffect } from "react";
import * as React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

//Modal that displays a message in the lower-left of the screen for 5sec, with an option to prematurely close the modal
//Example of a way to create a SuccessModal, see ModalTypes.js for definition of "SuccessModalTypes.MESSAGE_SUCCESS":
//<SuccessModal
//  modalType={SuccessModalTypes.MESSAGE_SUCCESS}
// ></SuccessModal>

export default function SuccessModal(props) {
  const { modalType } = props;
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={() => setOpen(false)}
    >
      <Alert onClose={() => setOpen(false)} severity="success">
        {modalType.text + "MYMAP"}
        {". " + modalType.subtext}
      </Alert>
    </Snackbar>
  );
}

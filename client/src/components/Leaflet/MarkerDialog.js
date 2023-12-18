import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { React, useState } from "react";

export default function MarkerDialog(props) {
  const { onClose, text, open } = props;
  const [updatedMessage, setMarkerMessage] = useState(null);

  const handleClose = () => {
    onClose(text);
  };

  const handleConfirm = () => {
    onClose(updatedMessage);
  };

  const handleInputChange = (event) => {
    setMarkerMessage(event.target.value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Edit Marker Message</DialogTitle>
      <DialogContent>
        <TextField
          id="marker-textbox"
          label="Marker Message"
          multiline
          maxRows={4}
          defaultValue={text}
          variant="standard"
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleConfirm}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}

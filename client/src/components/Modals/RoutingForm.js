import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { EditMapContext } from "../../store/EditMapStore";
import { useNavigate } from "react-router-dom";

const RoutingForm = () => {
  const navigate = useNavigate();

  const { editStore } = useContext(EditMapContext);
  const [errorMessage, setErrorMessage] = useState("");

  const [start, setStart] = useState([null, null]);
  const [dest, setDest] = useState([null, null]);
  const [open, setOpen] = useState(
    editStore.currentModal === "CREATE_ROUTING_FORM"
  );
  const handleStartLat = (event) => {
    event.stopPropagation();
    start[0] = parseFloat(event.target.value);
  };
  const handleStartLong = (event) => {
    event.stopPropagation();
    start[1] = parseFloat(event.target.value);
  };

  const handleDestLat = (event) => {
    event.stopPropagation();
    dest[0] = parseFloat(event.target.value);
  };

  const handleDestLong = (event) => {
    event.stopPropagation();
    dest[1] = parseFloat(event.target.value);
  };

  const handleClose = () => {
    editStore.hideModals();
    editStore.closeMap();
    navigate("/home");
    setOpen(false);
  };
  const handleSubmit = () => {
    if (start.includes(null) || dest.includes(null)) {
      setErrorMessage(
        <div
          style={{
            color: "red",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          You must enter all required fields
        </div>
      );
    }
    setStart(start);
    setDest(dest);
    console.log(start);
    console.log(dest);
    console.log(start);
    const startMarker = {
      iconKey: "blackStarIcon",
      coordinates: { lat: start[0], lng: start[1] },
      message: "",
      draggable: false,
    };

    const endMarker = {
      iconKey: "blackStarIcon",
      coordinates: { lat: dest[0], lng: dest[1] },
      message: "",
      draggable: false,
    };
    editStore.addMarker(startMarker);
    editStore.addMarker(endMarker);
    editStore.hideModals();
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create your own routing map</DialogTitle>
        <DialogContent>
          {errorMessage}
          <DialogContentText>
            Enter the Start latitude and longitude:
          </DialogContentText>
          <TextField
            label="startLat"
            id="Start Latitude"
            size="small"
            required
            sx={{ m: 1, width: "20ch" }}
            onChange={handleStartLat}
          />
          <TextField
            label="startLong"
            id="Start Longitude"
            size="small"
            required
            sx={{ m: 1, width: "20ch" }}
            onChange={handleStartLong}
          />
          <DialogContentText>
            Enter the destination latitude and longitude:
          </DialogContentText>
          <TextField
            label="destLat"
            id="Destination Latitude"
            size="small"
            required
            sx={{ m: 1, width: "20ch" }}
            onChange={handleDestLat}
          />
          <TextField
            label="destLong"
            id="Destination Longitude"
            size="small"
            required
            sx={{ m: 1, width: "20ch" }}
            onChange={handleDestLong}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default RoutingForm;

import Banner from "../components/Banner";
import "../styles/WorkspaceScreen.css";
import QuickAccessToolbar from "../components/QuickAccessToolbar";
import LeafletMap from "../components/Leaflet/LeafletMap";
import { Typography, Grid, Tooltip, Popover } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ConfirmModal from "../components/Modals/ConfirmModal";
import {
  ConfirmModalTypes,
  GuestModalTypes,
  InputModalTypes,
} from "../components/Modals/ModalTypes";
import GlobalStoreContext from "../store/GlobalStore";
import InputModal from "../components/Modals/InputModal";
import GuestModal from "../components/Modals/GuestModal";
import AuthContext from "../auth";
import EditMapContext from "../store/EditMapStore";

const WorkspaceScreen = () => {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const { editStore } = useContext(EditMapContext);
  const [mapName, setMapName] = useState(
    store.currentMap?.mapTitle || "Untitled"
  );
  const [anchorEl, setAnchorEl] = useState(null);

  const handleRenameMap = (event) => {
    if (auth.guest) {
      handleOpen(event);
      editStore.showGuestRenameModal();
    } else store.showEditMapNameModal();
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    setMapName(store.currentMap?.mapTitle || "Untitled");
    // eslint-disable-next-line
  }, [store.currentMap?.mapTitle]);

  return (
    <div className="workspace-main">
      <Banner screen={"EDIT"} />
      <div className="workspace-content">
        <Grid container>
          <Grid item className="name-name" xs={2}>
            <Tooltip title="Double-click to rename">
              <Typography
                fontWeight="bold"
                onDoubleClick={(event) => {
                  handleRenameMap(event);
                }}
                sx={{ color: "#246BAD", paddingLeft: 1 }}
              >
                {mapName}
              </Typography>
            </Tooltip>
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            >
              <GuestModal
                modalType={GuestModalTypes.RENAME_MAP}
                initialAnchorEl={anchorEl}
                handleClose={() => setAnchorEl(null)}
              />
            </Popover>
          </Grid>
          <Grid item className="map-editing" xs={10}>
            <QuickAccessToolbar />
          </Grid>
          <Grid item xs={12}>
            <LeafletMap />
          </Grid>
        </Grid>
        <ConfirmModal modalType={ConfirmModalTypes.PUBLISH_MAP} />
        <InputModal modalType={InputModalTypes.RENAME_MAP} />
      </div>
    </div>
  );
};

export default WorkspaceScreen;

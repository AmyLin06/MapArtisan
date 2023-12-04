import Banner from "../components/Banner";
import "../styles/WorkspaceScreen.css";
import QuickAccessToolbar from "../components/QuickAccessToolbar";
import LeafletMap from "../components/Leaflet/LeafletMap";
import { Typography, Grid } from "@mui/material";
import { EditMapContext } from "../store/EditMapStore";
import React, { useContext } from "react";
import ConfirmModal from "../components/Modals/ConfirmModal";
import { ConfirmModalTypes } from "../components/Modals/ModalTypes";

const WorkspaceScreen = () => {
  const { editStore } = useContext(EditMapContext);

  return (
    <div className="workspace-main">
      <Banner screen={"EDIT"} />
      <div className="workspace-content">
        <Grid container>
          <Grid item className="name-name" xs={2}>
            <Typography
              fontWeight="bold"
              sx={{ color: "#246BAD", paddingLeft: 1 }}
            >
              {editStore.currentMapMetaData?.mapTitle || ""}
            </Typography>
          </Grid>
          <Grid item className="map-editing" xs={10}>
            <QuickAccessToolbar />
          </Grid>
          <Grid item xs={12}>
            <LeafletMap />
          </Grid>
        </Grid>
        <ConfirmModal modalType={ConfirmModalTypes.PUBLISH_MAP} />
      </div>
    </div>
  );
};

export default WorkspaceScreen;

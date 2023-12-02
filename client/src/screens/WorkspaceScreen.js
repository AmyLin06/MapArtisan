import Banner from "../components/Banner";
import "../styles/WorkspaceScreen.css";
import QuickAccessToolbar from "../components/QuickAccessToolbar";
import LeafletMap from "../components/Leaflet/LeafletMap";
import UndoRedoTool from "../components/UndoRedoTool";
import { Typography, Grid } from "@mui/material";
import { EditMapContext } from "../store/EditMapStore";
import React, { useContext } from "react";

const WorkspaceScreen = () => {
  const { editStore } = useContext(EditMapContext);

  return (
    <div className="workspace-main">
      <Banner screen={"EDIT"} />
      <div className="workspace-content">
        <Grid container>
          <Grid item className="name-name" xs={2}>
            <Typography>{editStore.currentMap.mapTitle}</Typography>
          </Grid>
          <Grid item className="map-editing" xs={10}>
            <QuickAccessToolbar />
            <UndoRedoTool />
          </Grid>
          <Grid item xs={12}>
            <LeafletMap />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default WorkspaceScreen;

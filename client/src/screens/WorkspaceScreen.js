import Banner from "../components/Banner";
import "../styles/WorkspaceScreen.css";
import QuickAccessToolbar from "../components/QuickAccessToolbar";
import LeafletMap from "../components/Leaflet/LeafletMap";
import { Grid } from "@mui/material";
import React from "react";
import ConfirmModal from "../components/Modals/ConfirmModal";
import {
  ConfirmModalTypes,
  InputModalTypes,
} from "../components/Modals/ModalTypes";
import InputModal from "../components/Modals/InputModal";
import ChoroplethForm from "../components/Modals/ChoroplethForm";
import RoutingForm from "../components/Modals/RoutingForm";
import { useState } from "react";
import CanvasDataProvider from "../store/ContextProviders/CanvasDataProvider";

const WorkspaceScreen = () => {
  const [canvasDataURL, setCanvasDataURL] = useState(null);
  return (
    <div className="workspace-main">
      <Banner screen={"EDIT"} />
      <div className="workspace-content">
        <Grid container>
          <Grid item className="map-editing" xs={12}>
            <QuickAccessToolbar />
          </Grid>
          <Grid item xs={12}>
            <LeafletMap />
          </Grid>
        </Grid>
        <ChoroplethForm />
        <RoutingForm />
        <ConfirmModal modalType={ConfirmModalTypes.PUBLISH_MAP} />
        <InputModal modalType={InputModalTypes.RENAME_MAP} />
      </div>
    </div>
  );
};

export default WorkspaceScreen;

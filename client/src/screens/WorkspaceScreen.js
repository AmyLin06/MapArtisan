import React from "react";
import Banner from "../components/Banner";
import "../styles/WorkspaceScreen.css";
import QuickAccessToolbar from "../components/QuickAccessToolbar";
import SideMenu from "../components/SideMenu";
import LeafletMap from "../components/LeafletMap";

const WorkspaceScreen = () => {
  return (
    <div className="workspace-main">
      <Banner screen={"EDIT"} />
      <div className="workspace-content">
        <div className="sidebar">
          <SideMenu />
        </div>
        <div className="map-editing">
          <QuickAccessToolbar />
          <LeafletMap />
        </div>
      </div>
    </div>
  );
};

export default WorkspaceScreen;

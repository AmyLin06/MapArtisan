import React from "react";
import Banner from "../components/Banner";
import "../styles/WorkspaceScreen.css";
import QuickAccessToolbar from "../components/QuickAccessToolbar";
import SideMenu from "../components/SideMenu";
// import LeafletMap from "../components/LeafletMap";
import currentMap from "../assets/currentMap.json";

const WorkspaceScreen = () => {
  return (
    <div className="workspace-main">
      <Banner screen={"EDIT"} />
      <div className="workspace-content">
        <div className="sidebar">
          <SideMenu />
        </div>
        <div className="quick-toolbar">
          <QuickAccessToolbar />
        </div>
        {/* <LeafletMap /> */}
      </div>
    </div>
  );
};

export default WorkspaceScreen;

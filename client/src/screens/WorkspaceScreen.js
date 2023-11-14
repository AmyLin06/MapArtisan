import React from "react";
import Banner from "../components/Banner";
import "../styles/WorkspaceScreen.css";
import QuickAccessToolbar from "../components/QuickAccessToolbar";
import SideMenu from "../components/SideMenu";
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
      </div>
    </div>
  );
};

export default WorkspaceScreen;

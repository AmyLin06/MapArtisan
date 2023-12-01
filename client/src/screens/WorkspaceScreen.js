import React from "react";
import Banner from "../components/Banner";
import "../styles/WorkspaceScreen.css";
import QuickAccessToolbar from "../components/QuickAccessToolbar";
import SideMenu from "../components/SideMenu";
import ConfirmModal from "../components/Modals/ConfirmModal";
import { ConfirmModalTypes } from "../components/Modals/ModalTypes";
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
        <ConfirmModal modalType={ConfirmModalTypes.PUBLISH_MAP} />
      </div>
    </div>
  );
};

export default WorkspaceScreen;

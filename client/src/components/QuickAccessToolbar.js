import { React, useContext } from "react";
import {
  Save as SaveIcon,
  Undo as UndoIcon,
  Redo as RedoIcon,
} from "@mui/icons-material";
import { ButtonGroup, IconButton, Tooltip } from "@mui/material";
import ImportMenuList from "./MenuLists/ImportMenuList";
import ExportMenuList from "./MenuLists/ExportMenuList";
import MapPins from "./MapPins";
import FillInMenu from "./MenuLists/FillInMenu";
import BorderMenu from "./MenuLists/BorderMenu";
import TextMenu from "./MenuLists/TextMenu";
import FontMenu from "./MenuLists/FontMenu";
import LayerList from "./LayerList";
import { EditMapContext } from "../store/EditMapStore";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import PanToolAltOutlinedIcon from "@mui/icons-material/PanToolAltOutlined";
import AuthContext from "../auth";

export default function QuickAccessToolbar() {
  const { editStore } = useContext(EditMapContext);
  const { auth } = useContext(AuthContext);

  const handleSave = () => {
    console.log("trying to save in quick access toolbar - not implemented");
  };
  const handleUndo = () => {
    console.log("trying to undo in quick access toolbar - not implemented");
  };
  const handleRedo = () => {
    console.log("trying to redo in quick access toolbar - not implemented");
  };

  const handlePublish = () => {
    editStore.showPublishMapModal();
  };

  const handleMapScroll = () => {
    editStore.setScrolling();
  };

  return (
    <ButtonGroup aria-label="leaflet-toolbar" sx={{ height: "30px" }}>
      <Tooltip title="Cursor">
        <IconButton
          aria-label="scroll-map"
          sx={{
            border:
              editStore.activeTool.tool === "SCROLL"
                ? "2px solid #246BAD"
                : "none",
          }}
          onClick={handleMapScroll}
        >
          <PanToolAltOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Save">
        <IconButton
          aria-label="save"
          onClick={handleSave}
          sx={{ border: "none" }}
        >
          <SaveIcon style={{ fontSize: "1rem" }} />
        </IconButton>
      </Tooltip>
      <ImportMenuList />
      <ExportMenuList />
      <MapPins />
      <FontMenu />
      <FillInMenu />
      <BorderMenu />
      <TextMenu />
      <LayerList
        layers={editStore.currentMap ? editStore.currentMap.layers : []}
      />
      <Tooltip title="Publish">
        <IconButton aria-label="publish" onClick={handlePublish}>
          <ShareOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Undo">
        <IconButton aria-label="undo" onClick={handleUndo}>
          <UndoIcon style={{ fontSize: "1rem" }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Redo">
        <IconButton value="redo" aria-label="redo" onClick={handleRedo}>
          <RedoIcon style={{ fontSize: "1rem" }} />
        </IconButton>
      </Tooltip>
    </ButtonGroup>
  );
}

import { React, useContext } from "react";
import {
  Save as SaveIcon,
  Undo as UndoIcon,
  Redo as RedoIcon,
} from "@mui/icons-material";
import {
  ButtonGroup,
  IconButton,
  Tooltip,
  Typography,
  Stack,
  Divider,
  Box,
} from "@mui/material";
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

  const handleSave = () => {
    editStore.saveGraphic();
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
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{ height: "30px", backgroundColor: "#eaeff3" }}
    >
      <Box display="flex">
        <Typography fontWeight="bold" sx={{ color: "#246BAD", paddingLeft: 1 }}>
          {editStore.currentMapMetaData?.mapTitle || "Untitied"}
        </Typography>
        <Tooltip title="Publish">
          <IconButton aria-label="publish" onClick={handlePublish}>
            <ShareOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Stack direction="row">
        <ButtonGroup aria-label="undo-redo">
          <Tooltip title="Undo">
            <IconButton aria-label="undo" onClick={handleUndo}>
              <UndoIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Redo">
            <IconButton value="redo" aria-label="redo" onClick={handleRedo}>
              <RedoIcon />
            </IconButton>
          </Tooltip>
        </ButtonGroup>

        <Divider orientation="vertical" variant="middle" flexItem />

        <ButtonGroup aria-label="leaflet-toolbar">
          <Tooltip title="Save">
            <IconButton
              aria-label="save"
              onClick={handleSave}
              sx={{ border: "none" }}
            >
              <SaveIcon />
            </IconButton>
          </Tooltip>
          <LayerList
            layers={
              editStore.currentMapGraphic
                ? editStore.currentMapGraphic.layers
                : []
            }
          />
          <ImportMenuList />
          <ExportMenuList />
          <Divider orientation="vertical" variant="middle" flexItem />
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
          <MapPins />
          <FontMenu />
          <FillInMenu />
          <BorderMenu />
          <TextMenu />
        </ButtonGroup>
      </Stack>
    </Stack>
  );
}

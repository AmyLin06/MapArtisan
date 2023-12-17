import { React, useContext, useState } from "react";
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
  Popover,
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
import GuestModal from "./Modals/GuestModal";
import { GuestModalTypes } from "./Modals/ModalTypes";
import AuthContext from "../auth";

export default function QuickAccessToolbar() {
  const { editStore } = useContext(EditMapContext);
  const { auth } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSave = (event) => {
    if (auth.guest) {
      handleOpen(event);
      editStore.showGuestSaveModal();
    } else editStore.saveGraphic();
  };
  const handleUndo = () => {
    console.log("trying to undo in quick access toolbar - not implemented");
  };
  const handleRedo = () => {
    console.log("trying to redo in quick access toolbar - not implemented");
  };

  const handlePublish = (event) => {
    if (auth.guest) {
      handleOpen(event);
      editStore.showGuestPublishModal();
    } else editStore.showPublishMapModal();
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
          {editStore.currentMapMetaData?.mapTitle || "Untitled"}
        </Typography>
        <Tooltip title="Publish">
          <IconButton aria-label="publish" onClick={handlePublish}>
            <ShareOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <GuestModal
            modalType={GuestModalTypes.PUBLISH_MAP}
            initialAnchorEl={anchorEl}
            handleClose={() => setAnchorEl(null)}
          />
        </Popover>
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
              onClick={(event) => {
                handleSave(event);
              }}
              sx={{ border: "none" }}
              anchorEl={anchorEl}
            >
              <SaveIcon />
            </IconButton>
          </Tooltip>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <GuestModal
              modalType={GuestModalTypes.SAVE_MAP}
              initialAnchorEl={anchorEl}
              handleClose={() => setAnchorEl(null)}
            />
          </Popover>
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

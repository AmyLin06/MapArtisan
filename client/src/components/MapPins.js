import React, { useState, useContext } from "react";
import mapMarkers from "../assets/mapPins/markers/mapMarkers";
import {
  Button,
  ButtonGroup,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  ClickAwayListener,
  Tooltip,
} from "@mui/material";
import { EditMapContext } from "../store/EditMapStore";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const MapPins = () => {
  const { editStore } = useContext(EditMapContext);
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);
  const activeMarker =
    editStore.activeTool.tool === "MARKER"
      ? editStore.activeTool.detail
      : "busIcon";
  const [selectedKey, setSelectedKey] = useState(activeMarker);

  const handleIconClick = (key) => {
    setSelectedKey(key);
    editStore.setActiveMarker(key);
  };

  const handleMenuItemClick = (event, key) => {
    setSelectedKey(key);
    setOpen(false);
    handleIconClick(key);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup aria-label="split button">
        <Tooltip title="Marker">
          <Button
            size="small"
            sx={{
              border:
                editStore.activeTool.tool === "MARKER"
                  ? "2px solid #246BAD"
                  : "none",
              "&:hover": {
                border:
                  editStore.activeTool.tool === "MARKER"
                    ? "2px solid #246BAD"
                    : "none",
              },
            }}
            aria-controls={open ? "split-button-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-label="select marker option"
            aria-haspopup="menu"
            ref={anchorRef}
            onClick={handleToggle}
          >
            <img
              src={mapMarkers[selectedKey]}
              alt={selectedKey}
              style={{ width: "25px", height: "25px" }}
            />
            <ArrowDropDownIcon />
          </Button>
        </Tooltip>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 2,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {Object.entries(mapMarkers).map(([key, icon], index) => (
                    <MenuItem
                      key={key}
                      selected={key === selectedKey}
                      onClick={(event) => handleMenuItemClick(event, key)}
                    >
                      <img
                        src={icon}
                        alt={`${key}-${index}`}
                        style={{ width: "25px", height: "25px" }}
                      />
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
};

export default MapPins;

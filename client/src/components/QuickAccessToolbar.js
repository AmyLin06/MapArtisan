import * as React from "react";
import SaveIcon from "@mui/icons-material/Save";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Typography, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ImportMenuList from "./ImportMenuList";
import ExportMenuList from "./ExportMenuList";

export default function QuickAccessToolbar() {
  const handleSave = () => {
    console.log("trying to save in quick access toolbar - not implemented");
  };
  const handleUndo = () => {
    console.log("trying to undo in quick access toolbar - not implemented");
  };
  const handleRedo = () => {
    console.log("trying to redo in quick access toolbar - not implemented");
  };
  return (
    <ToggleButtonGroup
      exclusive
      aria-label="text alignment"
      sx={{
        display: "flex",
        "& .MuiSvgIcon-root": {
          color: "#246BAD",
        },
        "& .MuiTypography-root": {
          color: "#246BAD",
        },
      }}
    >
      <ToggleButton
        value="save"
        aria-label="save"
        sx={{
          borderRadius: "70px 0 0 70px",
          border: "1px solid black",
        }}
      >
        <IconButton onClick={handleSave}>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              verticalAlign: "center",
            }}
          >
            <SaveIcon style={{ fontSize: "1rem" }} />
            <Typography style={{ verticalAlign: "middle" }}>Save</Typography>
          </Box>
        </IconButton>
      </ToggleButton>
      <ToggleButton
        value="undo"
        aria-label="undo"
        sx={{
          border: "1px solid black",
        }}
      >
        <IconButton onClick={handleUndo}>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              verticalAlign: "center",
            }}
          >
            <UndoIcon style={{ fontSize: "1rem" }} />
            <Typography style={{ verticalAlign: "middle" }}>Undo</Typography>
          </Box>
        </IconButton>
      </ToggleButton>
      <ToggleButton
        value="redo"
        aria-label="redo"
        sx={{
          border: "1px solid black",
        }}
      >
        <IconButton onClick={handleRedo}>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              verticalAlign: "center",
            }}
          >
            <RedoIcon style={{ fontSize: "1rem" }} />
            <Typography style={{ verticalAlign: "middle" }}>Redo</Typography>
          </Box>
        </IconButton>
      </ToggleButton>
      <ToggleButton
        value="import"
        aria-label="import"
        sx={{
          border: "1px solid black",
        }}
      >
        <ImportMenuList />
      </ToggleButton>
      <ToggleButton
        value="export"
        aria-label="export"
        sx={{ borderRadius: "0 70px 70px 0", border: "1px solid black" }}
      >
        <ExportMenuList />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

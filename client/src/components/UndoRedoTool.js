import { IconButton, ButtonGroup } from "@mui/material";
import { Undo as UndoIcon, Redo as RedoIcon } from "@mui/icons-material";

export default function UndoRedoTool() {
  function handleRedo() {}
  function handleUndo() {}

  return (
    <ButtonGroup>
      <IconButton aria-label="undo" onClick={handleUndo}>
        <UndoIcon style={{ fontSize: "1rem" }} />
      </IconButton>
      <IconButton value="redo" aria-label="redo" onClick={handleRedo}>
        <RedoIcon style={{ fontSize: "1rem" }} />
      </IconButton>
    </ButtonGroup>
  );
}

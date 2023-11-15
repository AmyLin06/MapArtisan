import { CirclePicker } from "react-color";
import { useState } from "react";
import { Box, IconButton, Tooltip, Stack } from "@mui/material";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";

function ColorPicker() {
  const [defaultColor, setColor] = useState("#fff");

  function handleCompleteChange(color) {
    setColor(color.hex);
  }

  return (
    <Box>
      <Stack direction="horizontal">
        <Tooltip title="Text color">
          <IconButton>
            <FormatColorTextIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Fill-in color">
          <IconButton>
            <FormatColorFillIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Border color">
          <IconButton>
            <BorderColorIcon />
          </IconButton>
        </Tooltip>
      </Stack>
      <CirclePicker
        color={defaultColor}
        onChangeComplete={handleCompleteChange}
        width={"100%"}
      />
    </Box>
  );
}

export default ColorPicker;

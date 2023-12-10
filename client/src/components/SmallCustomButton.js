import React from "react";
import { Tooltip, Button } from "@mui/material";

//this custom button has a shorter height
export const SmallCustomButton = ({ onClick, icon, tooltipTitle, text }) => {
  return (
    <Tooltip title={tooltipTitle}>
      <Button
        onClick={onClick}
        variant="outlined"
        sx={{
          borderRadius: 32,
          height: "50%",
        }}
      >
        {icon && React.createElement(icon, { sx: { marginRight: 1 } })}
        {text}
      </Button>
    </Tooltip>
  );
};

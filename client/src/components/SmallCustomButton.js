import React from "react";
import { Tooltip, Button } from "@mui/material";

//this custom button has a shorter height and can be disabled
export const SmallCustomButton = ({
  onClick,
  icon,
  tooltipTitle,
  text,
  disable,
}) => {
  return (
    <Tooltip title={tooltipTitle}>
      <Button
        onClick={onClick}
        variant="outlined"
        sx={{
          borderRadius: 32,
          height: "50%",
          opacity: disable ? 0.5 : 1,
          cursor: disable ? "not-allowed" : "pointer",
          backgroundColor: disable ? "lightgray" : "inherit",
        }}
        disable={disable}
      >
        {icon && React.createElement(icon, { sx: { marginRight: 1 } })}
        {text}
      </Button>
    </Tooltip>
  );
};

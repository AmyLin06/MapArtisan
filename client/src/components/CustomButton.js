import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Tooltip } from "@mui/material";

const OutlinedStyledButton = styled(Button)(({ fontSize }) => ({
  boxShadow: "none",
  fontSize: fontSize || "14px",
  border: "1px solid",
  borderColor: "#246BAD"[500],
  borderRadius: 32,
  padding: "5px 15px",
  "&:hover": {
    backgroundColor: "rgba(169, 169, 169, 0.3)",
  },
}));

const ContainedStyledButton = styled(Button)(({ fontSize }) => ({
  boxShadow: "none",
  backgroundColor: "#246BAD",
  borderRadius: 32,
  border: "1px solid",
  padding: "5px 15px",
  fontSize: fontSize || "14px",
}));

const CustomButton = ({
  text,
  onPress,
  type = "outlined",
  icon: Icon,
  fontSize,
  tooltipTitle = "",
}) => {
  return (
    <Tooltip title={tooltipTitle}>
      {type === "outlined" ? (
        <OutlinedStyledButton
          variant={type}
          fontSize={fontSize}
          onClick={onPress}
        >
          {Icon && <Icon sx={{ fontSize: fontSize, marginRight: 1 }} />}
          {text}
        </OutlinedStyledButton>
      ) : (
        <ContainedStyledButton
          variant={type}
          fontSize={fontSize}
          onClick={onPress}
        >
          {Icon && <Icon sx={{ fontSize: fontSize, marginRight: 1 }} />}
          {text}
        </ContainedStyledButton>
      )}
    </Tooltip>
  );
};

export default CustomButton;

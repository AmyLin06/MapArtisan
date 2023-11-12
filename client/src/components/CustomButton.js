import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const OutlinedStyledButton = styled(Button)({
  boxShadow: "none",
  fontSize: "14px",
  border: "1px solid",
  borderColor: "#246BAD"[500],
  borderRadius: 32,
  padding: "5px 15px",
  "&:hover": {
    backgroundColor: "rgba(169, 169, 169, 0.3)",
  },
});

const ContainedStyledButton = styled(Button)({
  boxShadow: "none",
  backgroundColor: "#246BAD",
  borderRadius: 32,
  border: "1px solid",
  padding: "5px 15px",
  fontSize: "14px",
});

const CustomButton = ({ text, onPress, type = "outlined" }) => {
  return (
    <>
      {type === "outlined" ? (
        <OutlinedStyledButton variant={type}>{text}</OutlinedStyledButton>
      ) : (
        <ContainedStyledButton variant={type}>{text}</ContainedStyledButton>
      )}
    </>
  );
};

export default CustomButton;

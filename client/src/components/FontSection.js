import React from "react";
import "../styles/FontSection.css";
import Button from "@mui/material/Button";

const FontSection = () => {
  var fontList = ["Inter", "Times New Romans", "Inika", "Mandali", "PT Sans"];
  return (
    <div className="font-section">
      {fontList.map((txt, index) => (
        <Button key={index} variant="text" color="primary">
          {txt}
        </Button>
      ))}
    </div>
  );
};

export default FontSection;

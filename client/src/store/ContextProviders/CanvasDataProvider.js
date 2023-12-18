import React, { useState } from "react";
import CanvasDataContext from "./CanvasDataContext";

const CanvasDataProvider = ({ children }) => {
  const [canvasDataURL, setCanvasDataURL] = useState(null);

  return (
    <CanvasDataContext.Provider value={{ canvasDataURL, setCanvasDataURL }}>
      {children}
    </CanvasDataContext.Provider>
  );
};

export default CanvasDataProvider;

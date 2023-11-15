import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MapPins from "./MapPins";
import FontSection from "./FontSection";
import ColorPicker from "./ColorPicker";
// import * as MUIcon from "@material-ui/icons";

export default function ToolTab() {
  //   const top20Icons = Object.keys(MUIcon).slice(0, 20);
  return (
    <Box>
      <Box sx={{ paddingTop: 1 }}>
        <Typography variant="h7" fontWeight="bold">
          Markups
        </Typography>
        <MapPins />
        {/* {top20Icons.map((iconName, index) => {
          const IconComponent = MUIcon[iconName];
          return (
            <div key={index} style={{ margin: "8px", textAlign: "center" }}>
              <IconComponent />
              <p>{iconName}</p>
            </div>
          );
        })} */}
      </Box>
      <Box sx={{ paddingTop: 1 }}>
        <Typography variant="h7" fontWeight="bold">
          Colors
        </Typography>
        <ColorPicker />
        {/* <hr /> */}
      </Box>
      <Box sx={{ paddingTop: 1 }}>
        <Typography variant="h7" fontWeight="bold">
          Fonts
        </Typography>
        {/* <hr /> */}
        <FontSection />
        {/* <MapList maps={maps} /> */}
      </Box>
    </Box>
  );
}

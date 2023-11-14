import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LayerList from "./LayerList";
import currentMap from "../assets/currentMap.json";
import CustomButton from "./CustomButton";

function CustomTabPanel(props) {
  const { children, value, index } = props;

  return (
    <div hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function SideMenu() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handlePublish = () => {
    console.log("trying to publish map in the side menu - not implemented yet");
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>MAPNAME</Box>
      <Box sx={{ flex: 1, position: "relative" }}>
        <Box sx={{ borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Edit Screen Side Menu"
          >
            <Tab label="Layers" />
            <Tab label="Tools" />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <LayerList layers={currentMap.layers} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Typography>Tools</Typography>
        </CustomTabPanel>
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          paddingBottom: "1rem",
        }}
      >
        <CustomButton text="Publish" onPress={handlePublish} />
      </Box>
    </Box>
  );
}

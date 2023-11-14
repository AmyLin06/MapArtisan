import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import LayerList from "./LayerList";
import currentMap from "../assets/currentMap.json";
import CustomButton from "./CustomButton";
import ToolTab from "./ToolTab";

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
          <ToolTab />
        </CustomTabPanel>
      </Box>
      <Box
        sx={{
          position: "relative",
          bottom: 0,
          marginTop: "125%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CustomButton
          className="publish"
          text="Publish"
          onPress={handlePublish}
        />
      </Box>
    </Box>
  );
}

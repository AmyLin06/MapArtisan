import React from "react";
import "../styles/HomeScreen.css";
import Banner from "../components/Banner";
import { Typography,Box } from "@mui/material";
import MapList from "../components/MapList";

const HomeScreen = (props) => {
  const {currentUser,maps} = props
  return (
    <div className="main">
      <div>
        <Banner screen={"HOME"} />
      </div>
      <br></br>
      <div className="content-container">
      <div className="blue-area">
        <Box sx={{ paddingTop: 2 }}>
            <Typography variant="h5" fontWeight="bold">
              Templates
            </Typography>
            <hr />
            
          </Box>
      </div>
      <div className="white-area">
        <Box sx={{ paddingTop: 2 }}>
          <Typography variant="h5" fontWeight="bold">
            Maps
          </Typography>
          <hr />
          <MapList maps={maps} />
        </Box>
      </div>
    </div>
    </div>
  );
};

export default HomeScreen;

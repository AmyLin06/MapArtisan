import React from "react";
import "../styles/SplashScreen.css";
import Banner from "../components/Banner";

const SplashScreen = () => {
  return (
    <div className="main">
      <div>
        <Banner screen={"WELCOME"} />
      </div>

      <div className="sloganText">
        The world is a canvas and you hold the brush
      </div>
      <div className="nagivationText">Explore. Create. Map -&gt;</div>
    </div>
  );
};

export default SplashScreen;

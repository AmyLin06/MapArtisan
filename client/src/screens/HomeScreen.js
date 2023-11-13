import React from "react";
import "../styles/HomeScreen.css";
import Banner from "../components/Banner";

const HomeScreen = () => {
  return (
    <div className="main">
      <div>
        <Banner screen={"HOME"} />
      </div>
      <br></br>
      <div className="content-container">
      <div className="blue-area">
        <p>This is the blue area content.</p>
      </div>
      <div className="white-area">
        <p>This is the white area content.</p>
      </div>
    </div>
    </div>
  );
};

export default HomeScreen;

import React from "react";
import "../styles/SplashScreen.css";
import Banner from "../components/Banner";

const handleOnLogin = () => {
  console.log("This action should redirect user to the login page");
};

const handleOnRegister = () => {
  console.log("This action should redirect user to the register page");
};

const handleOnGuest = () => {
  console.log("This action should redirect user to the home page as guest");
};

const handleOnCreate = () => {
  console.log(
    "This action should redirect user to the work screen with a new base map"
  );
};

const SplashScreen = () => {
  return (
    <div>
      <Banner />
      {/* <div className="backgroundPicture"></div> */}
      SplashScreen
    </div>
  );
};

export default SplashScreen;

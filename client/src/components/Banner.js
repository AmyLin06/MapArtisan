import React from "react";
import CustomButton from "./CustomButton";
import { Stack } from "@mui/material";
import "../styles/Banner.css";

const LoginMenu = () => {
  return (
    <Stack className="loginMenu" spacing={1} direction="row">
      <CustomButton text="Continue as Guest" />
      <CustomButton text="Login" />
      <CustomButton text="Register" />
    </Stack>
  );
};

const Banner = ({ loginMenu = true }) => {
  return (
    <div className="banner">
      <div className="logo">
        <CustomButton text="U should see a logo here" />
      </div>
      <div>{loginMenu && <LoginMenu />}</div>
    </div>
  );
};

export default Banner;

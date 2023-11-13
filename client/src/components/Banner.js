import React from "react";
import CustomButton from "./CustomButton";
import { Stack, Typography, Grid, Box } from "@mui/material";
import { red } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import GroupsIcon from "@mui/icons-material/Groups";
import SearchBar from "./SearchBar";

//need to pass a "screen" prop to Banner
//Example: <Banner screen={"COMMUNITY"} />
export default function Banner(props) {
  const { screen } = props;
  var middleOfBanner = <></>;
  var rightOfBanner = <></>;

  const customFontStyle = {
    fontFamily: "Londrina Outline, sans-serif",
    fontSize: "40px",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
  };

  switch (screen) {
    case "WELCOME":
      rightOfBanner = (
        <Stack spacing={1.5} direction="row">
          <CustomButton text="Continue as Guest" />
          <CustomButton text="Login" />
          <CustomButton text="Register" />
        </Stack>
      );
      break;
    case "REGISTER":
      middleOfBanner = (
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#246BAD",
            fontSize: "2em",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {"Create Your Account"}
        </Typography>
      );
      break;
    case "LOGIN":
      middleOfBanner = (
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#246BAD",
            fontSize: "2em",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {"Login"}
        </Typography>
      );
      break;
    case "ACCOUNT_DETAIL":

    case "PROFILE":

    case "MAP_DETAILS":
      rightOfBanner = (
        <Stack spacing={2.5} direction="row">
          <Avatar sx={{ bgcolor: "#246BAD" }}>
            <GroupsIcon style={{ fontSize: "2rem" }} />
          </Avatar>
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        </Stack>
      );
      break;
    case "HOME":
      rightOfBanner = (
        <Stack spacing={2.5} direction="row">
          <Avatar sx={{ bgcolor: "#246BAD" }}>
            <GroupsIcon style={{ fontSize: "2rem" }} />
          </Avatar>
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        </Stack>
      );
      middleOfBanner = <SearchBar></SearchBar>;
      break;
    case "COMMUNITY":
      rightOfBanner = (
        <Stack spacing={2.5} direction="row">
          <Avatar sx={{ bgcolor: "#246BAD" }}>
            <GroupsIcon style={{ fontSize: "2rem" }} />
          </Avatar>
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        </Stack>
      );
      middleOfBanner = <div style={customFontStyle}>MapArtisan Community</div>;
      break;
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <CustomButton text="Logo here" />
      </Grid>
      <Grid item xs={6}>
        {middleOfBanner}
      </Grid>
      <Grid
        item
        xs={4}
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        {rightOfBanner}
      </Grid>
    </Grid>
  );
}

import React from "react";
import CustomButton from "./CustomButton";
import { Stack, Typography, Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import GroupsIcon from "@mui/icons-material/Groups";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import ProfileMenuList from "./MenuLists/ProfileMenuList";
import { useContext } from "react";
import AuthContext from "../auth";
import EditMapContext from "../store/EditMapStore";

//need to pass a "screen" prop to Banner, note that ACCOUNT_DETAIL, PROFILE, and MAP_DETAIL have the same banner
//Example: <Banner screen={"COMMUNITY"} />
export default function Banner(props) {
  const { screen } = props;
  const { auth } = useContext(AuthContext);
  const { editStore } = useContext(EditMapContext);

  var middleOfBanner = <></>;
  var rightOfBanner = <></>;
  var bannerColor = "transparent";

  const communityScreenStyle = {
    fontFamily: "Londrina Outline, sans-serif",
    fontSize: "40px",
    fontWeight: "bold",
    color: "#246BAD",
    display: "flex",
    justifyContent: "center",
  };

  const handleGuestLogin = () => {
    console.log("Guest Login");
    auth.guestLogin();
  };

  switch (screen) {
    case "WELCOME":
      rightOfBanner = (
        <Stack spacing={1.5} direction="row">
          <Link to="/home">
            <CustomButton text="Continue as Guest" onPress={handleGuestLogin} />
          </Link>
          <Link to="/login">
            <CustomButton text="Login" />
          </Link>
          <Link to="/register">
            <CustomButton text="Register" />
          </Link>
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
    case "FORGET_PASSWORD":
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
          {"Forget Password"}
        </Typography>
      );
      break;
    case "RESET_PASSWORD":
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
          {"Reset Password"}
        </Typography>
      );
      break;
    case "ACCOUNT_DETAIL":
      rightOfBanner = (
        <Stack spacing={2.5} direction="row">
          <Avatar sx={{ bgcolor: "#246BAD" }}>
            <GroupsIcon style={{ fontSize: "2rem" }} />
          </Avatar>
          <ProfileMenuList />
        </Stack>
      );
      break;
    case "PROFILE":
      rightOfBanner = (
        <Stack spacing={2.5} direction="row">
          <Avatar sx={{ bgcolor: "#246BAD" }}>
            <GroupsIcon style={{ fontSize: "2rem" }} />
          </Avatar>
          <ProfileMenuList />
        </Stack>
      );
      break;
    case "MAP_DETAIL":
      rightOfBanner = (
        <Stack spacing={2.5} direction="row">
          <Link to="/community">
            <Avatar sx={{ bgcolor: "#246BAD" }}>
              <GroupsIcon style={{ fontSize: "2rem" }} />
            </Avatar>
          </Link>
          <ProfileMenuList />
        </Stack>
      );
      break;
    case "HOME":
      rightOfBanner = (
        <Stack spacing={2.5} direction="row">
          <Link to="/community">
            <Avatar sx={{ bgcolor: "#246BAD" }}>
              <GroupsIcon style={{ fontSize: "2rem" }} />
            </Avatar>
          </Link>
          <ProfileMenuList />
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
          <ProfileMenuList />
        </Stack>
      );
      middleOfBanner = (
        <div style={communityScreenStyle}>MapArtisan Community</div>
      );
      break;
    case "EDIT":
      rightOfBanner = (
        <Stack spacing={2.5} direction="row">
          <Avatar sx={{ bgcolor: "#246BAD" }}>
            <GroupsIcon style={{ fontSize: "2rem" }} />
          </Avatar>
          <ProfileMenuList />
        </Stack>
      );
      bannerColor = "#246BAD";
      break;
    default:
      break;
  }

  const logoTo =
    window.location.pathname === "/login" ||
    window.location.pathname === "/register" ||
    window.location.pathname.startsWith("/reset-password") ||
    window.location.pathname === "/forget-password" ||
    window.location.pathname === "/"
      ? "/"
      : "/home";

  return (
    <Grid
      container
      spacing={2}
      sx={{ paddingBottom: 3, backgroundColor: bannerColor }}
    >
      <Grid item xs={2}>
        <Link to={logoTo} onClick={editStore.closeMap}>
          <CustomButton text="MapArtisan" />
        </Link>
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

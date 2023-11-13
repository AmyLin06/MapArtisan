// import React from "react";
// import CustomButton from "./CustomButton";
// import { Stack, Typography } from "@mui/material";
// import "../styles/Banner.css";

// const SplashScreenMenu = () => {
//   return (
//     <Stack className="loginMenu" spacing={1} direction="row">
//       <CustomButton text="Continue as Guest" />
//       <CustomButton text="Login" />
//       <CustomButton text="Register" />
//     </Stack>
//   );
// };
// const CreateAccountMenu = () => {
//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Typography
//         sx={{ fontWeight: "bold", color: "#246BAD", fontSize: "2em" }}
//       >
//         {"Create Your Account"}
//       </Typography>
//     </div>
//   );
// };
// const Banner = () => {
//   return (
//     <div className="banner">
//       <div className="logo">
//         <CustomButton text="U should see a logo here" />
//       </div>
//       <div>
//         {/* <SplashScreenMenu /> */}
//         <CreateAccountMenu />
//       </div>
//     </div>
//   );
// };

// export default Banner;

import React from "react";
import CustomButton from "./CustomButton";
import { Stack, Typography, Grid } from "@mui/material";

export default function Banner(props) {
  const { screen } = props;
  var middleOfBanner = <></>;
  var rightOfBanner = <></>;

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
    case "LOGIN":
      break;
  }
  if (screen === "WELCOME") {
    rightOfBanner = (
      <Stack spacing={1.5} direction="row">
        <CustomButton text="Continue as Guest" />
        <CustomButton text="Login" />
        <CustomButton text="Register" />
      </Stack>
    );
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <CustomButton text="Logo here" />
      </Grid>
      <Grid item xs={6}>
        {/* <Typography
          sx={{
            fontWeight: "bold",
            color: "#246BAD",
            fontSize: "2em",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {"Create Your Account"}
        </Typography> */}
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
        {/* <Stack spacing={1.5} direction="row">
          <CustomButton text="Continue as Guest" />
          <CustomButton text="Login" />
          <CustomButton text="Register" />
        </Stack> */}
        {rightOfBanner}
      </Grid>
    </Grid>
  );
}

import "../styles/LoginScreen.css";
import React from "react";
import Banner from "../components/Banner";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import Copyright from "../components/CopyRight";
import CustomButton from "../components/CustomButton";

// const handleSubmit = (event) => {
//   event.preventDefault();
//   const data = new FormData(event.currentTarget);
//   console.log({
//     email: data.get("email"),
//     password: data.get("password"),
//   });
// };

const LoginScreen = () => {
  return (
    <>
      <div className="login-container">
        <Banner className="banner" screen="LOGIN" />

        <div className="content">
          <Stack className="loginBox" spacing={2} direction="column">
            <div className="label">Email Address</div>
            <TextField
              className="textfield"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              InputProps={{
                style: {
                  borderRadius: "50px",
                },
              }}
            />
            <div className="label">Password</div>
            <TextField
              className="textfield"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              InputProps={{
                style: {
                  borderRadius: "50px",
                },
              }}
            />
            <div>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </div>
            <div>
              <Link to="/register">
                <Typography variant="body2">
                  Don't have an account? Sign Up
                </Typography>
              </Link>
            </div>
            <Link to="/home">
              <CustomButton text={"Sign in"} type="contained" />
            </Link>
          </Stack>
        </div>
        <br />
        <Copyright />
      </div>
    </>
  );
};

export default LoginScreen;

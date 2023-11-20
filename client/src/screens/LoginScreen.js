import "../styles/LoginScreen.css";
import React from "react";
import Banner from "../components/Banner";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { Stack, Typography,Box } from "@mui/material";
import Copyright from "../components/CopyRight";
import Button from '@mui/material/Button';
import { useContext } from 'react';
import AuthContext from '../auth'



const LoginScreen = () => {
  const { auth } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    auth.loginUser(
        formData.get('email'),
        formData.get('password')
    );
  };

  

  return (
    <>
      <div className="login-container">
        <Banner className="banner" screen="LOGIN" />

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Stack>
        </Box>
        <br />
        <Copyright />
      </div>
    </>
  );
};

export default LoginScreen;

import "../styles/LoginScreen.css";
import React from "react";
import Banner from "../components/Banner";
import TextField from "@mui/material/TextField";
import { Stack, Box } from "@mui/material";
import Copyright from "../components/CopyRight";
import Button from "@mui/material/Button";
import { useContext } from "react";
import AuthContext from "../auth";

const ForgetPasswordScreen = () => {
  const { auth } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    auth.forgetPassword(formData.get("email"));
  };

  return (
    <>
      <div className="login-container">
        <Banner className="banner" screen="FORGET_PASSWORD" />

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </Button>
          </Stack>
        </Box>
        <br />
        <Copyright />
      </div>
    </>
  );
};

export default ForgetPasswordScreen;

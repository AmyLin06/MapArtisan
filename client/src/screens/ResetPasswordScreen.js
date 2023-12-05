import "../styles/LoginScreen.css";
import React from "react";
import Banner from "../components/Banner";
import TextField from "@mui/material/TextField";
import { Stack, Box } from "@mui/material";
import Copyright from "../components/CopyRight";
import Button from "@mui/material/Button";
import { useContext, useState } from "react";
import AuthContext from "../auth";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";
import { useParams } from "react-router-dom";
import FailModal from "../components/Modals/FailModal";
import { FailModalTypes } from "../components/Modals/ModalTypes";

const ResetPasswordScreen = () => {
  const { auth } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const { id, token, expires } = useParams();
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    auth.resetPassword(
      formData.get("password"),
      formData.get("passwordverified"),
      id,
      token,
      expires
    );
  };

  return (
    <>
      <div className="login-container">
        <Banner className="banner" screen="RESET_PASSWORD" />

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Stack className="loginBox" spacing={2} direction="column">
            <div className="label">Password</div>
            <TextField
              className="textfield"
              margin="normal"
              required
              fullWidth
              name="password"
              label="password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              InputProps={{
                style: {
                  borderRadius: "50px",
                },
                endAdornment: (
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                ),
              }}
            />
            <div className="label">PasswordVerified</div>
            <TextField
              className="textfield"
              margin="normal"
              required
              fullWidth
              name="passwordverified"
              label="passwordverified"
              type={showPassword ? "text" : "password"}
              id="passwordverified"
              autoComplete="current-password"
              InputProps={{
                style: {
                  borderRadius: "50px",
                },
                endAdornment: (
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                ),
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
      <FailModal modalType={FailModalTypes.PASSWORD_RESET_FAIL} />
    </>
  );
};

export default ResetPasswordScreen;

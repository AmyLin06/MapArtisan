import "../styles/LoginScreen.css";
import React from "react";
import Banner from "../components/Banner";
import TextField from "@mui/material/TextField";
import { Stack, Box } from "@mui/material";
import Copyright from "../components/CopyRight";
import Button from "@mui/material/Button";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../auth";
import FailModal from "../components/Modals/FailModal";
import { FailModalTypes } from "../components/Modals/ModalTypes";
import SuccessModal from "../components/Modals/SuccessModal";
import { SuccessModalTypes } from "../components/Modals/ModalTypes";

const ForgetPasswordScreen = () => {
  const { auth } = useContext(AuthContext);
  const [attemptCount, setAttemptCount] = useState(0);
  const [firstAttemptTime, setFirstAttemptTime] = useState(null);
  const isButtonDisabled = attemptCount >= 3;

  useEffect(() => {
    if (firstAttemptTime) {
      const timer = setTimeout(() => {
        setAttemptCount(0);
        setFirstAttemptTime(null);
      }, 300000); // 300000 ms = 5 minutes

      return () => clearTimeout(timer);
    }
  }, [firstAttemptTime]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (attemptCount < 3) {
      const formData = new FormData(event.currentTarget);
      auth.forgetPassword(formData.get("email"));

      if (attemptCount === 0) {
        setFirstAttemptTime(Date.now());
      }
      setAttemptCount(attemptCount + 1);
    }
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
              disabled={isButtonDisabled}
              sx={{ mt: 3, mb: 2 }}
            >
              Send Email
            </Button>
          </Stack>
        </Box>
        <br />
        <Copyright />
      </div>
      <FailModal modalType={FailModalTypes.EMAIL_SEND_FAIL} />
      <SuccessModal modalType={SuccessModalTypes.EMAIL_SEND_SUCCESS} />
    </>
  );
};

export default ForgetPasswordScreen;

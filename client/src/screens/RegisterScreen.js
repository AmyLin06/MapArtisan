import "../styles/RegisterScreen.css";
import React, { useState, useEffect, useRef } from "react";
import Banner from "../components/Banner";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import Copyright from "../components/CopyRight";
import CustomButton from "../components/CustomButton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Privacy from "../assets/Privacy";
import Term from "../assets/Term";

const LoginScreen = () => {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const [content, setContent] = useState(null);
  const [dialogTitle, setDialogTitle] = useState(null);

  const handleClickOpen = (scrollType, content, title) => () => {
    setContent(content);
    setOpen(true);
    setScroll(scrollType);
    setDialogTitle(title);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <>
      <div className="main">
        <Banner className="banner" loginMenu={false} screen="REGISTER" />
        <div className="content">
          <Stack className="loginBox" spacing={2} direction="column">
            <div className="label">Username</div>
            <TextField
              className="textfield"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              InputProps={{
                style: {
                  borderRadius: "50px",
                },
              }}
            />
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
              {"By signing up, you agree to our and "}
              <Button
                onClick={handleClickOpen(
                  "paper",
                  <Privacy />,
                  "Privacy Policy"
                )}
              >
                Open Privacy Policy
              </Button>
              {" and "}
              <Button
                onClick={handleClickOpen("paper", <Term />, "Terms of Service")}
              >
                Terms of Service
              </Button>
              .
            </div>
            <Link to="/home">
              <CustomButton text={"Sign up Now!"} type="contained" />
            </Link>
            <br />
            <div>
              <Link to="/login">
                <Typography variant="body2">
                  Already have an account? Sign in
                </Typography>
              </Link>
            </div>
          </Stack>
        </div>
        <div className="copyright">
          <Copyright />
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LoginScreen;

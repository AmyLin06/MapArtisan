import "../styles/RegisterScreen.css";
import React, { useContext, useState, useEffect, useRef } from "react";
import AuthContext from '../auth'
import Banner from "../components/Banner";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { Stack, Typography,Box } from "@mui/material";
import Copyright from "../components/CopyRight";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Privacy from "../assets/Privacy";
import Term from "../assets/Term";
import { IconButton } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FailModal from "../components/Modals/FailModal"
import {FailModalTypes} from "../components/Modals/ModalTypes";


const RegisterScreen = () => {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const [content, setContent] = useState(null);
  const [dialogTitle, setDialogTitle] = useState(null);
  const { auth } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleClickOpen = (scrollType, content, title) => () => {
    setContent(content);
    setOpen(true);
    setScroll(scrollType);
    setDialogTitle(title);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    console.log("Here")
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    auth.registerUser(
        formData.get('username'),
        formData.get('firstname'),
        formData.get('lastname'),
        formData.get('email'),
        formData.get('password'),
        formData.get('passwordverified'),
    );
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
      <div className="register-container">
        <Banner className="banner" loginMenu={false} screen="REGISTER" />
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Stack className="loginBox" spacing={2} direction="column">
            <div className="label">Username</div>
            <TextField
              className="textfield"
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="username"
              autoFocus
              InputProps={{
                style: {
                  borderRadius: "50px",
                },
              }}
            />
             <div className="label">Firstname</div>
            <TextField
              className="textfield"
              margin="normal"
              required
              fullWidth
              id="firstname"
              label="firstname"
              name="firstname"
              autoComplete="firstname"
              autoFocus
              InputProps={{
                style: {
                  borderRadius: "50px",
                },
              }}
            />
            <div className="label">Lastname</div>
            <TextField
              className="textfield"
              margin="normal"
              required
              fullWidth
              id="lastname"
              label="lastname"
              name="lastname"
              autoComplete="lastname"
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
              label="password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              InputProps={{
                style: {
                  borderRadius: "50px",
                },
                endAdornment: (
                  <IconButton onClick={handleTogglePasswordVisibility} edge="end">
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
              type={showPassword ? 'text' : 'password'}
              id="passwordverified"
              autoComplete="current-password"
              InputProps={{
                style: {
                  borderRadius: "50px",
                },
                endAdornment: (
                  <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                ),
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
            {/* <Link to="/home"> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up Now!!
            </Button>
            {/* </Link> */}
            <br />
            <div>
              <Link to="/login">
                <Typography variant="body2">
                  Already have an account? Sign in
                </Typography>
              </Link>
            </div>
          </Stack>
        </Box>
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
      <FailModal modalType = {FailModalTypes.ACCOUNT_REGISTER_FAIL} />
    </>
  );
};

export default RegisterScreen;

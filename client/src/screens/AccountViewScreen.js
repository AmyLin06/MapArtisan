import React from "react";
import "../styles/ProfileScreen.css";
import Banner from "../components/Banner";
// import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
// import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Button from "@mui/material/Button";
import { TextField, Grid, InputLabel, Box, Avatar } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import AuthContext from "../auth";
import { IconButton } from "@mui/material";
import SuccessModal from "../components/Modals/SuccessModal";
import {
  SuccessModalTypes,
  FailModalTypes,
} from "../components/Modals/ModalTypes";
import FailModal from "../components/Modals/FailModal";

const AccountViewScreen = () => {
  const { auth } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordPart, setShowPasswordPart] = useState(false);

  function getRandomColor() {
    const colors = [
      "#e57373",
      "#64b5f6",
      "#aed581",
      "#ffb74d",
      "#ba68c8",
      "#4db6ac",
    ]; // add more colors as needed
    return colors[Math.floor(Math.random() * colors.length)];
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const userName = formData.get("userName");
    const email = formData.get("email");
    const currentPassword = formData.get("currentPassword");
    const newPassword = formData.get("newPassword");
    const confirmNewPassword = formData.get("confirmNewPassword");
    auth.updateUser(
      firstName,
      lastName,
      userName,
      email,
      currentPassword,
      newPassword,
      confirmNewPassword
    );
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleTogglePasswordPart = () => {
    setShowPasswordPart(!showPasswordPart);
  };

  return (
    <div className="main">
      <div>
        <Banner screen="ACCOUNT_DETAIL" />
      </div>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <div className="profile-container">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ width: "100%", height: "100%" }} // Adjust width and height as needed
          >
            <Avatar
              alt="profile-pic"
              sx={{
                width: 200,
                height: 200,
                marginRight: 2,
                bgcolor: getRandomColor(), // Random background color
                fontSize: "3rem", // Larger text
              }}
            >
              {auth.user?.firstName.charAt(0) + auth.user?.lastName.charAt(0)}
            </Avatar>
          </Box>

          {/* <img className="profile-picture" src={ProfilePicture} alt="Profile" /> */}
          {/* <div className="icon-buttons">
                    <Button className="icon-button" style={{color: "#333"}}>
                        <span role="img" aria-label="Icon 1">
                        <PhotoLibraryIcon/><br/>
                        Upload Image
                        </span>
                    </Button>
                    <Button className="icon-button" style={{color: "#333"}}>
                        <span role="img" aria-label="Icon 2">
                        <DeleteIcon/><br/>
                        Delete
                        </span>
                    </Button>
                </div> */}
          <Typography variant="h5" style={{ textAlign: "left" }}>
            Name & Username
          </Typography>
          <div className="inputs">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <InputLabel htmlFor="firstName" style={{ textAlign: "left" }}>
                  First Name:
                </InputLabel>
                <TextField
                  className="textfield"
                  margin="normal"
                  required
                  fullWidth
                  id="firstName"
                  label=" Enter First Name"
                  name="firstName"
                  autoComplete=""
                  defaultValue={auth.user?.firstName || ""}
                  autoFocus
                  InputProps={{
                    style: {
                      borderRadius: "50px",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel htmlFor="lastName" style={{ textAlign: "left" }}>
                  Last Name:
                </InputLabel>
                <TextField
                  className="textfield"
                  margin="normal"
                  required
                  fullWidth
                  id="lastName"
                  label=" Enter Last Name"
                  name="lastName"
                  autoComplete=""
                  defaultValue={auth.user?.lastName || ""}
                  InputProps={{
                    style: {
                      borderRadius: "50px",
                      color: "navy", // Change the font color to navy blue
                    },
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <InputLabel htmlFor="userName" style={{ textAlign: "left" }}>
                  UserName:
                </InputLabel>
                <TextField
                  className="textfield"
                  margin="normal"
                  required
                  fullWidth
                  id="userName"
                  label=" Enter Username"
                  name="userName"
                  autoComplete=""
                  defaultValue={auth.user?.userName || ""}
                  InputProps={{
                    style: {
                      borderRadius: "50px",
                      color: "navy", // Change the font color to navy blue
                    },
                  }}
                />
              </Grid>
            </Grid>
          </div>

          <br></br>
          <Typography variant="h5" style={{ textAlign: "left" }}>
            Email & Password
            <IconButton onClick={handleTogglePasswordPart} edge="end">
              {showPasswordPart ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
            <div
              className="inputs"
              style={{ display: showPasswordPart ? "block" : "none" }}
            >
              <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </div>
          </Typography>

          <div
            className="inputs"
            style={{ display: showPasswordPart ? "block" : "none" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <InputLabel htmlFor="email" style={{ textAlign: "left" }}>
                  Email:
                </InputLabel>
                <TextField
                  className="textfield"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label={auth.user.email}
                  name="email"
                  autoComplete="off"
                  autoFocus
                  disabled
                  InputProps={{
                    style: {
                      borderRadius: "50px",
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel
                  htmlFor="currentPassword"
                  style={{ textAlign: "left" }}
                >
                  Current Password:
                </InputLabel>
                <TextField
                  className="textfield"
                  margin="normal"
                  required
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  id="currentPassword"
                  label=" Enter Current Password"
                  name="currentPassword"
                  autoComplete=""
                  InputProps={{
                    style: {
                      borderRadius: "50px",
                      color: "navy", // Change the font color to navy blue
                    },
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <InputLabel htmlFor="newPassword" style={{ textAlign: "left" }}>
                  New Password:
                </InputLabel>
                <TextField
                  className="textfield"
                  margin="normal"
                  required
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  id="newPassword"
                  label=" Enter New Password"
                  name="newPassword"
                  autoComplete=""
                  InputProps={{
                    style: {
                      borderRadius: "50px",
                      color: "navy", // Change the font color to navy blue
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel
                  htmlFor="confirmNewPassword"
                  style={{ textAlign: "left" }}
                >
                  Confirm New Password:
                </InputLabel>
                <TextField
                  className="textfield"
                  margin="normal"
                  required
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  id="confirmNewPassword"
                  label=" Confirm New Password"
                  name="confirmNewPassword"
                  autoComplete=""
                  InputProps={{
                    style: {
                      borderRadius: "50px",
                      color: "navy", // Change the font color to navy blue
                    },
                  }}
                />
              </Grid>
            </Grid>
          </div>
          <Box display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Save Changes
            </Button>
          </Box>
        </div>
        <SuccessModal modalType={SuccessModalTypes.ACCOUNT_UPDATE_SUCCESS} />
        <FailModal modalType={FailModalTypes.ACCOUNT_UPDATE_FAIL} />
      </Box>
    </div>
  );
};

export default AccountViewScreen;

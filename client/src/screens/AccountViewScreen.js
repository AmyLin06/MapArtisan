import React from "react";
import "../styles/ProfileScreen.css";
import Banner from "../components/Banner";
import ProfilePicture from "../components/profilepicture.jpg";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { TextField, Grid, InputLabel, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import AuthContext from "../auth";
import { GlobalStoreContext } from "../store/GlobalStore";
import SuccessModal from "../components/Modals/SuccessModal";
import { SuccessModalTypes } from "../components/Modals/ModalTypes";

const AccountViewScreen = () => {
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);

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
    store.showAccountUpdateSuccessModal();
  };

  return (
    <div className="main">
      <div>
        <Banner screen="ACCOUNT_DETAIL" />
      </div>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <div className="profile-container">
          <img className="profile-picture" src={ProfilePicture} alt="Profile" />
          <div className="icon-buttons">
            <Button className="icon-button" style={{ color: "#333" }}>
              <span role="img" aria-label="Icon 1">
                <PhotoLibraryIcon />
                <br />
                Upload Image
              </span>
            </Button>
            <Button className="icon-button" style={{ color: "#333" }}>
              <span role="img" aria-label="Icon 2">
                <DeleteIcon />
                <br />
                Delete
              </span>
            </Button>
          </div>
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
                  InputProps={{
                    style: {
                      borderRadius: "50px",
                      color: "navy",
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
                  InputProps={{
                    style: {
                      borderRadius: "50px",
                      color: "navy",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </div>

          <br></br>
          <Typography variant="h5" style={{ textAlign: "left" }}>
            Email & Password
          </Typography>
          <div className="inputs">
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
                  label="example@gmail.com"
                  name="email"
                  autoComplete=""
                  autoFocus
                  InputProps={{
                    style: {
                      borderRadius: "50px",
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
                  id="currentPassword"
                  label=" Enter Current Password"
                  name="currentPassword"
                  autoComplete=""
                  InputProps={{
                    style: {
                      borderRadius: "50px",
                      color: "navy",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <InputLabel
                  htmlFor="newtPassword"
                  style={{ textAlign: "left" }}
                >
                  New Password:
                </InputLabel>
                <TextField
                  className="textfield"
                  margin="normal"
                  required
                  fullWidth
                  id="newPassword"
                  label=" Enter New Password"
                  name="newPassword"
                  autoComplete=""
                  InputProps={{
                    style: {
                      borderRadius: "50px",
                      color: "navy",
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
                  id="confirmNewPassword"
                  label=" Confirm New Password"
                  name="confirmNewPassword"
                  autoComplete=""
                  InputProps={{
                    style: {
                      borderRadius: "50px",
                      color: "navy",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </div>
          <br></br>
          <Box display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Save Changes
            </Button>
          </Box>
        </div>
        <SuccessModal modalType={SuccessModalTypes.ACCOUNT_UPDATE_SUCCESS} />
      </Box>
    </div>
  );
};

export default AccountViewScreen;

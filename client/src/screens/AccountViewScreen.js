import React,{useState,useRef} from "react";
import "../styles/ProfileScreen.css";
import Banner from "../components/Banner";
import ProfilePicture from "../components/profilePicture.jpg"
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { TextField,Grid,InputLabel,Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useContext } from 'react';
import AuthContext from '../auth'

const AccountViewScreen = () => {
    const { auth } = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const Picture = ProfilePicture;
    const fileInputRef = useRef();


    const handleButtonClick = () => {
        // Trigger click event on the hidden file input
        fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
        // Update the state with the selected file
        const selectedFile = e.target.files[0];
        // console.log(e.target.files[0]);
        setFile(selectedFile);
        console.log(file);
        await handleUpload(selectedFile);
    };

    const handleUpload = async (selectedFile) => {
        if (!selectedFile) {
          alert('Please select a file to upload.');
          return;
        }
        // Create a FormData object to append the file
        const formData = new FormData();
        formData.append('file', file);
        // for (const entry of formData.entries()) {
        //     console.log(entry[0], entry[1]);
        // }
        auth.uploadPicture(formData);
    }

    

    
    if (auth.user && auth.user.profilePictureUrl) {
        // loaded the profile picture from S3
    } else {
        console.log("default profile picture loaded");
    }
    

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const userName = formData.get('userName');
        const email = formData.get('email');
        const currentPassword = formData.get('currentPassword');
        const newPassword = formData.get('newPassword');
        const confirmNewPassword = formData.get('confirmNewPassword');
        auth.updateUser(firstName,lastName,userName,email,currentPassword,newPassword,confirmNewPassword);
    };

    return (
      <div className="main">
        <input
        type="file"
        accept="image/jpeg, image/png"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        ref={fileInputRef}
        />
        <div>
          <Banner screen = "ACCOUNT_DETAIL"/>
        </div>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <div className="profile-container">
                <img
                    className="profile-picture"
                    src = {Picture}
                    alt="Profile"
                />
                <div className="icon-buttons">
                    <Button className="icon-button" style={{color: "#333"}} onClick={handleButtonClick}>
                        <span role="img" aria-label="Icon 1">
                        <PhotoLibraryIcon/><br/>
                        Upload Image
                        </span>
                    </Button>
                    <br />
                    {/* {file && (
                        <>
                        <span>Selected File: {file.name}</span>
                        <br />
                        </>
                    )} */}
                    <Button className="icon-button" style={{color: "#333"}}>
                        <span role="img" aria-label="Icon 2">
                        <DeleteIcon/><br/>
                        Delete
                        </span>
                    </Button>
                </div>
                <Typography variant="h5" style={{ textAlign: "left" }}>
                    Name & Username
                </Typography>
                <div className = "inputs">
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
                </Typography>
                <div className = "inputs">
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
                            <InputLabel htmlFor="currentPassword" style={{ textAlign: "left" }}>
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
                                    color: "navy", // Change the font color to navy blue
                                },
                                }}
                            />
                        </Grid>
                        
                        <Grid item xs={6}>
                            <InputLabel htmlFor="newtPassword" style={{ textAlign: "left" }}>
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
                                    color: "navy", // Change the font color to navy blue
                                },
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel htmlFor="confirmNewPassword" style={{ textAlign: "left" }}>
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
                                    color: "navy", // Change the font color to navy blue
                                },
                                }}
                            />
                        </Grid>
                    </Grid>
                </div>
                <br></br>
                <Box display="flex" justifyContent="flex-end">
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Save Changes
                    </Button>
                </Box>
            </div>
        </Box>
      </div>
    );
  };


export default AccountViewScreen;
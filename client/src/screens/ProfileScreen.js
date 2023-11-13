import React from "react";
import "../styles/ProfileScreen.css";
import Banner from "../components/Banner";
import ProfilePicture from "../components/profilepicture.jpg"
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

const ProfileScreen = () => {
    return (
      <div className="main">
        <div>
          <Banner />
        </div>
        <div className="profile-container">
            <img
                className="profile-picture"
                src = {ProfilePicture}
                alt="Profile"
            />
            <div className="icon-buttons">
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
            </div>

            <div className = "inputs">

            </div>

        </div>
      </div>
    );
  };


export default ProfileScreen;
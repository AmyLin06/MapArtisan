import { Avatar, Box, Typography, Stack } from "@mui/material";
import MapList from "../components/MapList";
import ForumIcon from "@mui/icons-material/Forum";
import Banner from "../components/Banner";
// import sampleMaps from "../assets/maps.json";
import AuthContext from "../auth";
import { useState, useContext, useEffect } from "react";
import DrawIcon from "@mui/icons-material/Draw";
import GlobalStoreContext from "../store/GlobalStore";
import Button from "@mui/material/Button";
import InputModal from "../components/Modals/InputModal";
import {
  InputModalTypes,
  SuccessModalTypes,
} from "../components/Modals/ModalTypes";
import SuccessModal from "../components/Modals/SuccessModal";

function ProfileScreen() {
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);
  const [user, setUser] = useState(store.currentUser);
  const [maps, setMaps] = useState([]);
  // const location = useLocation();
  // const passedProp = location.state?.id;
  const isDisabled =
    auth.user?.email == store.currentUser?.email || auth.guest == true;
  function getRandomColor() {
    const colors = ["#4db6ac"]; // add more colors as needed
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // useEffect(() => {
  //   if (auth.user) store.getProfileMapMetaData(passedProp);
  //   // eslint-disable-next-line
  // }, [auth.loggedIn]);

  useEffect(() => {
    setMaps(store.profileMapList);
  }, [store.profileMapList]);

  useEffect(() => {
    setUser(store.currentUser);
  }, [store.currentUser]);

  const handleMessage = (event) => {
    store.showMessageModal();
  };

  return (
    <>
      <Box sx={{ padding: 2 }}>
        <Banner screen={"PROFILE"}></Banner>
        <Box display="flex">
          {user && (
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
              {user.firstName.charAt(0) + user.lastName.charAt(0)}
            </Avatar>
          )}
          <Stack direction="column" sx={{ paddingTop: 1 }}>
            {/* <Typography variant="h2" fontWeight="bold">
            {user.firstName} {user.lastName}
          </Typography> */}
            {user && (
              <Typography variant="h2" fontWeight="bold">
                {user.firstName} {user.lastName}
              </Typography>
            )}

            {user && (
              <Typography
                variant="h5"
                color="textSecondary"
                sx={{ marginBottom: 5 }}
              >
                @{user.userName}
              </Typography>
            )}
            <Button
              startIcon={<ForumIcon />}
              onClick={handleMessage}
              variant="outlined"
              disabled={isDisabled}
            >
              Message
            </Button>
          </Stack>
        </Box>

        {/* <Box sx={{ paddingTop: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          Maps
        </Typography>
        <hr />
        <MapList maps={sampleMaps.maps} screen={"COMMUNITY"} />
      </Box> */}
        <Box sx={{ paddingTop: 2 }}>
          <Typography variant="h5" fontWeight="bold">
            Maps
          </Typography>
          {maps.length === 0 ? (
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
            >
              <Typography
                variant="subtitle1"
                color="textSecondary"
                fontSize="1.5rem"
              >
                No maps created yet...
              </Typography>
              <DrawIcon fontSize="medium" color="action" />
            </Box>
          ) : (
            <MapList maps={maps} screen={"COMMUNITY"} />
          )}
        </Box>
      </Box>
      <InputModal modalType={InputModalTypes.MESSAGE_MODAL} />
      <SuccessModal modalType={SuccessModalTypes.MESSAGE_SUCCESS} />
    </>
  );
}

export default ProfileScreen;

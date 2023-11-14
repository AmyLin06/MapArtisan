import { Avatar, Box, Typography, Stack } from "@mui/material";
import MapList from "../components/MapList";
import CustomButton from "../components/CustomButton";
import ForumIcon from "@mui/icons-material/Forum";
import Banner from "../components/Banner";
import sampleMaps from "../assets/maps.json";
import sampleUser from "../assets/currentUser.json";

function ProfileScreen() {
  return (
    <Box sx={{ padding: 2 }}>
      <Banner screen={"PROFILE"}></Banner>
      <Box display="flex">
        <Avatar
          src={sampleUser.profilePic}
          alt="profile-pic"
          sx={{ width: 200, height: 200, marginRight: 2 }}
        />
        <Stack direction="column" sx={{ paddingTop: 1 }}>
          <Typography variant="h2" fontWeight="bold">
            {sampleUser.firstName} {sampleUser.lastName}
          </Typography>
          <Typography
            variant="h5"
            color="textSecondary"
            sx={{ marginBottom: 5 }}
          >
            @{sampleUser.username}
          </Typography>
          <CustomButton text={"Message"} icon={ForumIcon} />
        </Stack>
      </Box>

      <Box sx={{ paddingTop: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          Maps
        </Typography>
        <hr />
        <MapList maps={sampleMaps.maps} screen={"COMMUNITY"} />
      </Box>
    </Box>
  );
}

export default ProfileScreen;

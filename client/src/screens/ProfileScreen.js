import { Avatar, Box, Typography, Stack } from "@mui/material";
import MapList from "../components/MapList";
import CustomButton from "../components/CustomButton";
import ForumIcon from "@mui/icons-material/Forum";
import { grey } from "@mui/material/colors";

function ProfileScreen(props) {
  const { currentUser, maps } = props;

  return (
    <Box sx={{ padding: 2 }}>
      <Box display="flex">
        <Avatar
          src={currentUser.profilePic}
          alt="profile-pic"
          sx={{ width: 200, height: 200, marginRight: 2 }}
        />
        <Stack direction="column" sx={{ paddingTop: 1 }}>
          <Typography variant="h2" fontWeight="bold">
            {currentUser.firstName} {currentUser.lastName}
          </Typography>
          <Typography
            variant="h5"
            color="textSecondary"
            sx={{ marginBottom: 5 }}
          >
            @{currentUser.username}
          </Typography>
          <CustomButton text={"Message"} icon={ForumIcon} />
        </Stack>
      </Box>

      <Box sx={{ paddingTop: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          Maps
        </Typography>
        <hr />
        <MapList maps={maps} />
      </Box>
    </Box>
  );
}

export default ProfileScreen;

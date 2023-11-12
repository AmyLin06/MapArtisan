import "../styles/MapDetailsScreen.css";
import CommentSection from "../components/CommentSection";
import currentUser from "../assets/currentUser.json";
import { Avatar, Box, Typography } from "@mui/material";
import CustomButton from "../components/CustomButton";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ForkRightIcon from "@mui/icons-material/ForkRight";

function MapDetailsScreen(props) {
  const { map } = props;
  return (
    <Box sx={{ padding: 3 }}>
      <img id="map-details-img" src={map.mapPicture} alt="map-img" />
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h4" fontWeight="bold">
            {map.mapTitle}
          </Typography>
          <Box display="flex">
            <Avatar src={map.profilePic} sx={{ marginRight: 1 }} />
            <Typography
              variant="h6"
              color="textSecondary"
              sx={{ paddingTop: 0.5 }}
            >
              @{map.ownerUsername}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: "5%" }}>
          <CustomButton
            icon={ThumbUpOffAltIcon}
            text={map.likes}
            fontSize="25px"
          />
          <CustomButton
            icon={ForkRightIcon}
            text={"Duplicate"}
            fontSize="25px"
          />
        </Box>
      </Box>

      <Box sx={{ marginTop: 1, marginBottom: 1 }}>
        <Typography>
          {map.publishedDate} {map.forks} duplicates
        </Typography>
      </Box>

      <CommentSection comments={map.comments} currentUser={currentUser} />
    </Box>
  );
}

export default MapDetailsScreen;

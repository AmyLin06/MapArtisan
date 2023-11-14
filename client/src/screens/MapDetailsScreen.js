import "../styles/MapDetailsScreen.css";
import CommentSection from "../components/CommentSection";
import currentUser from "../assets/currentUser.json";
import { Avatar, Box, Typography } from "@mui/material";
import CustomButton from "../components/CustomButton";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ForkRightIcon from "@mui/icons-material/ForkRight";
import sampleMap from "../assets/currentMap.json";
import Banner from "../components/Banner";

function MapDetailsScreen() {
  return (
    <Box sx={{ padding: 2 }}>
      <Banner screen={"MAP_DETAIL"} />
      <img id="map-details-img" src={sampleMap.mapPicture} alt="map-img" />
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h4" fontWeight="bold">
            {sampleMap.mapTitle}
          </Typography>
          <Box display="flex">
            <Avatar src={sampleMap.profilePic} sx={{ marginRight: 1 }} />
            <Typography
              variant="h6"
              color="textSecondary"
              sx={{ paddingTop: 0.5 }}
            >
              @{sampleMap.ownerUsername}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: "5%" }}>
          <CustomButton
            icon={ThumbUpOffAltIcon}
            text={sampleMap.likes}
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
          {sampleMap.publishedDate} {sampleMap.forks} duplicates
        </Typography>
      </Box>

      <CommentSection comments={sampleMap.comments} currentUser={currentUser} />
    </Box>
  );
}

export default MapDetailsScreen;

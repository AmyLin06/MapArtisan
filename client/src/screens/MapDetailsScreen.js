import { useContext } from "react";
import "../styles/MapDetailsScreen.css";
import CommentSection from "../components/CommentSection";
import { Avatar, Box, Typography } from "@mui/material";
import CustomButton from "../components/CustomButton";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ForkRightIcon from "@mui/icons-material/ForkRight";
import sampleMap from "../assets/currentMap.json";
import Banner from "../components/Banner";
import AuthContext from "../auth";
import EditMapContext from "../store/EditMapStore";

function MapDetailsScreen() {
  const { auth } = useContext(AuthContext);
  const { editStore } = useContext(EditMapContext);

  const shortMonthDate = (dateObj) => {
    return dateObj
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
      .replace(/(\w{3}) (\d+), (\d+)/, "$1 $2, $3");
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Banner screen={"MAP_DETAIL"} />
      <img id="map-details-img" src={sampleMap.mapPicture} alt="map-img" />
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h4" fontWeight="bold">
            {editStore.currentMapMetaData?.mapTitle || ""}
          </Typography>
          <Box display="flex">
            <Avatar src={sampleMap.profilePic} sx={{ marginRight: 1 }} />
            <Typography
              variant="h6"
              color="textSecondary"
              sx={{ paddingTop: 0.5 }}
            >
              @{editStore.currentMapMetaData?.ownerUsername}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: "5%" }}>
          <CustomButton
            icon={ThumbUpOffAltIcon}
            text={editStore.currentMapMetaData?.userLiked.length}
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
          {shortMonthDate(
            new Date(editStore.currentMapMetaData?.publishedDate)
          )}
          <br />
          {editStore.currentMapMetaData?.forks} duplicates
        </Typography>
      </Box>

      <CommentSection comments={sampleMap.comments} currentUser={auth.user} />
    </Box>
  );
}

export default MapDetailsScreen;

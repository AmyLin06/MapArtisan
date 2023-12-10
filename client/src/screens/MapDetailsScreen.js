import React, { useContext } from "react";
import "../styles/MapDetailsScreen.css";
import CommentSection from "../components/CommentSection";
import { Avatar, Box, Typography, Divider, Grid } from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ForkRightIcon from "@mui/icons-material/ForkRight";
import sampleMap from "../assets/currentMap.json";
import Banner from "../components/Banner";
import AuthContext from "../auth";
import EditMapContext from "../store/EditMapStore";
import LeafletMap from "../components/Leaflet/LeafletMap";
import { SmallCustomButton } from "../components/SmallCustomButton";

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

  const handleLike = () => {
    console.log("handle like - not implemented");
  };
  const handleDuplicate = () => {
    console.log("handle duplicate - not implemented");
  };

  return (
    <>
      <Banner screen={"MAP_DETAIL"} />
      <>
        <Grid container>
          <Grid item className="name-name" xs={4} sx={{ overflow: "hidden" }}>
            <Typography fontWeight="bold" sx={{ color: "#246BAD" }}>
              {editStore.currentMapMetaData?.mapTitle || ""}
            </Typography>
            <Box display="flex">
              <Avatar
                src={sampleMap.profilePic}
                sx={{
                  marginRight: 0.5,
                  width: "1.5rem",
                  height: "1.5rem",
                }}
              />
              <Typography variant="h9" color="textSecondary">
                @{editStore.currentMapMetaData?.ownerUsername}
              </Typography>
              <Divider
                orientation="vertical"
                flexItem
                variant="h7"
                sx={{ marginX: 1, marginY: 0.5 }}
              />
              <Typography variant="h9" color="textSecondary">
                {shortMonthDate(
                  new Date(editStore.currentMapMetaData?.publishedDate)
                )}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} />
          <Grid item className="map-editing" xs={2}>
            <Box sx={{ display: "flex", gap: "3%" }}>
              <SmallCustomButton
                onClick={handleLike}
                icon={ThumbUpOffAltIcon}
                tooltipTitle="Like"
                text={editStore.currentMapMetaData?.userLiked.length}
              />
              <SmallCustomButton
                onClick={handleDuplicate}
                icon={ForkRightIcon}
                tooltipTitle="Duplicate"
                text={editStore.currentMapMetaData?.forks}
              />
              <CommentSection
                comments={sampleMap.comments}
                currentUser={auth.user}
              />
            </Box>
            <Box />
          </Grid>
          <Grid item xs={12}>
            <LeafletMap />
          </Grid>
        </Grid>
      </>
    </>
  );
}

export default MapDetailsScreen;

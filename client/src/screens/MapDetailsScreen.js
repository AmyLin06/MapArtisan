import React, { useContext } from "react";
import "../styles/MapDetailsScreen.css";
import CommentSection from "../components/CommentSection";
import { Avatar, Box, Typography, Divider, Grid, Button } from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ForkRightIcon from "@mui/icons-material/ForkRight";
import sampleMap from "../assets/currentMap.json";
import Banner from "../components/Banner";
import AuthContext from "../auth";
import EditMapContext from "../store/EditMapStore";
import LeafletMap from "../components/Leaflet/LeafletMap";
import { SmallCustomButton } from "../components/SmallCustomButton";
import GlobalStoreContext from "../store/GlobalStore";
import { useNavigate } from "react-router-dom";

function MapDetailsScreen() {
  const { auth } = useContext(AuthContext);
  const { editStore } = useContext(EditMapContext);
  const { store } = useContext(GlobalStoreContext);
  const navigate = useNavigate();

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
    store.likeMap();
  };
  const handleDuplicate = () => {
    console.log("handle duplicate - not implemented");
  };

  async function handleProfile() {
    await store.getProfileMapMetaData(editStore.currentMapMetaData?.ownerID);
    navigate("/profile");
  }

  return (
    <>
      <Banner screen={"MAP_DETAIL"} />
      <>
        <Grid container>
          <Grid item xs={4} sx={{ overflow: "hidden" }}>
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
              <Button onClick={handleProfile}>
                <Typography variant="h9" color="textSecondary">
                  @{editStore.currentMapMetaData?.ownerUsername}
                </Typography>
              </Button>
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
          <Grid item xs={2}>
            <Box sx={{ display: "flex", gap: "3%" }}>
              <SmallCustomButton
                onClick={handleLike}
                icon={ThumbUpOffAltIcon}
                tooltipTitle="Like"
                text={editStore.currentMapMetaData?.userLiked.length}
                disable={auth?.guest}
              />
              <SmallCustomButton
                onClick={handleDuplicate}
                icon={ForkRightIcon}
                tooltipTitle="Duplicate"
                text={editStore.currentMapMetaData?.forks}
                disable={false}
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

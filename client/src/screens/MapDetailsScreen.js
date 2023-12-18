import React, { useContext, useState, useEffect } from "react";
import "../styles/MapDetailsScreen.css";
import CommentSection from "../components/CommentSection";
import {
  Avatar,
  Box,
  Typography,
  Divider,
  Grid,
  Button,
  Popover,
} from "@mui/material";
import {
  Avatar,
  Box,
  Typography,
  Divider,
  Grid,
  Button,
  Popover,
} from "@mui/material";
import ForkRightIcon from "@mui/icons-material/ForkRight";
import sampleMap from "../assets/currentMap.json";
import Banner from "../components/Banner";
import AuthContext from "../auth";
import EditMapContext from "../store/EditMapStore";
import LeafletMap from "../components/Leaflet/LeafletMap";
import { SmallCustomButton } from "../components/SmallCustomButton";
import GlobalStoreContext from "../store/GlobalStore";
import { useNavigate } from "react-router-dom";
import GuestModal from "../components/Modals/GuestModal";
import { GuestModalTypes } from "../components/Modals/ModalTypes";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

export default function MapDetailsScreen() {
  const { auth } = useContext(AuthContext);
  const { editStore } = useContext(EditMapContext);
  const { store } = useContext(GlobalStoreContext);
  const [user, setUser] = useState(store.currentUser);
  const [user, setUser] = useState(store.currentUser);
  const [anchorEl, setAnchorEl] = useState(null);
  const [likedMap, setLikedMap] = useState(false);
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

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLike = async (event) => {
    if (auth.guest) {
      handleOpen(event);
      store.showGuestLikeModal();
    } else {
      await store.likeMap(editStore);
      await checkIsLiked();
    }
  };

  const handleDuplicate = () => {
    auth.guest ? navigate("/edit") : store.duplicateMap(store.currentMap._id);
  };

  const checkIsLiked = async () => {
    const bool = await store.isLikedMap(store.currentMap?._id);
    setLikedMap(bool);
  };

  async function handleProfile() {
    await store.getProfileMapMetaData(editStore.currentMapMetaData?.ownerID);
    navigate("/profile");
  }

  async function handleProfile() {
    await store.getProfileMapMetaData(editStore.currentMapMetaData?.ownerID);
    navigate("/profile");
  }

  useEffect(() => {
    checkIsLiked();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Banner screen={"MAP_DETAIL"} />
      <>
        <Grid container>
          <Grid item xs={8} sx={{ overflow: "hidden" }}>
            <Typography fontWeight="bold" sx={{ color: "#246BAD" }}>
              {store.currentMap?.mapTitle || ""}
            </Typography>
            <Box display="flex">
              {/* <Avatar
                src={sampleMap.profilePic}
                sx={{
                  marginRight: 0.5,
                  width: "1.5rem",
                  height: "1.5rem",
                }}
              /> */}
              {user && (
                <Avatar
                  alt="profile-pic"
                  sx={{
                    width: "1.75rem",
                    height: "1.75rem",
                    marginRight: 2,
                    bgcolor: "#4db6ac", // Random background color
                    fontSize: "0.8rem", // Larger text
                  }}
                >
                  {user.firstName.charAt(0) + user.lastName.charAt(0)}
                </Avatar>
              )}
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
              <Button disabled={true}>
                <Typography variant="h9" color="textSecondary">
                  {shortMonthDate(
                    new Date(editStore.currentMapMetaData?.publishedDate)
                  )}
                </Typography>
              </Button>
            </Box>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{ display: "flex", justifyContent: "flex-end", gap: "1%" }}
          >
            <SmallCustomButton
              onClick={(event) => {
                handleLike(event);
              }}
              icon={
                likedMap ? FavoriteOutlinedIcon : FavoriteBorderOutlinedIcon
              }
              tooltipTitle="Like"
              text={editStore.currentMapMetaData?.userLiked.length}
            />
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <GuestModal
                modalType={GuestModalTypes.LIKE_MAP}
                initialAnchorEl={anchorEl}
                handleClose={() => {
                  setAnchorEl(null);
                }}
              />
            </Popover>
            <SmallCustomButton
              onClick={handleDuplicate}
              icon={ForkRightIcon}
              tooltipTitle="Duplicate"
              text={editStore.currentMapMetaData?.forks}
            />
            <CommentSection comments={sampleMap.comments} />
          </Grid>
          <Grid item xs={12}>
            <LeafletMap />
          </Grid>
        </Grid>
      </>
    </>
  );
}

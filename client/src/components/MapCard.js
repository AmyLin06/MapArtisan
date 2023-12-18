import * as React from "react";
import { useContext } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Box, Typography, Grid } from "@mui/material";
import MapCardMenuList from "./MenuLists/MapCardMenuList";
import GroupsIcon from "@mui/icons-material/Groups";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import GlobalStoreContext from "../store/GlobalStore";
import EditMapContext from "../store/EditMapStore";
import { Button } from "@mui/material";

//Example (currentMap is mock data for a map)
//  (screen is either "HOME" by default or "COMMMUNITY", representing which screen the map card is for):
//  <MapCard currentMap={currentMap} screen={"COMMUNITY"}></MapCard>

export default function MapCard(props) {
  const navigate = useNavigate();
  //By default, screen="HOME"
  const { currentMap, screen, id } = props;
  const { store } = useContext(GlobalStoreContext);
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

  var subtextArea = (
    <Grid item container alignItems="center">
      {currentMap.isPublished && (
        <GroupsIcon style={{ fontSize: "1.5rem", marginRight: 4 }} />
      )}
      <Typography variant="h7" color="textSecondary">
        {"Edited: " + shortMonthDate(new Date(currentMap.updatedAt))}
      </Typography>
    </Grid>
  );

  async function handleProfile(event) {
    await store.getProfileMapMetaData(currentMap?.ownerID);
    navigate("/profile");
  }

  if (screen === "COMMUNITY") {
    subtextArea = (
      <Grid item container alignItems="center">
        <Typography variant="h7" color="textSecondary">
          <Button className="username" onClick={handleProfile}>
            <Typography variant="h9" color="textSecondary">
              @{currentMap.ownerUsername}
            </Typography>
          </Button>
          <br />
          <Grid item container alignContent="center">
            {currentMap.isPublished && (
              <GroupsIcon style={{ fontSize: "1.3rem", marginRight: 4 }} />
            )}
            {"Published: " + shortMonthDate(new Date(currentMap.publishedDate))}
          </Grid>
        </Typography>
      </Grid>
    );
  }

  async function handleCardClick(event) {
    event.preventDefault();
    if (event.target.closest(".kebab")) {
      return;
    }
    if (event.target.closest(".username")) {
      return;
    }
    //set the current map in the edit store by getting mapByID
    const mapMetaData = await store.getMapMetaDataById(id);
    await editStore.setMap(mapMetaData);
    if (currentMap.isPublished) {
      console.log(mapMetaData);
      navigate(`/map-details/${mapMetaData._id}`);
    } else {
      navigate("/edit");
    }
  }
  async function handleKebabClick() {
    //get and set the map so that when the user later selects a kebab option, it operates on the correct map
    await store.getMapMetaDataById(id);
  }

  return (
    <Link to="#" style={{ textDecoration: "none" }} onClick={handleCardClick}>
      <Card
        sx={{
          maxWidth: "100%",
          backgroundColor: "transparent",
        }}
      >
        <CardMedia
          component="img"
          height="40%"
          image={
            "https://cdn.britannica.com/37/245037-050-79129D52/world-map-continents-oceans.jpg"
          }
          alt="Map of the US"
        />
        <Box display="flex">
          <Grid
            container
            spacing={1}
            sx={{ margin: 0, marginBottom: 2 }}
            alignItems="baseline"
          >
            <Grid item xs={12}>
              <Typography variant="h6">{currentMap.mapTitle}</Typography>
            </Grid>
            {subtextArea}
          </Grid>
          <Avatar
            className="kebab"
            sx={{ background: "transparent" }}
            onClick={handleKebabClick}
          >
            <MapCardMenuList
              isPublished={currentMap.isPublished}
              screen={screen}
            />
          </Avatar>
        </Box>
      </Card>
    </Link>
  );
}

MapCard.defaultProps = {
  screen: "HOME",
};

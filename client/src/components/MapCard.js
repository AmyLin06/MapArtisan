import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Box, Typography, Grid } from "@mui/material";
import MapCardMenuList from "./MapCardMenuList";
import GroupsIcon from "@mui/icons-material/Groups";

//Example (currentMap is mock data for a map)
//  (screen is either "HOME" by default or "COMMMUNITY", representing which screen the map card is for):
//  <MapCard currentMap={currentMap} screen={"COMMUNITY"}></MapCard>

export default function MapCard(props) {
  //By default, screen="HOME"
  const { currentMap, screen } = props;

  //By default, leftIcons and subtextArea are set to values necessary for Home Screen
  var leftIcons = (
    <MapCardMenuList isPublished={currentMap.isPublished} screen={screen} />
  );
  var subtextArea = (
    <Grid item container alignItems="center">
      {currentMap.isPublished && (
        <GroupsIcon style={{ fontSize: "1.5rem", marginRight: 4 }} />
      )}
      <Typography variant="h7" color="textSecondary">
        {"Edited: Nov 10, 2023"}
      </Typography>
    </Grid>
  );

  if (screen === "COMMUNITY") {
    subtextArea = (
      <Grid item container alignItems="center">
        <Typography variant="h7" color="textSecondary">
          @{currentMap.ownerUsername}
          <br />
          <Grid item container alignContent="center">
            {currentMap.isPublished && (
              <GroupsIcon style={{ fontSize: "1.3rem", marginRight: 4 }} />
            )}
            {"Published: " + currentMap.publishedDate}
          </Grid>
        </Typography>
      </Grid>
    );
  }

  return (
    <Card sx={{ maxWidth: "100%" }}>
      <CardMedia
        component="img"
        height="40%"
        image={currentMap.mapPic}
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
            <Typography variant="h6">{currentMap.name}</Typography>
          </Grid>
          {subtextArea}
        </Grid>
        {leftIcons}
      </Box>
    </Card>
  );
}

MapCard.defaultProps = {
  screen: "HOME",
};

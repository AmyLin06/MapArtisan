import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Box, Typography, Grid } from "@mui/material";
import TemplatePic from "./templatepic.jpg";
import { Link } from "react-router-dom";

//Example (currentMap is mock data for a map)
//  (screen is either "HOME" by default or "COMMMUNITY", representing which screen the map card is for):
//  <MapCard currentMap={currentMap} screen={"COMMUNITY"}></MapCard>

export default function MapCard(props) {
  //By default, screen="HOME"
  const { templateName } = props;

  //By default, leftIcons and subtextArea are set to values necessary for Home Screen

  return (
    <Link to="/edit" style={{ textDecoration: "none" }}>
      <Card sx={{ maxWidth: "100%", height: "250px" }}>
        <CardMedia
          component="img"
          height="70%"
          alt="Map of the US"
          image={TemplatePic}
        />
        <Box display="flex">
          <Grid
            container
            spacing={1}
            sx={{ margin: 0, marginBottom: 2 }}
            alignItems="baseline"
          >
            <Grid item xs={12}>
              <Typography variant="h6">{templateName}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Link>
  );
}

MapCard.defaultProps = {
  screen: "HOME",
};

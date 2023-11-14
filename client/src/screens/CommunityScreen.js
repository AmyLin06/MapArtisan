import React, { useState } from "react";
import Banner from "../components/Banner";
import SearchBar from "../components/SearchBar";
import { Box, Grid } from "@mui/material";
import CustomButton from "../components/CustomButton";
import FilterMenuList from "../components/MenuLists/FIlterMenuList";
import MapList from "../components/MapList";
import sampleMaps from "../assets/maps.json";

export default function CommunityScreen() {
  const [search, setSearch] = useState("Maps");
  return (
    <Box sx={{ padding: 2 }}>
      <Banner screen={"COMMUNITY"} />
      <Grid container spacing={5} marginBottom={4}>
        <Grid item xs={6}>
          <SearchBar />
        </Grid>
        <Grid
          item
          xs={4}
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "2%",
          }}
        >
          {search === "Maps" ? (
            <CustomButton
              text={"Maps"}
              type={"contained"}
              onPress={() => {
                setSearch("Maps");
              }}
            />
          ) : (
            <CustomButton
              text={"Maps"}
              onPress={() => {
                setSearch("Maps");
              }}
            />
          )}
          {search === "Users" ? (
            <CustomButton
              text={"Users"}
              type={"contained"}
              onPress={() => {
                setSearch("Users");
              }}
            />
          ) : (
            <CustomButton
              text={"Users"}
              onPress={() => {
                setSearch("Users");
              }}
            />
          )}
        </Grid>
        <Grid
          item
          xs={2}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <FilterMenuList />
        </Grid>
      </Grid>
      <MapList maps={sampleMaps.maps} screen={"COMMUNITY"} />
    </Box>
  );
}

import React, { useContext, useState, useEffect } from "react";
import Banner from "../components/Banner";
import SearchBar from "../components/SearchBar";
import { Box, Grid, Typography } from "@mui/material";
import CustomButton from "../components/CustomButton";
import DrawIcon from "@mui/icons-material/Draw";
import FilterMenuList from "../components/MenuLists/FIlterMenuList";
import MapList from "../components/MapList";
// import sampleMaps from "../assets/maps.json";
import GlobalStoreContext from "../store/GlobalStore";

export default function CommunityScreen() {
  const { store } = useContext(GlobalStoreContext);
  const [search, setSearch] = useState("Maps");
  const [maps, setMaps] = useState([]);

  useEffect(() => {
    setMaps(store.communityMapList);
  }, [store.communityMapList]);

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
      {maps.length === 0 ? (
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <Typography
            variant="subtitle1"
            color="textSecondary"
            fontSize="1.5rem"
          >
            No published maps yet...
          </Typography>
          <DrawIcon fontSize="medium" color="action" />
        </Box>
      ) : (
        <MapList maps={maps} sscreen={"COMMUNITY"} />
      )}
    </Box>
  );
}

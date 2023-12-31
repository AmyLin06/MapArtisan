import React, { useState, useContext, useEffect } from "react";
import "../styles/HomeScreen.css";
import Banner from "../components/Banner";
import { Typography, Box } from "@mui/material";
import MapList from "../components/MapList";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TemplateCard from "../components/TemplateCard";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DrawIcon from "@mui/icons-material/Draw";
import { Link, useNavigate } from "react-router-dom";
import SuccessModal from "../components/Modals/SuccessModal";
import { SuccessModalTypes } from "../components/Modals/ModalTypes";
import AuthContext from "../auth";
import GlobalStoreContext from "../store/GlobalStore";

const HomeScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [maps, setMaps] = useState([]);
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);
  const navigate = useNavigate();

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleCreateMap = (template) => {
    auth.guest ? navigate("/edit") : store.createNewMap(template);
    navigate("/edit");
  };

  useEffect(() => {
    if (auth.user && !auth.guest) store.getHomeMapMetaData();
    // eslint-disable-next-line
  }, [auth.loggedIn, store.currentMap]);

  useEffect(() => {
    setMaps(store.homeMapList);
  }, [store.homeMapList]);

  return (
    <Box className="home-container" sx={{ padding: 2 }}>
      <div>
        <Banner screen={"HOME"} />
      </div>

      <div className="content-container">
        <div className="blue-area">
          <Box>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h5" fontWeight="bold">
                Templates
              </Typography>
              <Link to="/community">
                <Box display="flex" justifyContent="flex-end">
                  <Button onClick={store.getCommunityMapMetaData}>
                    Community Inspiration <ArrowForwardIcon />
                  </Button>
                </Box>
              </Link>
            </Box>
            <br></br>
            {currentPage === 1 && (
              <div>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <Card sx={{ maxWidth: "100%", height: "250px" }}>
                      <Box
                        height="100%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ backgroundColor: "#195083" }}
                      >
                        <IconButton
                          size="large"
                          onClick={() => handleCreateMap("Regular")}
                        >
                          <AddIcon fontSize="large" />
                        </IconButton>
                      </Box>
                    </Card>
                  </Grid>
                  <Grid item xs={3}>
                    <TemplateCard
                      templateName="Choropleth Map"
                      type={"choropleth"}
                    />
                  </Grid>
                  <Grid item xs={3} onClick={() => handleCreateMap("Routing")}>
                    <TemplateCard
                      templateName="Plan Your Trip"
                      type={"routing"}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TemplateCard templateName="Template3" />
                  </Grid>
                </Grid>
                <Button
                  className="icon-button"
                  style={{ color: "#333", padding: 0 }}
                  onClick={handleNextPage}
                >
                  <span role="img" aria-label="Icon 2">
                    <ArrowForwardIosIcon />
                    <br />
                  </span>
                </Button>
              </div>
            )}

            {currentPage === 2 && (
              <div>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <TemplateCard templateName="Template4" />
                  </Grid>
                  <Grid item xs={3}>
                    <TemplateCard templateName="Template5" />
                  </Grid>
                </Grid>
                <Button
                  className="icon-button"
                  style={{ color: "#333" }}
                  onClick={handlePreviousPage}
                >
                  <span role="img" aria-label="Icon 2">
                    <ArrowBackIosIcon />
                    <br />
                  </span>
                </Button>
              </div>
            )}
          </Box>
        </div>
        {
          <div class="container">
            <div className="white-area">
              <Box sx={{ paddingTop: 2 }}>
                <Typography variant="h5" fontWeight="bold">
                  Maps
                </Typography>
                {auth.guest || maps.length === 0 ? (
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
                      No maps created yet...
                    </Typography>
                    <DrawIcon fontSize="medium" color="action" />
                  </Box>
                ) : (
                  <MapList maps={maps} screen={"HOME"} />
                )}
              </Box>
            </div>
          </div>
        }
      </div>
      <SuccessModal modalType={SuccessModalTypes.ACCOUNT_LOGIN_SUCCESS} />
    </Box>
  );
};

export default HomeScreen;

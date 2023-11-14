import React,  {useState} from "react";
import "../styles/HomeScreen.css";
import Banner from "../components/Banner";
import { Typography,Box } from "@mui/material";
import MapList from "../components/MapList";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TemplateCard from "../components/TemplateCard";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


const HomeScreen = (props) => {
  const {maps} = props
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="main">
      <div>
        <Banner screen={"HOME"} />
      </div>
      <br></br>
      <div className="content-container">
      <div className="blue-area">
        <Box sx={{ paddingTop: 2 }}>
            <Typography variant="h5" fontWeight="bold">
              Templates
            </Typography>
            <Box display="flex" justifyContent="flex-end">
                <Button> Community Inspiration   <ArrowForwardIcon/> </Button>
            </Box>
            <hr/>
            <br></br>
            {currentPage === 1 && (
              <div>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Card sx={{ maxWidth: "100%" ,height: "300px" }}>
                        <Box height="100%" display="flex" justifyContent="center" alignItems="center" sx={{ backgroundColor: "#195083" }}>
                          {/* Instead of CardMedia, use only an AddIcon */}
                          <IconButton size="large">
                            <AddIcon fontSize="large" />
                          </IconButton>
                        </Box>
                      </Card>
                  </Grid>
                  <Grid item xs={4}>
                    <TemplateCard templateName = "Template1"/>
                  </Grid>
                  <Grid item xs={4}>
                    <TemplateCard templateName = "Template2"/>
                  </Grid>
                </Grid>
                <br></br>
                <Button className="icon-button" style={{color: "#333"}} onClick={handleNextPage}>
                    <span role="img" aria-label="Icon 2">
                     <ArrowForwardIosIcon/><br/>
                    </span>
                </Button>
              </div>
            )}

            {currentPage === 2 && (
              <div>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <TemplateCard templateName = "Template3"/>
                  </Grid>
                  <Grid item xs={4}>
                    <TemplateCard templateName = "Template4"/>
                  </Grid>
                  <Grid item xs={4}>
                    <TemplateCard templateName = "Template5"/>
                  </Grid>
                </Grid>
                <br></br>
                <Button className="icon-button" style={{color: "#333"}} onClick={handlePreviousPage}>
                    <span role="img" aria-label="Icon 2">
                     <ArrowBackIosIcon/><br/>
                    </span>
                </Button>
              </div>
            )}
        </Box>
      </div>
      <div className="white-area">
        <Box sx={{ paddingTop: 2 }}>
          <Typography variant="h5" fontWeight="bold">
            Maps
          </Typography>
          <hr />
          <MapList maps={maps} />
        </Box>
      </div>
    </div>
    </div>
  );
};

export default HomeScreen;
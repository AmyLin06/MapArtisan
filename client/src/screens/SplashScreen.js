import React from "react";
import "../styles/SplashScreen.css";
import Banner from "../components/Banner";

const theme = createTheme({
  typography: {
    fontFamily: '"Sansita Swashed"',
  },
});
const SplashScreen = () => {
  return (
    <>
      <div>
        <Banner />
      </div>

      <div className="sloganText">
        The world is a canvas and you hold the brush
      </div>
      <div class="nagivationText">Explore. Create. Map -&gt;</div>
    </>
  );
};

export default SplashScreen;

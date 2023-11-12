import "./App.css";
import currentMap from "./assets/currentMap.json";
import SplashScreen from "./screens/SplashScreen";
import MapDetailsScreen from "./screens/MapDetailsScreen.js";

function App() {
  return (
    <div className="App">
      <SplashScreen />
      {/* <MapDetailsScreen map={currentMap} /> */}
    </div>
  );
}

export default App;

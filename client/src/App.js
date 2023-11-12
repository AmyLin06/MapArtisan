import "./App.css";
import SplashScreen from "./screens/SplashScreen";
import MapDetailsScreen from "./screens/MapDetailsScreen";
import currentMap from "./assets/currentMap.json";
function App() {
  return (
    <div className="App">
      <header>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Sansita+Swashed:wght@800&display=swap"
          rel="stylesheet"
        />
      </header>
      <SplashScreen />
      {/* <MapDetailsScreen map={currentMap} /> */}
    </div>
  );
}

export default App;

import "./App.css";
import MapList from "./components/MapList";
import SplashScreen from "./screens/SplashScreen";
import maps from "./assets/maps.json";

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
      <MapList maps={maps.maps} />
    </div>
  );
}

export default App;

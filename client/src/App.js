import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import maps from "./assets/maps.json";
import currentUser from "./assets/currentUser.json";
import { GlobalStoreContextProvider } from "./store/GlobalStore";

function App() {
  return (
    <GlobalStoreContextProvider>
      <div className="App">
        <header>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Sansita+Swashed:wght@800&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Londrina+Outline&display=swap"
            rel="stylesheet"
          />
        </header>
        <HomeScreen currentUser={currentUser} maps={maps.maps} />
        {/* <MapDetailsScreen map={currentMap} /> */}
      </div>
    </GlobalStoreContextProvider>
  );
}

export default App;

import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import maps from "./assets/maps.json"
import currentUser from "./assets/currentUser.json"


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
        <link
          href="https://fonts.googleapis.com/css2?family=Londrina+Outline&display=swap"
          rel="stylesheet"
        />
      </header>
      <HomeScreen currentUser={currentUser} maps={maps.maps}/>
      {/* <MapDetailsScreen map={currentMap} /> */}
    </div>
  );
}

export default App;

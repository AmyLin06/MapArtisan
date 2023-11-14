import "./App.css";
import SideMenu from "./components/SideMenu";
import currentMap from "./assets/currentMap.json";
import RegisterScreen from "./screens/RegisterScreen";

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

      {/* <RegisterScreen /> */}
      <SideMenu />
    </div>
  );
}

export default App;

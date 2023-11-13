import "./App.css";
import FilterMenuList from "./components/FIlterMenuList";
import CommunityScreen from "./screens/CommunityScreen";
import SplashScreen from "./screens/SplashScreen";
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
      {/* <SplashScreen /> */}
      {/* <FilterMenuList></FilterMenuList> */}
      <CommunityScreen></CommunityScreen>
    </div>
  );
}

export default App;

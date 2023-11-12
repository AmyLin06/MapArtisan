import "./App.css";
import currentMap from "./assets/currentMap.json";
import currentUser from "./assets/currentUser.json";
import SplashScreen from "./screens/SplashScreen";
import CommentSection from "./components/CommentSection.js";

function App() {
  return (
    <div className="App">
      <SplashScreen />
      <CommentSection
        comments={currentMap.comments}
        currentUser={currentUser}
      />
    </div>
  );
}

export default App;

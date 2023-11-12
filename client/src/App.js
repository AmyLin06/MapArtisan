import "./App.css";
import CommentCard from "./components/CommentCard.js";
import currentMap from "./assets/currentMap.json";

function App() {
  return (
    <div className="App">
      <p>MapArtisan</p>
      <CommentCard comment={currentMap.comments[0]} />
    </div>
  );
}

export default App;

import "./App.css";
import RegisterScreen from "./screens/RegisterScreen";

function App() {
  return (
    <div className="App">
      <header
      // className="App-header"
      >
        {/*Do not remove these links, these links are use to set the font for the app*/}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Sansita+Swashed:wght@800&display=swap"
          rel="stylesheet"
        />
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>MapArtisan</p>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
      <RegisterScreen />
    </div>
  );
}

export default App;

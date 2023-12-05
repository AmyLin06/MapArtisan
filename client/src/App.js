import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterScreen from "./screens/RegisterScreen";
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import CommunityScreen from "./screens/CommunityScreen";
import MapDetailsScreen from "./screens/MapDetailsScreen";
import AccountViewScreen from "./screens/AccountViewScreen";
import ProfileScreen from "./screens/ProfileScreen";
import WorkspaceScreen from "./screens/WorkspaceScreen";
import { GlobalStoreContextProvider } from "./store/GlobalStore";
import ForgetPasswordScreen from "./screens/ForgetPasswordScreen";
import { AuthContextProvider } from "./auth";
import { EditMapContextProvider } from "./store/EditMapStore";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";

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

      <BrowserRouter>
        <AuthContextProvider>
          <EditMapContextProvider>
            <GlobalStoreContextProvider>
              <Routes>
                <Route path="/">
                  <Route index element={<SplashScreen />} />
                  <Route path="login" element={<LoginScreen />} />
                  <Route path="register" element={<RegisterScreen />} />
                  <Route
                    path="forget-password"
                    element={<ForgetPasswordScreen />}
                  />
                  <Route
                    path="reset-password/:id/:token/:expires"
                    element={<ResetPasswordScreen />}
                  />
                  <Route path="home" element={<HomeScreen />} />
                  <Route path="community" element={<CommunityScreen />} />
                  <Route
                    path="map-details/:mapId"
                    element={<MapDetailsScreen />}
                  />
                  <Route
                    path="account-setting"
                    element={<AccountViewScreen />}
                  />
                  <Route path="profile" element={<ProfileScreen />} />
                  <Route path="edit" element={<WorkspaceScreen />} />
                </Route>
              </Routes>
            </GlobalStoreContextProvider>
          </EditMapContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

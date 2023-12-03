import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "./auth-request-api";

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
  GET_LOGGED_IN: "GET_LOGGED_IN",
  LOGIN_USER: "LOGIN_USER",
  LOGOUT_USER: "LOGOUT_USER",
  REGISTER_USER: "REGISTER_USER",
  UPDATE_USER: "UPDATE_USER",
  HIDE_MODALS: "HIDE_MODALS",
  FORGET_PASSWORD: "FORGET_PASSWORD",
};

const CurrentModal = {
  NONE: "NONE",
  ACCOUNT_UPDATE_SUCCESS: "ACCOUNT_UPDATE_SUCCESS",
  ACCOUNT_UPDATE_FAIL: "ACCOUNT_UPDATE_FAIL",
  ACCOUNT_LOGIN_FAIL: "ACCOUNT_LOGIN_FAIL",
  ACCOUNT_LOGIN_SUCCESS: "ACCOUNT_LOGIN_SUCCESS",
  ACCOUNT_REGISTER_FAIL: "ACCOUNT_REGISTER_FAIL",
  ERROR: "ERROR",
};

function AuthContextProvider(props) {
  const [guest, setGuest] = useState(false);
  const [auth, setAuth] = useState({
    currentModal: CurrentModal.NONE,
    user: null,
    loggedIn: false,
    errorMessage: null,
    guest: false,
  });

  const history = useNavigate();

  // useEffect(() => {
  //     auth.getLoggedIn();
  // }, [auth]);
  // here

  const authReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      case AuthActionType.GET_LOGGED_IN: {
        return setAuth({
          currentModal: CurrentModal.NONE,
          user: payload.user,
          loggedIn: payload.loggedIn,
          errorMessage: null,
          guest: payload.guest,
        });
      }
      case AuthActionType.FORGET_PASSWORD: {
        return setAuth({
          currentModal: payload.currentModal,
          user: null,
          loggedIn: null,
          errorMessage: payload.errorMessage,
          guest: false,
        });
      }
      case AuthActionType.LOGIN_USER: {
        return setAuth({
          currentModal: payload.currentModal,
          user: payload.user,
          loggedIn: payload.loggedIn,
          errorMessage: payload.errorMessage,
          guest: payload.guest,
        });
      }
      case AuthActionType.LOGOUT_USER: {
        return setAuth({
          currentModal: CurrentModal.NONE,
          user: null,
          loggedIn: false,
          errorMessage: null,
          guest: false,
        });
      }
      case AuthActionType.REGISTER_USER: {
        return setAuth({
          currentModal: payload.currentModal,
          user: payload.user,
          loggedIn: payload.loggedIn,
          errorMessage: payload.errorMessage,
          guest: guest,
        });
      }
      case AuthActionType.UPDATE_USER: {
        return setAuth({
          currentModal: payload.currentModal,
          user: payload.user,
          loggedIn: payload.loggedIn,
          errorMessage: payload.errorMessage,
          guest: guest,
        });
      }
      case AuthActionType.HIDE_MODALS: {
        return setAuth({
          currentModal: CurrentModal.NONE,
          user: auth.user,
          loggedIn: auth.loggedIn,
          errorMessage: auth.errorMessage,
          guest: payload.guest,
        });
      }
      default:
        return auth;
    }
  };

  auth.getLoggedIn = async function () {
    const response = await api.getLoggedIn();
    if (response.status === 200) {
      authReducer({
        type: AuthActionType.GET_LOGGED_IN,
        payload: {
          loggedIn: response.data.loggedIn,
          user: response.data.user,
          guest: guest,
        },
      });
    }
  };

  auth.registerUser = async function (
    userName,
    firstName,
    lastName,
    email,
    password,
    passwordverified
  ) {
    console.log("REGISTERING USER");
    try {
      const response = await api.registerUser(
        userName,
        firstName,
        lastName,
        email,
        password,
        passwordverified
      );
      if (response.status === 200) {
        console.log("Registered Sucessfully");
        console.log(response.data.user);
        authReducer({
          type: AuthActionType.REGISTER_USER,
          payload: {
            user: response.data.user,
            loggedIn: false,
            errorMessage: null,
            currentModal: CurrentModal.NONE,
          },
        });
        // history("/login");
        console.log("NOW WE LOGIN");
        auth.loginUser(email, password);
        console.log("LOGGED IN");
      }
    } catch (error) {
      authReducer({
        type: AuthActionType.REGISTER_USER,
        payload: {
          user: auth.user,
          loggedIn: false,
          errorMessage: error.response.data.errorMessage,
          currentModal: CurrentModal.ACCOUNT_REGISTER_FAIL,
        },
      });
    }
  };

  auth.forgetPassword = async function (email) {
    try {
      const response = await api.forgetPassword(email);
      if (response.status === 200) {
        authReducer({
          type: AuthActionType.FORGET_PASSWORD,
          payload: {
            currentModal: CurrentModal.NONE,
            user: null,
            loggedIn: false,
            errorMessage: null,
            guest: false,
          },
        });
        history("/login");
      }
    } catch (error) {
      authReducer({
        type: AuthActionType.FORGET_PASSWORD,
        payload: {
          user: null,
          loggedIn: false,
          errorMessage: error.response.data.errorMessage,
          currentModal: CurrentModal.ACCOUNT_LOGIN_FAIL, //need to update to reset fail
          guest: false,
        },
      });
    }
  };

  auth.loginUser = async function (email, password, store) {
    try {
      const response = await api.loginUser(email, password);
      if (response.status === 200) {
        console.log(response.data.user);
        authReducer({
          type: AuthActionType.LOGIN_USER,
          payload: {
            currentModal: CurrentModal.ACCOUNT_LOGIN_SUCCESS,
            user: response.data.user,
            loggedIn: true,
            errorMessage: null,
            guest: false,
          },
        });
        history("/home");
        store.getHomeMapMetaData();
      }
    } catch (error) {
      authReducer({
        type: AuthActionType.LOGIN_USER,
        payload: {
          user: null,
          loggedIn: false,
          errorMessage: error.response.data.errorMessage,
          currentModal: CurrentModal.ACCOUNT_LOGIN_FAIL,
          guest: false,
        },
      });
    }
  };

  auth.logoutUser = async function () {
    setGuest(false);
    const response = await api.logoutUser();
    console.log(response.status);
    if (response.status === 200) {
      authReducer({
        type: AuthActionType.LOGOUT_USER,
        payload: null,
      });
      history("/");
    }
    console.log(auth.user);
  };

  auth.getUserInitials = function () {
    let initials = "";
    if (auth.user) {
      initials += auth.user.firstName.charAt(0);
      initials += auth.user.lastName.charAt(0);
    }
    console.log("user initials: " + initials);
    return initials;
  };

  auth.updateUser = async function (
    firstName,
    lastName,
    userName,
    email,
    currentPassword,
    newPassword,
    confirmNewPassword
  ) {
    console.log("UPDATE USER");
    try {
      const userEmail = auth.user.email;
      const response = await api.updateUser(
        userEmail,
        firstName,
        lastName,
        userName,
        email,
        currentPassword,
        newPassword,
        confirmNewPassword
      );
      if (response.status === 200) {
        console.log("Update Sucessfully");
        console.log(response.data.user);
        authReducer({
          type: AuthActionType.UPDATE_USER,
          payload: {
            currentModal: CurrentModal.ACCOUNT_UPDATE_SUCCESS,
            user: response.data.user,
            loggedIn: true,
            errorMessage: null,
          },
        });
      }
    } catch (error) {
      authReducer({
        type: AuthActionType.UPDATE_USER,
        payload: {
          currentModal: CurrentModal.ACCOUNT_UPDATE_FAIL,
          user: auth.user,
          loggedIn: true,
          errorMessage: error.response.data.errorMessage,
        },
      });
    }
  };
  auth.hideModals = () => {
    authReducer({
      type: AuthActionType.HIDE_MODALS,
      payload: { guest: guest },
    });
  };

  auth.guestLogin = async function () {
    try {
      setGuest(true);
      const response = await api.loginUser("guest@gmail.com", "GuestPassword");
      if (response.status === 200) {
        authReducer({
          type: AuthActionType.LOGIN_USER,
          payload: {
            user: response.data.user,
            loggedIn: true,
            errorMessage: null,
            currentModal: CurrentModal.ACCOUNT_LOGIN_SUCCESS,
            guest: true,
          },
        });
        history("/home");
      }
    } catch (error) {
      try {
        const response = await api.registerUser(
          "Guest",
          "Guest",
          "User",
          "guest@gmail.com",
          "GuestPassword",
          "GuestPassword"
        );
        if (response.status === 200) {
          console.log("Registered Sucessfully");
          authReducer({
            type: AuthActionType.REGISTER_USER,
            payload: {
              user: response.data.user,
              loggedIn: true,
              errorMessage: null,
              //need to think about
            },
          });
          // auth.loginUser("guest@gmail.com", "GuestPassword");
          auth.guestLogin();
          console.log("GUEST LOGGED IN");
        }
      } catch (error) {
        setGuest(false);
        authReducer({
          type: AuthActionType.REGISTER_USER,
          payload: {
            user: auth.user,
            loggedIn: false,
            errorMessage: error.response.data.errorMessage,
          },
        });
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };

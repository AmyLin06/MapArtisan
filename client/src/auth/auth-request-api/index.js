/*
    This is our http api for all things auth, which we use to 
    send authorization requests to our back-end API. Note we`re 
    using the Axios library for doing this, which is an easy to 
    use AJAX-based library. We could (and maybe should) use Fetch, 
    which is a native (to browsers) standard, but Axios is easier
    to use when sending JSON back and forth and it`s a Promise-
    based API which helps a lot with asynchronous communication.
*/

import axios from "axios";

axios.defaults.withCredentials = true;

const isDevelopment = process.env.NODE_ENV === "development";
const api = axios.create({
  baseURL: isDevelopment
    ? "http://localhost:4000/auth"
    : `${process.env.REACT_APP_API_URL}/auth` || "http://localhost:4000/auth",
});

// THESE ARE ALL THE REQUESTS WE`LL BE MAKING, ALL REQUESTS HAVE A
// REQUEST METHOD (like get) AND PATH (like /register). SOME ALSO
// REQUIRE AN id SO THAT THE SERVER KNOWS ON WHICH LIST TO DO ITS
// WORK, AND SOME REQUIRE DATA, WHICH WE WE WILL FORMAT HERE, FOR WHEN
// WE NEED TO PUT THINGS INTO THE DATABASE OR IF WE HAVE SOME
// CUSTOM FILTERS FOR QUERIES

export const getLoggedIn = () => api.get(`/loggedIn/`);
export const forgetPassword = (email) => {
  return api.post(
    `/forget-password/`,
    {
      email: email,
    },
    { withCredentials: true }
  );
};

export const resetPassword = (password, passwordVerify, id, token) => {
  console.log(id);
  console.log(token);
  return api.post(
    `/reset-password/${id}/${token}`,
    {
      password: password,
      passwordVerify: passwordVerify,
    },
    { withCredentials: true }
  );
};

export const loginUser = (email, password) => {
  return api.post(
    `/login/`,
    {
      email: email,
      password: password,
    },
    { withCredentials: true }
  );
};

export const logoutUser = () => api.get(`/logout/`);

export const registerUser = (
  userName,
  firstName,
  lastName,
  email,
  password,
  passwordVerify
) => {
  return api.post(`/register/`, {
    userName: userName,
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    passwordVerify: passwordVerify,
  });
};
export const updateUser = (
  userEmail,
  firstName,
  lastName,
  userName,
  email,
  currentPassword,
  newPassword,
  confirmNewPassword
) => {
  return api.put(`/update/`, {
    userEmail: userEmail,
    userName: userName,
    firstName: firstName,
    lastName: lastName,
    currentPassword: currentPassword,
    email: email,
    newPassword: newPassword,
    confirmNewPassword: confirmNewPassword,
  });
};

const apis = {
  getLoggedIn,
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  forgetPassword,
  resetPassword,
};

export default apis;

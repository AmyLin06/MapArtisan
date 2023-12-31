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
    ? "http://localhost:4000/map"
    : `${process.env.REACT_APP_API_URL}/map` || "http://localhost:4000/map",
});

// THESE ARE ALL THE REQUESTS WE`LL BE MAKING, ALL REQUESTS HAVE A
// REQUEST METHOD (like get) AND PATH (like /register). SOME ALSO
// REQUIRE AN id SO THAT THE SERVER KNOWS ON WHICH LIST TO DO ITS
// WORK, AND SOME REQUIRE DATA, WHICH WE WE WILL FORMAT HERE, FOR WHEN
// WE NEED TO PUT THINGS INTO THE DATABASE OR IF WE HAVE SOME
// CUSTOM FILTERS FOR QUERIES

export const createNewMap = (newMapName, template, userEmail) => {
  return api.post(`/create/`, {
    // SPECIFY THE PAYLOAD
    name: newMapName,
    template: template,
    ownerEmail: userEmail,
  });
};

export const duplicateMap = (mapId, ownerEmail) => {
  return api.post(`/duplicate/`, {
    // SPECIFY THE PAYLOAD
    mapId: mapId,
    ownerEmail: ownerEmail,
  });
};

export const updateMapMetaData = (mapID, field) => {
  return api.put(`/updatemetadata/`, {
    // SPECIFY THE PAYLOAD
    mapID: mapID,
    field: field,
  });
};

export const message = (sender, receiver, field) => {
  return api.post(`/message/`, {
    // SPECIFY THE PAYLOAD
    sender: sender,
    receiver: receiver,
    field: field,
  });
};

export const getUserMaps = (userEmail) => {
  return api.get(`/usermaps/${userEmail}`);
};

export const getProfileMaps = (id) => {
  return api.get(`/profilemaps/${id}`);
};

export const getMapMetaDataById = (mapId) => {
  return api.get(`/mapById/${mapId}`);
};

export const getMapGraphicById = (mapId) => {
  return api.get(`/mapgraphic/${mapId}`);
};

export const updateMapGraphicById = (id, mapgraphic) => {
  return api.put(
    `/updategraphic/${id}`,
    {
      //SPECIFY THE PAYLOAD
      mapgraphic: mapgraphic,
    }
    // {
    //   headers: {
    //     "Content-Type": "application/octet-stream",
    //   },
    // }
  );
};

export const getCommunityMaps = () => {
  return api.get(`/communitymaps`);
};

export const deleteMapById = (mapId) => {
  return api.delete(`/deletemap/${mapId}`);
};

export const isLikedMap = (mapId) => {
  return api.get(`/likedmap/${mapId}`);
};

const apis = {
  createNewMap,
  duplicateMap,
  updateMapMetaData,
  getUserMaps,
  getMapMetaDataById,
  updateMapGraphicById,
  getMapGraphicById,
  getCommunityMaps,
  deleteMapById,
  getProfileMaps,
  message,
  isLikedMap,
};

export default apis;

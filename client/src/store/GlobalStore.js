import { createContext, useState, useContext } from "react";
import api from "./store-request-api";
import AuthContext from "../auth";
import EditMapContext from "./EditMapStore";
import { useNavigate } from "react-router-dom";
import { ref, deleteObject, listAll } from "firebase/storage";
import storage from "../firebaseConfig";

export const GlobalStoreContext = createContext({});

export const GlobalStoreActionType = {
  HIDE_MODALS: "HIDE_MODALS",
  CLEAR_STORE: "CLEAR_STORE",
  CREATE_NEW_MAP: "CREATE_NEW_MAP",
  LOAD_HOME_MAPS: "LOAD_HOME_MAPS",
  LOAD_COMMUNITY_MAPS: "LOAD_COMMUNITY_MAPS",
  MARK_MAP_FOR_DELETION: "MARK_MAP_FOR_DELETION",
  SHOW_RENAME_MODAL: "SHOW_RENAME_MODAL",
  SHOW_MESSAGE_MODAL: "SHOW_MESSAGE_MODAL",
  SET_CURRENT_MAP: "SET_CURRENT_MAP",
  LOAD_PROFILE_MAPS: "LOAD_PROFILE_MAPS",
  MESSAGE: "MESSAGE",
};

const CurrentModal = {
  NONE: "NONE",
  DELETE_MAP: "DELETE_MAP",
  RENAME_MAP: "RENAME_MAP",
  MESSAGE_MODAL: "MESSAGE_MODAL",
  MESSAGE_SUCCESS: "MESSAGE_SUCCESS",
  GUEST_LIKE_MAP: "GUEST_LIKE_MAP",
  ERROR: "ERROR",
};

function GlobalStoreContextProvider(props) {
  const { auth } = useContext(AuthContext);
  const { editStore } = useContext(EditMapContext);
  const navigate = useNavigate();

  const [store, setStore] = useState({
    currentModal: CurrentModal.NONE,
    currentMap: null,
    homeMapList: [],
    communityMapList: [],
    profileMapList: [],
    currentUser: null,
  });

  const storeReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      case GlobalStoreActionType.SHOW_RENAME_MODAL: {
        return setStore({
          currentModal: CurrentModal.RENAME_MAP,
          currentMap: store.currentMap,
          homeMapList: store.homeMapList,
          communityMapList: store.communityMapList,
          profileMapList: store.profileMapList,
          currentUser: store.currentUser,
        });
      }
      case GlobalStoreActionType.SHOW_MESSAGE_MODAL: {
        return setStore({
          currentModal: CurrentModal.MESSAGE_MODAL,
          currentMap: store.currentMap,
          homeMapList: store.homeMapList,
          communityMapList: store.communityMapList,
          profileMapList: store.profileMapList,
          currentUser: store.currentUser,
        });
      }

      case GlobalStoreActionType.SHOW_GUEST_LIKE_MODAL: {
        return setStore({
          currentModal: CurrentModal.GUEST_LIKE_MAP,
          currentMap: store.currentMap,
          homeMapList: store.homeMapList,
          communityMapList: store.communityMapList,
          profileMapList: store.profileMapList,
          currentUser: store.currentUser,
        });
      }
      case GlobalStoreActionType.MARK_MAP_FOR_DELETION: {
        return setStore({
          currentModal: CurrentModal.DELETE_MAP,
          currentMap: store.currentMap,
          homeMapList: store.homeMapList,
          communityMapList: store.communityMapList,
          profileMapList: store.profileMapList,
          currentUser: store.currentUser,
        });
      }
      case GlobalStoreActionType.HIDE_MODALS: {
        return setStore({
          currentModal: CurrentModal.NONE,
          currentMap: store.currentMap,
          homeMapList: store.homeMapList,
          communityMapList: store.communityMapList,
          profileMapList: store.profileMapList,
          currentUser: store.currentUser,
        });
      }
      case GlobalStoreActionType.CREATE_NEW_MAP: {
        return setStore({
          currentModal: CurrentModal.NONE,
          currentMap: payload,
          homeMapList: store.homeMapList,
          communityMapList: store.communityMapList,
          profileMapList: store.profileMapList,
          currentUser: store.currentUser,
        });
      }
      case GlobalStoreActionType.LOAD_HOME_MAPS: {
        return setStore({
          currentModal: CurrentModal.NONE,
          currentMap: store.currentMap,
          homeMapList: payload,
          communityMapList: store.communityMapList,
          profileMapList: store.profileMapList,
          currentUser: store.currentUser,
        });
      }
      case GlobalStoreActionType.LOAD_COMMUNITY_MAPS: {
        return setStore({
          currentModal: CurrentModal.NONE,
          currentMap: store.currentMap,
          homeMapList: store.homeMapList,
          communityMapList: payload,
          profileMapList: store.profileMapList,
          currentUser: store.currentUser,
        });
      }
      case GlobalStoreActionType.SET_CURRENT_MAP: {
        return setStore({
          currentModal: CurrentModal.NONE,
          currentMap: payload,
          homeMapList: store.homeMapList,
          communityMapList: store.communityMapList,
          profileMapList: store.profileMapList,
          currentUser: store.currentUser,
        });
      }
      case GlobalStoreActionType.LOAD_PROFILE_MAPS: {
        console.log(payload.currentUser);
        return setStore({
          currentModal: store.currentModal,
          currentMap: store.currentMap,
          homeMapList: store.homeMapList,
          communityMapList: store.communityMapList,
          profileMapList: payload.profileMapList,
          currentUser: payload.currentUser,
        });
      }
      case GlobalStoreActionType.MESSAGE: {
        return setStore({
          currentModal: payload.currentModal,
          currentMap: store.currentMap,
          homeMapList: store.homeMapList,
          communityMapList: store.communityMapList,
          profileMapList: store.profileMapList,
          currentUser: store.currentUser,
        });
      }
      case GlobalStoreActionType.CLEAR_STORE: {
        return setStore({
          currentModal: CurrentModal.NONE,
          currentMap: null,
          homeMapList: store.homeMapList,
          communityMapList: store.communityMapList,
          profileMapList: store.profileMapList,
          currentUser: store.currentUser,
        });
      }
      default:
        return store;
    }
  };

  // This should display the modal that allows the user to enter a new map name
  store.showEditMapNameModal = () => {
    storeReducer({
      type: GlobalStoreActionType.SHOW_RENAME_MODAL,
    });
  };

  store.showMessageModal = () => {
    storeReducer({
      type: GlobalStoreActionType.SHOW_MESSAGE_MODAL,
    });
  };

  store.showDeleteMapModal = () => {
    storeReducer({
      type: GlobalStoreActionType.MARK_MAP_FOR_DELETION,
    });
  };

  store.showGuestLikeModal = () => {
    storeReducer({
      type: GlobalStoreActionType.SHOW_GUEST_LIKE_MODAL,
    });
  };

  store.hideModals = () => {
    storeReducer({
      type: GlobalStoreActionType.HIDE_MODALS,
    });
  };

  store.createNewMap = function (template) {
    async function createMap(template) {
      console.log(template);
      let mapName = "Untitled";
      const response = await api.createNewMap(
        mapName,
        template,
        auth.user.email
      );
      if (response.status === 201) {
        // tps.clearAllTransactions();
        let newMap = response.data.map;
        console.log(newMap);

        editStore.setMap(response.data.map);
        storeReducer({
          type: GlobalStoreActionType.CREATE_NEW_MAP,
          payload: newMap,
        });
        // IF IT'S A VALID MAP THEN LET'S START EDITING IT
        // store.getHomeMapMetaData();
      } else console.log("API FAILED TO CREATE A NEW MAP");
    }
    createMap(template);
  };

  store.getHomeMapMetaData = async function () {
    const response = await api.getUserMaps(auth.user?.email);
    if (response.status === 201) {
      // tps.clearAllTransactions();
      storeReducer({
        type: GlobalStoreActionType.LOAD_HOME_MAPS,
        payload: response.data.maps,
      });
    } else console.log("API FAILED TO LOAD HOME MAPS");
  };

  store.getProfileMapMetaData = async function (id) {
    const response = await api.getProfileMaps(id);
    if (response.status === 201) {
      console.log(response.data.currentUser);
      // tps.clearAllTransactions();
      storeReducer({
        type: GlobalStoreActionType.LOAD_PROFILE_MAPS,
        payload: {
          currentUser: response.data.currentUser,
          profileMapList: response.data.profileMapList,
        },
      });
    } else console.log("API FAILED TO LOAD PROFILE MAPS");
  };

  store.getCommunityMapMetaData = async function () {
    const response = await api.getCommunityMaps();
    if (response.status === 201) {
      // tps.clearAllTransactions();
      storeReducer({
        type: GlobalStoreActionType.LOAD_COMMUNITY_MAPS,
        payload: response.data.maps,
      });
    } else console.log("API FAILED TO LOAD COMMUNITY MAPS");
  };

  store.getMapMetaDataById = async function (mapId) {
    const response = await api.getMapMetaDataById(mapId);
    if (response.status === 201) {
      // tps.clearAllTransactions();
      let newMapMetaData = response.data.map;
      storeReducer({
        type: GlobalStoreActionType.SET_CURRENT_MAP,
        payload: newMapMetaData,
      });
      return newMapMetaData;
    } else console.log("API FAILED TO GET AND SET MAP");
  };

  store.message = async function (message) {
    const updatingField = {
      message: message,
    };
    const response = await api.message(
      auth.user.email,
      store.currentUser.email,
      updatingField
    );
    console.log("message response: " + response.data);
    if (response.status === 200) {
      // tps.clearAllTransactions();
      storeReducer({
        type: GlobalStoreActionType.MESSAGE,
        payload: { currentModal: CurrentModal.MESSAGE_SUCCESS },
      });
    } else {
      console.log("API FAILED TO RENAME MAP");
    }
  };

  store.renameMap = async function (newMapName) {
    // store.currentMap.mapTitle = newMapName;
    const updatingField = {
      mapTitle: newMapName,
    };
    const response = await api.updateMapMetaData(
      store.currentMap._id,
      updatingField
    );
    console.log("renameMap response: " + response.data);
    if (response.status === 201) {
      // tps.clearAllTransactions();
      let newMapMetaData = response.data.map;
      storeReducer({
        type: GlobalStoreActionType.SET_CURRENT_MAP,
        payload: newMapMetaData,
      });
      console.log(newMapMetaData);
      // store.getHomeMapMetaData();
    } else console.log("API FAILED TO RENAME MAP");
  };

  store.likeMap = async function (editStore) {
    console.log("in like map");
    console.log(auth.user);
    const updatingField = {
      userLiked: [auth.user.id],
    };

    const response = await api.updateMapMetaData(
      store.currentMap._id,
      updatingField
    );
    console.log("renameMap response: " + response.data);
    if (response.status === 201) {
      // tps.clearAllTransactions();
      let newMapMetaData = response.data.map;
      console.log(newMapMetaData);
      storeReducer({
        type: GlobalStoreActionType.SET_CURRENT_MAP,
        payload: newMapMetaData,
      });
      editStore.setMap(newMapMetaData);
    } else console.log("API FAILED TO RENAME MAP");
  };

  store.deleteMap = function () {
    async function deleteMap() {
      const directoryRef = ref(
        storage,
        `/geo-json-datas/map-id-${store.currentMap._id}`
      );
      const fileRefs = await listAll(directoryRef);
      await Promise.all(fileRefs.items.map((fileRef) => deleteObject(fileRef)));

      let response = await api.deleteMapById(store.currentMap._id);
      if (response.status === 200) {
        storeReducer({
          type: GlobalStoreActionType.SET_CURRENT_MAP,
          payload: null,
        });
        // store.getHomeMapMetaData();
      } else {
        console.log("Map failed to delete");
      }
    }
    deleteMap();
  };

  //this function checks if the user has liked this before before
  store.isLikedMap = async function (mapId) {
    console.log(mapId);
    if (auth.guest) return false;

    const response = await api.isLikedMap(mapId);
    if (response.status === 201) {
      return response.data.isLiked;
    } else console.log("Failed to check if map has been already liked");
  };

  store.duplicateMap = async function (mapId) {
    const response = await api.duplicateMap(mapId, auth.user.email);
    if (response.status === 201) {
      // tps.clearAllTransactions();
      let newMap = response.data.map;
      storeReducer({
        type: GlobalStoreActionType.SET_CURRENT_MAP,
        payload: newMap,
      });
      editStore.setMap(response.data.map);
      // IF IT'S A VALID MAP THEN LET'S START EDITING IT
      navigate("/edit");
    } else console.log("Failed to duplicate map");
  };

  store.closeMap = () => {
    storeReducer({
      type: GlobalStoreActionType.SET_CURRENT_MAP,
      payload: null,
    });
  };

  return (
    <GlobalStoreContext.Provider
      value={{
        store,
      }}
    >
      {props.children}
    </GlobalStoreContext.Provider>
  );
}
export default GlobalStoreContext;
export { GlobalStoreContextProvider };

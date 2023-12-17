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
  SET_CURRENT_MAP: "SET_CURRENT_MAP",
};

const CurrentModal = {
  NONE: "NONE",
  DELETE_MAP: "DELETE_MAP",
  RENAME_MAP: "RENAME_MAP",
  MESSAGE_MODAL: "MESSAGE_MODAL",
  MESSAGE_SUCCESS: "MESSAGE_SUCCESS",
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
        });
      }
      case GlobalStoreActionType.MARK_MAP_FOR_DELETION: {
        return setStore({
          currentModal: CurrentModal.DELETE_MAP,
          currentMap: store.currentMap,
          homeMapList: store.homeMapList,
          communityMapList: store.communityMapList,
        });
      }
      case GlobalStoreActionType.HIDE_MODALS: {
        return setStore({
          currentModal: CurrentModal.NONE,
          currentMap: null,
          homeMapList: store.homeMapList,
          communityMapList: store.communityMapList,
        });
      }
      case GlobalStoreActionType.CREATE_NEW_MAP: {
        return setStore({
          currentModal: CurrentModal.NONE,
          currentMap: payload,
          homeMapList: store.homeMapList,
          communityMapList: store.communityMapList,
        });
      }
      case GlobalStoreActionType.LOAD_HOME_MAPS: {
        return setStore({
          currentModal: CurrentModal.NONE,
          currentMap: store.currentMap,
          homeMapList: payload,
          communityMapList: store.communityMapList,
        });
      }
      case GlobalStoreActionType.LOAD_COMMUNITY_MAPS: {
        return setStore({
          currentModal: CurrentModal.NONE,
          currentMap: store.currentMap,
          homeMapList: store.homeMapList,
          communityMapList: payload,
        });
      }
      case GlobalStoreActionType.SET_CURRENT_MAP: {
        return setStore({
          currentModal: CurrentModal.NONE,
          currentMap: payload,
          homeMapList: store.homeMapList,
          communityMapList: store.communityMapList,
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

  store.showDeleteMapModal = () => {
    storeReducer({
      type: GlobalStoreActionType.MARK_MAP_FOR_DELETION,
    });
  };

  store.hideModals = () => {
    storeReducer({
      type: GlobalStoreActionType.HIDE_MODALS,
      payload: {},
    });
  };

  store.createNewMap = async function () {
    let mapName = "Untitled";
    const response = await api.createNewMap(mapName, null, auth.user.email);
    if (response.status === 201) {
      // tps.clearAllTransactions();
      let newMap = response.data.map;
      storeReducer({
        type: GlobalStoreActionType.CREATE_NEW_MAP,
        payload: newMap,
      });
      editStore.setMap(response.data.map);
      // IF IT'S A VALID MAP THEN LET'S START EDITING IT
      navigate("/edit");
      store.getHomeMapMetaData();
    } else console.log("API FAILED TO CREATE A NEW MAP");
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

  store.renameMap = async function (newMapName) {
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
        type: GlobalStoreActionType.UPDATE_MAP_META_DATA,
        payload: newMapMetaData,
      });
      store.getHomeMapMetaData();
    } else console.log("API FAILED TO RENAME MAP");
  };

  store.likeMap = async function () {};

  store.deleteMap = async function () {
    const directoryRef = ref(
      storage,
      `/geo-json-datas/map-id-${store.currentMap._id}`
    );
    const fileRefs = await listAll(directoryRef);
    await Promise.all(fileRefs.items.map((fileRef) => deleteObject(fileRef)));

    let response = await api.deleteMapById(store.currentMap._id);
    if (response.status === 200) {
      store.getHomeMapMetaData();
    } else {
      console.log("Map failed to delete");
    }
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

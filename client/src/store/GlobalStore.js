import { createContext, useState, useContext } from "react";
import api from "./store-request-api";
import AuthContext from "../auth";
import EditStoreContext from "./EditMapStore";
import { useNavigate } from "react-router-dom";

export const GlobalStoreContext = createContext({});

export const GlobalStoreActionType = {
  HIDE_MODALS: "HIDE_MODALS",
  CLEAR_STORE: "CLEAR_STORE",
  CREATE_NEW_MAP: "CREATE_NEW_MAP",
  LOAD_HOME_MAPS: "LOAD_HOME_MAPS",
  LOAD_COMMUNITY_MAPS: "LOAD_COMMUNITY_MAPS",
  MARK_MAP_FOR_DELETION: "MARK_MAP_FOR_DELETION",
  CHANGE_MAP_NAME: "CHANGE_MAP_NAME",
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
  const { editStore } = useContext(EditStoreContext);
  const navigate = useNavigate();

  const [store, setStore] = useState({
    currentModal: CurrentModal.NONE,
    currentMap: null,
    homeMapLists: [],
    communityMapList: [],
  });

  const storeReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      case GlobalStoreActionType.CHANGE_MAP_NAME: {
        return setStore({
          currentModal: CurrentModal.RENAME_MAP,
          currentMap: payload,
          homeMapLists: store.homeMapLists,
          communityMapList: store.communityMapList,
        });
      }
      case GlobalStoreActionType.MARK_MAP_FOR_DELETION: {
        return setStore({
          currentModal: CurrentModal.DELETE_MAP,
          currentMap: payload,
          homeMapLists: store.homeMapLists,
          communityMapList: store.communityMapList,
        });
      }
      case GlobalStoreActionType.HIDE_MODALS: {
        return setStore({
          currentModal: CurrentModal.NONE,
          currentMap: null,
          homeMapLists: store.homeMapLists,
          communityMapList: store.communityMapList,
        });
      }
      case GlobalStoreActionType.CREATE_NEW_MAP: {
        return setStore({
          currentModal: CurrentModal.NONE,
          currentMap: payload,
          homeMapLists: store.homeMapLists,
          communityMapList: store.communityMapList,
        });
      }
      default:
        return store;
    }
  };

  // This should display the modal that allows the user to enter a new map name
  store.showEditMapNameModal = (map) => {
    storeReducer({
      type: GlobalStoreActionType.CHANGE_MAP_NAME,
      payload: { map },
    });
  };

  store.showDeleteMapModal = (map) => {
    storeReducer({
      type: GlobalStoreActionType.MARK_MAP_FOR_DELETION,
      payload: { map },
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
    console.log("createNewMap response: " + response);
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
    } else console.log("API FAILED TO CREATE A NEW MAP");
  };
  // };
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

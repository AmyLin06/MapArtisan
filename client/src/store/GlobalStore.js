import { createContext, useState } from "react";

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
  // const { auth } = useContext(AuthContext);

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

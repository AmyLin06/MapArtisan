import { createContext, useState } from "react";
// import AuthContext from "../auth";
import { useNavigate } from "react-router-dom";
import api from "./store-request-api";

export const EditStoreContext = createContext({});

export const EditStoreActionType = {
  CLOSE_CURRENT_MAP: "CLOSE_CURRENT_MAP",
  SET_CURRENT_MAP: "SET_CURRENT_MAP",
  SET_MAP_NAME_EDIT_ACTIVE: "SET_MAP_NAME_EDIT_ACTIVE",
  UPDATE_MAP: "UPDATE_MAP",
  REMOVE_MAP: "REMOVE_MAP",
  HIDE_MODALS: "HIDE_MODALS",
  PUBLISH_MAP: "PUBLISH_MAP",
  MARK_MAP_FOR_PUBLISH: "MARK_MAP_FOR_PUBLISH",
};

const CurrentModal = {
  NONE: "NONE",
  DELETE_LAYER: "DELETE_LAYER",
  PUBLISH_MAP: "PUBLISH_MAP",
  PUBLISH_SUCCESS: "PUBLISH_SUCCESS",
  RENAME_MAP: "RENAME_MAP",
  ERROR: "ERROR",
};

function EditStoreContextProvider(props) {
  // const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [editStore, setEditStore] = useState({
    currentModal: CurrentModal.NONE,
    currentMap: null,
    currentMapIndex: -1,
  });

  const editStoreReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      case EditStoreActionType.SET_MAP_NAME_EDIT_ACTIVE: {
        return setEditStore({
          currentModal: CurrentModal.RENAME_MAP,
          currentMap: editStore.currentMap,
          currentMapIndex: editStore.currentMapIndex,
        });
      }
      case EditStoreActionType.HIDE_MODALS: {
        return setEditStore({
          currentModal: CurrentModal.NONE,
          currentMap: editStore.currentMap,
          currentMapIndex: editStore.currentMapIndex,
        });
      }
      case EditStoreActionType.MARK_MAP_FOR_PUBLISH: {
        return setEditStore({
          currentModal: CurrentModal.PUBLISH_MAP,
          currentMap: editStore.currentMap,
          currentMapIndex: editStore.currentMapIndex,
        });
      }
      case EditStoreActionType.UPDATE_MAP: {
        return setEditStore({
          currentModal: CurrentModal.NONE,
          currentMap: payload,
          currentMapIndex: editStore.currentMapIndex,
        });
      }
      case EditStoreActionType.SET_CURRENT_MAP: {
        return setEditStore({
          currentModal: CurrentModal.NONE,
          currentMap: payload,
          currentMapIndex: editStore.currentMapIndex,
        });
      }
      default:
        return editStore;
    }
  };

  // This should display the modal that allows the user to enter a new map name
  editStore.showEditMapNameModal = () => {
    editStoreReducer({
      type: EditStoreActionType.CHANGE_MAP_NAME,
      // payload: { map },
    });
  };

  editStore.showPublishMapModal = () => {
    editStoreReducer({
      type: EditStoreActionType.MARK_MAP_FOR_PUBLISH,
      // payload: { map },
    });
  };

  editStore.hideModals = () => {
    editStoreReducer({
      type: EditStoreActionType.HIDE_MODALS,
      // payload: {},
    });
  };

  editStore.setMap = (map) => {
    editStoreReducer({
      type: EditStoreActionType.SET_CURRENT_MAP,
      payload: { map },
    });
  };

  editStore.publishMap = async function () {
    const updatingField = {
      isPublished: true,
      publishedDate: new Date(),
    };
    const response = await api.updateMapMetaData(
      editStore.currentMap.map._id,
      updatingField
    );
    console.log("publishMap response: " + response);
    if (response.status === 201) {
      // tps.clearAllTransactions();
      let newMap = response.data.map;
      editStoreReducer({
        type: EditStoreActionType.UPDATE_MAP,
        payload: newMap,
      });
      navigate("/map-details");
    } else console.log("API FAILED TO PUBLISH MAP");
  };

  return (
    <EditStoreContext.Provider
      value={{
        editStore,
      }}
    >
      {props.children}
    </EditStoreContext.Provider>
  );
}

export default EditStoreContext;
export { EditStoreContextProvider };

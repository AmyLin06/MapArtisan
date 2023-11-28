import { createContext, useContext, useState } from "react";
import fakeMap from "../assets/currentMap.json";

export const EditMapContext = createContext({});

export const EditMapStoreActionType = {
  CLOSE_CURRENT_MAP: "CLOSE_CURRENT_MAP",
  SET_CURRENT_MAP: "SET_CURRENT_MAP",
  SET_MAP_NAME_EDIT_ACTIVE: "SET_MAP_NAME_EDIT_ACTIVE",
  UPDATE_MAP: "UPDATE_MAP",
  SAVE_MAP: "SAVE_MAP",
  REMOVE_MAP: "REMOVE_MAP",
  HIDE_MODALS: "HIDE_MODALS",
};

const CurrentModal = {
  NONE: "NONE",
  DELETE_LAYER: "DELETE_LAYER",
  PUBLISH_MAP: "PUBLISH_MAP",
  PUBLISH_SUCCESS: "PUBLISH_SUCCESS",
  ERROR: "ERROR",
};

function EditMapContextProvider(props) {
  const [editStore, setEditStore] = useState({
    currentModal: CurrentModal.NONE,
    currentMap: fakeMap,
    currentMapIndex: -1,
  });

  const storeReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      case EditMapStoreActionType.UPDATE_MAP: {
        return setEditStore({
          currentModel: editStore.currentModal,
          currentMap: editStore.currentMap,
          currentMapIndex: editStore.currentMapIndex,
        });
      }
      default:
        return editStore;
    }
  };

  //add a layer to the current map
  editStore.addLayer = (data, type) => {
    let map = editStore.currentMap;
    let newLayer = { layerName: `${type}`, layerType: type, data: data };
    console.log("layer: ", newLayer);
    map.layers.push(newLayer);
    storeReducer({
      type: EditMapStoreActionType.UPDATE_MAP,
      payload: {},
    });
  };

  return (
    <EditMapContext.Provider
      value={{
        editStore,
      }}
    >
      {props.children}
    </EditMapContext.Provider>
  );
}

export default EditMapContext;
export { EditMapContextProvider };

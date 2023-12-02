import { createContext, useState } from "react";
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

const LeafletTool = {
  SCROLL: "SCROLL",
  MARKER: "MARKER",
  BORDER: "BORDER",
  FILLIN: "FILLIN",
};

function EditMapContextProvider(props) {
  const [editStore, setEditStore] = useState({
    currentModal: CurrentModal.NONE,
    currentMap: fakeMap,
    currentMapIndex: -1,
    activeTool: { tool: LeafletTool.SCROLL, detail: "NONE" },
  });

  const storeReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      case EditMapStoreActionType.UPDATE_MAP: {
        return setEditStore({
          currentModel: editStore.currentModal,
          currentMap: editStore.currentMap,
          currentMapIndex: editStore.currentMapIndex,
          activeTool: editStore.activeTool,
        });
      }
      default:
        return editStore;
    }
  };

  //add a layer to the current map
  editStore.addLayer = (name, data, type) => {
    let map = editStore.currentMap;
    let newLayer = { layerName: name, layerType: type, data: data };
    map.layers.push(newLayer);
    storeReducer({
      type: EditMapStoreActionType.UPDATE_MAP,
      payload: {},
    });
  };

  //add a marker coordinate to the current map
  editStore.addMarker = (coord) => {
    let map = editStore.currentMap;
    map.markerCoords.push(coord);
  };

  //set the current selected marker
  editStore.setActiveMarker = (key) => {
    editStore.activeTool = { tool: LeafletTool.MARKER, detail: key };
    storeReducer({
      type: EditMapStoreActionType.UPDATE_MAP,
      payload: {},
    });
  };

  //set the current leaflet tool to scrolling
  editStore.setScrolling = () => {
    editStore.activeTool = { tool: LeafletTool.SCROLL, detail: "NONE" };
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

import { createContext, useState } from "react";
// import AuthContext from "../auth";
import { useNavigate } from "react-router-dom";
import api from "./store-request-api";
import fakeMap from "../assets/currentMap.json";

export const EditMapContext = createContext({});

export const EditMapActionType = {
  CLOSE_CURRENT_MAP: "CLOSE_CURRENT_MAP",
  SET_CURRENT_MAP: "SET_CURRENT_MAP",
  SET_MAP_NAME_EDIT_ACTIVE: "SET_MAP_NAME_EDIT_ACTIVE",
  UPDATE_MAP_GRAPHIC: "UPDATE_MAP_GRAPHIC",
  UPDATE_MAP_META_DATA: "UPDATE_MAP_META_DATA",
  SAVE_MAP: "SAVE_MAP",
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

const LeafletTool = {
  SCROLL: "SCROLL",
  MARKER: "MARKER",
  BORDER: "BORDER",
  FILLIN: "FILLIN",
};

function EditMapContextProvider(props) {
  // const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [editStore, setEditStore] = useState({
    currentModal: CurrentModal.NONE,
    currentMapMetaData: null,
    currentMapGraphic: null,
    currentMapIndex: -1,
    activeTool: { tool: LeafletTool.SCROLL, detail: "NONE" },
  });

  const storeReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      case EditMapActionType.UPDATE_MAP_GRAPHIC: {
        return setEditStore({
          currentModel: editStore.currentModal,
          currentMapMetaData: editStore.currentMapMetaData,
          currentMapGraphic: editStore.currentMapGraphic,
          currentMapIndex: editStore.currentMapIndex,
          activeTool: editStore.activeTool,
        });
      }
      case EditMapActionType.SET_MAP_NAME_EDIT_ACTIVE: {
        return setEditStore({
          currentModal: CurrentModal.RENAME_MAP,
          currentMapMetaData: editStore.currentMapMetaData,
          currentMapGraphic: editStore.currentMapGraphic,
          currentMapIndex: editStore.currentMapIndex,
          activeTool: editStore.activeTool,
        });
      }
      case EditMapActionType.HIDE_MODALS: {
        return setEditStore({
          currentModal: CurrentModal.NONE,
          currentMapMetaData: editStore.currentMapMetaData,
          currentMapGraphic: editStore.currentMapGraphic,
          currentMapIndex: editStore.currentMapIndex,
          activeTool: editStore.activeTool,
        });
      }
      case EditMapActionType.MARK_MAP_FOR_PUBLISH: {
        return setEditStore({
          currentModal: CurrentModal.PUBLISH_MAP,
          currentMapMetaData: editStore.currentMapMetaData,
          currentMapGraphic: editStore.currentMapGraphic,
          currentMapIndex: editStore.currentMapIndex,
          activeTool: editStore.activeTool,
        });
      }
      case EditMapActionType.SET_CURRENT_MAP: {
        return setEditStore({
          currentModal: CurrentModal.NONE,
          currentMapMetaData: payload.mapMetaData,
          currentMapGraphic: payload.mapGraphic,
          currentMapIndex: editStore.currentMapIndex,
          activeTool: editStore.activeTool,
        });
      }
      case EditMapActionType.CLOSE_CURRENT_MAP: {
        return setEditStore({
          currentModal: CurrentModal.NONE,
          currentMapMetaData: null,
          currentMapGraphic: null,
          currentMapIndex: -1,
          activeTool: { tool: LeafletTool.SCROLL, detail: "NONE" },
        });
      }
      default:
        return editStore;
    }
  };

  //add a layer to the current map
  editStore.addLayer = (name, data, type) => {
    let mapGraphic = editStore.currentMapGraphic;
    console.log(mapGraphic.layers);
    let newLayer = { layerName: name, layerType: type, data: data };
    mapGraphic.layers.push(newLayer);
    console.log(mapGraphic.layers);
    storeReducer({
      type: EditMapActionType.UPDATE_MAP_GRAPHIC,
      payload: {},
    });
  };

  //add a marker coordinate to the current map
  editStore.addMarker = (coord) => {
    let mapGraphic = editStore.currentMapGraphic;
    mapGraphic.markers.push(coord);
    storeReducer({
      type: EditMapActionType.UPDATE_MAP_GRAPHIC,
      payload: {},
    });
  };

  //set the current selected marker
  editStore.setActiveMarker = (key) => {
    editStore.activeTool = { tool: LeafletTool.MARKER, detail: key };
    storeReducer({
      type: EditMapActionType.UPDATE_MAP_GRAPHIC,
      payload: {},
    });
  };

  //set the current leaflet tool to scrolling
  editStore.setScrolling = () => {
    editStore.activeTool = { tool: LeafletTool.SCROLL, detail: "NONE" };
    storeReducer({
      type: EditMapActionType.UPDATE_MAP_GRAPHIC,
      payload: {},
    });
  };

  // This should display the modal that allows the user to enter a new map name
  editStore.showEditMapNameModal = () => {
    storeReducer({
      type: EditMapActionType.CHANGE_MAP_NAME,
      // payload: { map },
    });
  };

  editStore.showPublishMapModal = () => {
    storeReducer({
      type: EditMapActionType.MARK_MAP_FOR_PUBLISH,
      // payload: { map },
    });
  };

  editStore.hideModals = () => {
    storeReducer({
      type: EditMapActionType.HIDE_MODALS,
      // payload: {},
    });
  };

  //when clicking on a private map, set the map to the current active map in the edit store
  editStore.setMap = (mapMetaData) => {
    const mapGraphic = {
      mapID: 12345,
      layers: [],
      markers: [],
    };
    storeReducer({
      type: EditMapActionType.SET_CURRENT_MAP,
      payload: { mapMetaData, mapGraphic },
    });
  };

  editStore.closeMap = () => {
    storeReducer({
      type: EditMapActionType.CLOSE_CURRENT_MAP,
      // payload: {},
    });
  };

  editStore.publishMap = async function () {
    const updatingField = {
      isPublished: true,
      publishedDate: new Date(),
    };
    const response = await api.updateMapMetaData(
      editStore.currentMapMetaData._id,
      updatingField
    );
    console.log("publishMap response: " + response.data);
    if (response.status === 201) {
      // tps.clearAllTransactions();
      let newMapMetaData = response.data.map;
      storeReducer({
        type: EditMapActionType.UPDATE_MAP_META_DATA,
        payload: newMapMetaData,
      });
      navigate("/map-details");
    } else console.log("API FAILED TO PUBLISH MAP");
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

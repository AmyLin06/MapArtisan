import { createContext, useState } from "react";
import api from "./store-request-api";

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
  UPDATE_MAP_COLOR: "UPDATE_MAP_COLOR",
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
      case EditMapActionType.UPDATE_MAP_COLOR: {
        console.log("inside case: ", payload);
        return setEditStore({
          currentModel: editStore.currentModal,
          currentMapMetaData: editStore.currentMapMetaData,
          currentMapGraphic: editStore.currentMapGraphic,
          currentMapIndex: editStore.currentMapIndex,
          activeTool: payload,
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
  editStore.addLayer = (filename, url) => {
    let mapGraphic = editStore.currentMapGraphic;
    const newLayer = {
      filename: filename,
      fileRef: url,
      polygonColorStyle: [],
    };
    mapGraphic.layers.push(newLayer);
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

  editStore.setActiveBorder = (color) => {
    editStore.activeTool.tool = LeafletTool.BORDER;
    editStore.activeTool.detail = color;
    storeReducer({
      type: EditMapActionType.UPDATE_MAP_COLOR,
      payload: editStore.activeTool,
    });
  };

  editStore.setActiveFillin = (color) => {
    editStore.activeTool.tool = LeafletTool.FILLIN;
    editStore.activeTool.detail = color;

    storeReducer({
      type: EditMapActionType.UPDATE_MAP_COLOR,
      payload: editStore.activeTool,
    });
  };

  editStore.polygonOnclick = (layer) => {
    const activeTool = editStore.activeTool;
    if (activeTool.tool === "BORDER") {
      editStore.colorBorder(layer, activeTool.detail.hex);
    }
    if (activeTool.tool === "FILLIN") {
      editStore.colorPolygon(layer, activeTool.detail.hex);
    }
  };

  // Setting the border color of a selected polygon
  editStore.colorBorder = (currLayer, currColor) => {
    const targetLayer = editStore.currentMapGraphic.layers.find(
      (layer) => layer.fileRef === currLayer.fileRef
    );
    const polygonList = targetLayer.polygonColorStyle;
    let index = null;
    for (let i = 0; i < polygonList.length; i++) {
      if (polygonList[i].layerKey === currLayer.uniqueKey) {
        index = i;
        break;
      }
    }
    if (index == null) {
      polygonList.push({
        layerKey: currLayer.uniqueKey,
        color: "#3388ff",
        border: currColor,
      });
      currLayer.setStyle({
        color: currColor,
        fillColor: "#3388ff",
      });
    } else {
      polygonList[index].border = currColor;
      currLayer.setStyle({
        color: polygonList[index].border,
        fillColor: polygonList[index].color,
      });
    }
  };

  // Coloring in a selected polygon
  editStore.colorPolygon = (currLayer, currColor) => {
    const targetLayer = editStore.currentMapGraphic.layers.find(
      (layer) => layer.fileRef === currLayer.fileRef
    );
    const polygonList = targetLayer.polygonColorStyle;
    let index = null;
    for (let i = 0; i < polygonList.length; i++) {
      if (polygonList[i].layerKey === currLayer.uniqueKey) {
        index = i;
        break;
      }
    }
    console.log(index);
    if (index == null) {
      currLayer.setStyle({
        fillColor: currColor,
      });
      polygonList.push({
        layerKey: currLayer.uniqueKey,
        color: currColor,
        border: "#3388ff",
      });
    } else {
      polygonList[index].color = currColor;
      currLayer.setStyle({
        fillColor: polygonList[index].color,
      });
    }
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
  editStore.setMap = async function (mapMetaData) {
    const response = await api.getMapGraphicById(mapMetaData._id);
    if (response.status === 200) {
      const mapGraphic = response.data.mapgraphic;
      storeReducer({
        type: EditMapActionType.SET_CURRENT_MAP,
        payload: { mapMetaData, mapGraphic },
      });
    } else {
      console.log(response.errorMessage);
    }
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
      console.log("updated map info:", newMapMetaData);
      let currentMapGraphic = editStore.currentMapGraphic;

      storeReducer({
        type: EditMapActionType.SET_CURRENT_MAP,
        payload: { newMapMetaData, currentMapGraphic },
      });
      // navigate(`/map-details/${newMapMetaData._id}`);
    } else console.log("API FAILED TO PUBLISH MAP");
  };

  editStore.saveGraphic = async function () {
    const graphics = editStore.currentMapGraphic;
    console.log(graphics.layers);
    const response = await api.updateMapGraphicById(
      editStore.currentMapGraphic._id,
      graphics
    );

    if (response.status === 200) {
      console.log(response.data.message);
    } else console.log("Failed to save map graphics");
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

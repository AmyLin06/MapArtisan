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
  SHOW_GUEST_MODAL: "SHOW_GUEST_MODAL",
  CREATE_CHOROPLETH_MAP: "CREATE_CHOROPLETH_MAP",
  UPDATE_CHOROPLETH_MAP: "UPDATE_CHOROPLETH_MAP",
  CREATE_ROUTING_MAP: "CREATE_ROUTING_MAP",
};

const CurrentModal = {
  NONE: "NONE",
  DELETE_LAYER: "DELETE_LAYER",
  PUBLISH_MAP: "PUBLISH_MAP",
  PUBLISH_SUCCESS: "PUBLISH_SUCCESS",
  RENAME_MAP: "RENAME_MAP",
  GUEST_SAVE_MAP: "GUEST_SAVE_MAP",
  GUEST_RENAME_MAP: "GUEST_RENAME_MAP",
  GUEST_PUBLISH_MAP: "GUEST_PUBLISH_MAP",
  ERROR: "ERROR",
  CREATE_CHOROPLETH_FORM: "CREATE_CHOROPLETH_FORM",
  CREATE_ROUTING_FORM: "CREATE_ROUTING_FORM",
};

const LeafletTool = {
  SCROLL: "SCROLL",
  MARKER: "MARKER",
  BORDER: "BORDER",
  FILLIN: "FILLIN",
};

const Templates = {
  CHOROPLETH: "CHOROPLETH",
  ROUTING: "ROUTING",
};

function EditMapContextProvider(props) {
  const [editStore, setEditStore] = useState({
    currentModal: CurrentModal.NONE,
    currentMapMetaData: null,
    currentMapGraphic: null,
    currentMapIndex: -1,
    activeTool: { tool: LeafletTool.SCROLL, detail: "NONE" },
    currentTemplate: null,
    templateData: [],
  });

  const storeReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      case EditMapActionType.UPDATE_MAP_GRAPHIC: {
        return setEditStore({
          currentModal: editStore.currentModal,
          currentMapMetaData: editStore.currentMapMetaData,
          currentMapGraphic: payload,
          currentMapIndex: editStore.currentMapIndex,
          currentcoloredPolygon: editStore.currentcoloredPolygon,
          currentTemplate: editStore.currentTemplate,
          activeTool: editStore.activeTool,
        });
      }
      case EditMapActionType.CREATE_CHOROPLETH_MAP: {
        console.log("creating a template");
        return setEditStore({
          currentModal: CurrentModal.CREATE_CHOROPLETH_FORM,
          currentMapMetaData: editStore.currentMapMetaData,
          currentMapGraphic: editStore.currentMapGraphic,
          currentMapIndex: editStore.currentMapIndex,
          currentcoloredPolygon: editStore.currentcoloredPolygon,
          currentTemplate: Templates.CHOROPLETH,
          activeTool: editStore.activeTool,
          templateData: editStore.templateData,
        });
      }
      case EditMapActionType.UPDATE_CHOROPLETH_MAP: {
        return setEditStore({
          currentModal: editStore.currentModal,
          currentMapMetaData: editStore.currentMapMetaData,
          currentMapGraphic: editStore.currentMapGraphic,
          currentMapIndex: editStore.currentMapIndex,
          currentcoloredPolygon: editStore.currentcoloredPolygon,
          currentTemplate: editStore.currentTemplate,
          activeTool: editStore.activeTool,
          templateData: payload.templateData,
        });
      }
      case EditMapActionType.CREATE_ROUTING_MAP: {
        console.log("creating a template");
        return setEditStore({
          currentModal: CurrentModal.CREATE_ROUTING_FORM,
          currentMapMetaData: editStore.currentMapMetaData,
          currentMapGraphic: editStore.currentMapGraphic,
          currentMapIndex: editStore.currentMapIndex,
          currentcoloredPolygon: editStore.currentcoloredPolygon,
          currentTemplate: Templates.ROUTING,
          activeTool: editStore.activeTool,
          templateData: editStore.templateData,
        });
      }
      case EditMapActionType.CREATE_CHOROPLETH_MAP: {
        console.log("creating a template");
        return setEditStore({
          currentModal: CurrentModal.CREATE_CHOROPLETH_FORM,
          currentMapMetaData: editStore.currentMapMetaData,
          currentMapGraphic: editStore.currentMapGraphic,
          currentMapIndex: editStore.currentMapIndex,
          currentcoloredPolygon: editStore.currentcoloredPolygon,
          currentTemplate: Templates.CHOROPLETH,
          activeTool: editStore.activeTool,
          templateData: editStore.templateData,
        });
      }
      case EditMapActionType.UPDATE_CHOROPLETH_MAP: {
        return setEditStore({
          currentModal: editStore.currentModal,
          currentMapMetaData: editStore.currentMapMetaData,
          currentMapGraphic: editStore.currentMapGraphic,
          currentMapIndex: editStore.currentMapIndex,
          currentcoloredPolygon: editStore.currentcoloredPolygon,
          currentTemplate: editStore.currentTemplate,
          activeTool: editStore.activeTool,
          templateData: payload.templateData,
        });
      }
      case EditMapActionType.UPDATE_MAP_COLOR: {
        return setEditStore({
          currentModal: editStore.currentModal,
          currentMapMetaData: editStore.currentMapMetaData,
          currentMapGraphic: editStore.currentMapGraphic,
          currentMapIndex: editStore.currentMapIndex,
          currentcoloredPolygon: editStore.currentcoloredPolygon,
          currentTemplate: editStore.currentTemplate,
          activeTool: payload,
          templateData: editStore.templateData,
        });
      }
      case EditMapActionType.SET_MAP_NAME_EDIT_ACTIVE: {
        return setEditStore({
          currentModal: CurrentModal.RENAME_MAP,
          currentMapMetaData: editStore.currentMapMetaData,
          currentMapGraphic: editStore.currentMapGraphic,
          currentMapIndex: editStore.currentMapIndex,
          currentcoloredPolygon: editStore.currentcoloredPolygon,
          currentTemplate: editStore.currentTemplate,
          activeTool: editStore.activeTool,
          templateData: editStore.templateData,
        });
      }
      case EditMapActionType.HIDE_MODALS: {
        return setEditStore({
          currentModal: CurrentModal.NONE,
          currentMapMetaData: editStore.currentMapMetaData,
          currentMapGraphic: editStore.currentMapGraphic,
          currentMapIndex: editStore.currentMapIndex,
          currentcoloredPolygon: editStore.currentcoloredPolygon,
          currentTemplate: editStore.currentTemplate,
          activeTool: editStore.activeTool,
          templateData: editStore.templateData,
        });
      }
      case EditMapActionType.MARK_MAP_FOR_PUBLISH: {
        return setEditStore({
          currentModal: CurrentModal.PUBLISH_MAP,
          currentMapMetaData: editStore.currentMapMetaData,
          currentMapGraphic: editStore.currentMapGraphic,
          currentMapIndex: editStore.currentMapIndex,
          currentcoloredPolygon: editStore.currentcoloredPolygon,
          currentTemplate: editStore.currentTemplate,
          activeTool: editStore.activeTool,
        });
      }
      case EditMapActionType.SHOW_GUEST_MODAL: {
        return setEditStore({
          currentModal: payload.newModal,
          currentMapMetaData: editStore.currentMapMetaData,
          currentMapGraphic: editStore.currentMapGraphic,
          currentMapIndex: editStore.currentMapIndex,
          currentcoloredPolygon: editStore.currentcoloredPolygon,
          currentTemplate: editStore.currentTemplate,
          activeTool: editStore.activeTool,
          templateData: editStore.templateData,
        });
      }
      case EditMapActionType.SET_CURRENT_MAP: {
        return setEditStore({
          currentModal: CurrentModal.NONE,
          currentMapMetaData: payload.mapMetaData,
          currentMapGraphic: payload.mapGraphic,
          currentMapIndex: editStore.currentMapIndex,
          currentTemplate: editStore.currentTemplate,
          activeTool: editStore.activeTool,
          templateData: editStore.templateData,
        });
      }
      case EditMapActionType.CLOSE_CURRENT_MAP: {
        return setEditStore({
          currentModal: CurrentModal.NONE,
          currentMapMetaData: null,
          currentMapGraphic: null,
          currentMapIndex: -1,
          currentcoloredPolygon: [],
          currentTemplate: null,
          activeTool: { tool: LeafletTool.SCROLL, detail: "NONE" },
          templateData: [],
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
      payload: mapGraphic,
    });
  };

  editStore.removeLayer = (index) => {
    let mapGraphic = editStore.currentMapGraphic;
    console.log(mapGraphic.layers);
    mapGraphic.layers.splice(index, 1);
    console.log(mapGraphic.layers);
    storeReducer({
      type: EditMapActionType.UPDATE_MAP_GRAPHIC,
      payload: mapGraphic,
    });
  };

  //add a marker coordinate to the current map
  editStore.addMarker = (marker) => {
    let mapGraphic = editStore.currentMapGraphic;
    mapGraphic.markers.push(marker);
    storeReducer({
      type: EditMapActionType.UPDATE_MAP_GRAPHIC,
      payload: mapGraphic,
    });
  };

  editStore.updateMarkerMessage = (index, updatedMessage) => {
    let mapGraphic = editStore.currentMapGraphic;
    mapGraphic.markers[index].message = updatedMessage;
    storeReducer({
      type: EditMapActionType.UPDATE_MAP_GRAPHIC,
      payload: mapGraphic,
    });
  };

  editStore.updateMarkerCoords = (index, updatedCoords) => {
    let mapGraphic = editStore.currentMapGraphic;
    mapGraphic.markers[index].coordinates = updatedCoords;
    storeReducer({
      type: EditMapActionType.UPDATE_MAP_GRAPHIC,
      payload: mapGraphic,
    });
  };

  editStore.updateMarkerDraggable = (index) => {
    let mapGraphic = editStore.currentMapGraphic;
    console.log(mapGraphic.markers[index].draggable);
    mapGraphic.markers[index].draggable = !mapGraphic.markers[index].draggable;
    console.log(mapGraphic.markers[index].draggable);
    storeReducer({
      type: EditMapActionType.UPDATE_MAP_GRAPHIC,
      payload: mapGraphic,
    });
  };

  editStore.deleteMarker = (index) => {
    let mapGraphic = editStore.currentMapGraphic;
    mapGraphic.markers.splice(index, 1);
    storeReducer({
      type: EditMapActionType.UPDATE_MAP_GRAPHIC,
      payload: mapGraphic,
    });
  };

  //set the current selected marker
  editStore.setActiveMarker = (key) => {
    editStore.activeTool = { tool: LeafletTool.MARKER, detail: key };
    storeReducer({
      type: EditMapActionType.UPDATE_MAP_COLOR,
      payload: editStore.activeTool,
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

  editStore.createRoutingMap = () => {
    console.log("Triggered handle on click");
    storeReducer({
      type: EditMapActionType.CREATE_ROUTING_MAP,
      payload: {
        currentTemplate: Templates.ROUTING,
      },
    });
  };
  editStore.createChoroplethMap = () => {
    console.log("Triggered handle on click");
    storeReducer({
      type: EditMapActionType.CREATE_CHOROPLETH_MAP,
      payload: {
        currentTemplate: Templates.CHOROPLETH,
      },
    });
  };

  editStore.setTemplateData = (data) => {
    storeReducer({
      type: EditMapActionType.UPDATE_CHOROPLETH_MAP,
      payload: { templateData: data },
    });
  };

  //set the current leaflet tool to scrolling
  editStore.setScrolling = () => {
    editStore.activeTool = { tool: LeafletTool.SCROLL, detail: "NONE" };
    storeReducer({
      type: EditMapActionType.UPDATE_MAP_COLOR,
      payload: editStore.activeTool,
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

  editStore.showGuestSaveModal = () => {
    storeReducer({
      type: EditMapActionType.SHOW_GUEST_MODAL,
      payload: { newModal: CurrentModal.GUEST_SAVE_MAP },
    });
  };

  editStore.showGuestRenameModal = () => {
    storeReducer({
      type: EditMapActionType.SHOW_GUEST_MODAL,
      payload: { newModal: CurrentModal.GUEST_RENAME_MAP },
    });
  };

  editStore.showGuestPublishModal = () => {
    storeReducer({
      type: EditMapActionType.SHOW_GUEST_MODAL,
      payload: { newModal: CurrentModal.GUEST_PUBLISH_MAP },
    });
  };

  editStore.hideModals = () => {
    storeReducer({
      type: EditMapActionType.HIDE_MODALS,
      // payload: {},
    });
  };

  //when clicking on a private map, set the map to the current active map in the edit store

  editStore.setMap = function (mapMetaData) {
    async function set(mapMetaData) {
      console.log(mapMetaData);
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
    }
    set(mapMetaData);
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

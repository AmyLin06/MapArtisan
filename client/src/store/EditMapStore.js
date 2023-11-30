import { createContext, useContext, useState } from "react";

export const EditStoreContext = createContext({});

export const EditStoreActionType = {
  CLOSE_CURRENT_MAP: "CLOSE_CURRENT_MAP",
  SET_CURRENT_MAP: "SET_CURRENT_MAP",
  SET_MAP_NAME_EDIT_ACTIVE: "SET_MAP_NAME_EDIT_ACTIVE",
  UPDATE_MAP: "UPDATE_MAP",
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

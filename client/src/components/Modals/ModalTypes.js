export const ConfirmModalTypes = {
  DELETE_MAP: {
    name: "DELETE_MAP",
    title: "Delete Map",
    text: "Are you sure you want to delete ",
    warning: "After the map is deleted, it can no longer be recovered",
  },
  DELETE_LAYER: {
    name: "DELETE_LAYER",
    title: "Delete Layer",
    text: "Are you sure you want to delete ",
    warning: "After the layer is deleted, it can no longer be recovered",
  },
  PUBLISH_MAP: {
    name: "PUBLISH_MAP",
    title: "Publish Map",
    text: "Are you sure you want to publish ",
    warning: "After the map is published, you can no longer edit it",
  },
};

export const SuccessModalTypes = {
  PUBLISH_SUCCESS: {
    name: "PUBLISH_SUCCESS",
    text: "Successfully published ",
    subtext: "Your vision, Mapped out.",
  },
  ACCOUNT_UPDATE_SUCCESS: {
    name: "ACCOUNT_UPDATE_SUCCESS",
    text: "Successfully updated your information",
    subtext: "",
  },
  ACCOUNT_LOGIN_SUCCESS: {
    name: "ACCOUNT_LOGIN_SUCCESS",
    text: "Sucessfully login",
    subtext: "",
  },
  EMAIL_SEND_SUCCESS: {
    name: "EMAIL_SEND_SUCCESS",
    text: "Email successful send. You can go and reset with the link.",
    subtext: "",
  },
  PASSWORD_RESET_SUCCESS: {
    name: "PASSWORD_RESET_SUCCESS",
    text: "Sucessfully reset password",
    subtext: "",
  },
};
export const FailModalTypes = {
  ACCOUNT_UPDATE_FAIL: {
    name: "ACCOUNT_UPDATE_FAIL",
    text: "Failed to updated your information",
    subtext: "",
  },
  ACCOUNT_LOGIN_FAIL: {
    name: "ACCOUNT_LOGIN_FAIL",
    text: "Failed to login",
    subtext: "",
  },
  ACCOUNT_REGISTER_FAIL: {
    name: "ACCOUNT_REGISTER_FAIL",
    text: "Failed to register",
    subtext: "",
  },
  EMAIL_SEND_FAIL: {
    name: "EMAIL_SEND_FAIL",
    text: "Failed to send reset email",
    subtext: "",
  },
  PASSWORD_RESET_FAIL: {
    name: "PASSWORD_RESET_FAIL",
    text: "Failed to reset password",
    subtext: "",
  },
};

export const InputModalTypes = {
  RENAME_MAP: {
    name: "RENAME_MAP",
    title: "Rename Map",
  },
  MESSAGE_MODAL: {
    name: "MESSAGE_MODAL",
    title: "Message to ",
  },
};

export const GuestModalTypes = {
  SAVE_MAP: {
    name: "GUEST_SAVE_MAP",
    text: "Login to save a map",
  },
  RENAME_MAP: {
    name: "GUEST_RENAME_MAP",
    text: "Login to rename a map",
  },
  PUBLISH_MAP: {
    name: "GUEST_PUBLISH_MAP",
    text: "Login to publish a map",
  },
  LIKE_MAP: {
    name: "GUEST_LIKE_MAP",
    text: "Login to like a map",
  },
  SUBMIT_COMMENT: {
    name: "GUEST_COMMENT_ON_MAP",
    text: "Login to write a comment",
  },
};

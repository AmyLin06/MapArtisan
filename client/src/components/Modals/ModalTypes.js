//TODO: confirm(), cancel(), close() are for testing, change all function calls for confirmAction and cancelAction
function confirm() {
  console.log("confirm() in MUIModalTypes called - not implemented");
}
function cancel() {
  console.log("cancel() in MUIModalTypes called - not implemented");
}
function close() {
  console.log("close() in MUIModalTypes called - not implemented");
}

export const ConfirmModalTypes = {
  DELETE_MAP: {
    name: "DELETE_MAP",
    title: "Delete Map",
    text: "Are you sure you want to delete ",
    warning: "After the map is deleted, it can no longer be recovered",
    confirmAction: confirm,
    cancelAction: cancel,
  },
  DELETE_LAYER: {
    name: "DELETE_LAYER",
    title: "Delete Layer",
    text: "Are you sure you want to delete ",
    warning: "After the layer is deleted, it can no longer be recovered",
    confirmAction: confirm,
    cancelAction: cancel,
  },
  PUBLISH_MAP: {
    name: "PUBLISH_MAP",
    title: "Publish Map",
    text: "Are you sure you want to publish ",
    warning: "After the map is published, you can no longer edit it",
    confirmAction: confirm,
    cancelAction: cancel,
  },
};

export const SuccessModalTypes = {
  MESSAGE_SUCCESS: {
    name: "MESSAGE_SUCCESS",
    text: "Sucessfully Send Out Message",
    subtext: "",
    close: close,
  },
  PUBLISH_SUCCESS: {
    name: "PUBLISH_SUCCESS",
    text: "Successfully published ",
    subtext: "Your vision, Mapped out.",
    close: close,
  },
  ACCOUNT_UPDATE_SUCCESS: {
    name: "ACCOUNT_UPDATE_SUCCESS",
    text: "Successfully updated your information",
    subtext: "",
    close: close,
  },
  ACCOUNT_LOGIN_SUCCESS: {
    name: "ACCOUNT_LOGIN_SUCCESS",
    text: "Sucessfully login",
    subtext: "",
    close: close,
  },
  EMAIL_SEND_SUCCESS: {
    name: "EMAIL_SEND_SUCCESS",
    text: "Email successful send. You can go and reset with the link.",
    subtext: "",
    close: close,
  },
  PASSWORD_RESET_SUCCESS: {
    name: "PASSWORD_RESET_SUCCESS",
    text: "Sucessfully reset password",
    subtext: "",
    close: close,
  },
};

export const FailModalTypes = {
  ACCOUNT_UPDATE_FAIL: {
    name: "ACCOUNT_UPDATE_FAIL",
    text: "Failed to updated your information",
    subtext: "",
    close: close,
  },
  ACCOUNT_LOGIN_FAIL: {
    name: "ACCOUNT_LOGIN_FAIL",
    text: "Failed to login",
    subtext: "",
    close: close,
  },
  ACCOUNT_REGISTER_FAIL: {
    name: "ACCOUNT_REGISTER_FAIL",
    text: "Failed to register",
    subtext: "",
    close: close,
  },
  EMAIL_SEND_FAIL: {
    name: "EMAIL_SEND_FAIL",
    text: "Failed to send reset email",
    subtext: "",
    close: close,
  },
  PASSWORD_RESET_FAIL: {
    name: "PASSWORD_RESET_FAIL",
    text: "Failed to reset password",
    subtext: "",
    close: close,
  },
};

export const InputModalTypes = {
  RENAME_MAP: {
    name: "RENAME_MAP",
    title: "Rename Map",
    confirmAction: confirm,
    cancelAction: cancel,
  },
  MESSAGE_MODAL: {
    name: "MESSAGE_MODAL",
    title: "Message to ",
    confirmAction: confirm,
    cancelAction: cancel,
  },
};

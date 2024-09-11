"use strict";
const electron = require("electron");
const preload = require("@electron-toolkit/preload");
const electronRpcApi = require("electron-rpc-api");
const apiDefinition = {
  ping: electronRpcApi.ActionType.SubscribableLike(),
  sanitizeHtml: electronRpcApi.ActionType.Promise(),
  quitApp: electronRpcApi.ActionType.Promise(),
  test: electronRpcApi.ActionType.Promise()
};
const IPC_MAIN_API_SERVICE = electronRpcApi.createIpcMainApiService({
  channel: "some-event-name",
  // event name used to communicate between the event emitters
  apiDefinition
});
const electronWindow = {
  __ELECTRON_EXPOSURE__: {
    buildIpcMainClient: IPC_MAIN_API_SERVICE.client.bind(IPC_MAIN_API_SERVICE)
  }
};
const exposeKey = "__ELECTRON_EXPOSURE__";
const api = {};
if (process.contextIsolated) {
  try {
    electron.contextBridge.exposeInMainWorld("electron", preload.electronAPI);
    electron.contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = preload.electronAPI;
  window.api = api;
}
electron.contextBridge.exposeInMainWorld(exposeKey, electronWindow[exposeKey]);

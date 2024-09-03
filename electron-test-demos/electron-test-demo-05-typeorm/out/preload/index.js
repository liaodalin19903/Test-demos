"use strict";
const electron = require("electron");
const preload = require("@electron-toolkit/preload");
const api = {};
if (process.contextIsolated) {
  try {
    electron.contextBridge.exposeInMainWorld("electron", preload.electronAPI);
    electron.contextBridge.exposeInMainWorld("api", api);
    electron.contextBridge.exposeInMainWorld("IPC", {
      invoke: (channel, data) => {
        return electron.ipcRenderer.invoke(channel, data);
      },
      ipcOn: (channel, fun) => {
        const subscription = (event, data) => fun(event, data);
        return electron.ipcRenderer.on(channel, subscription);
      },
      removeAllListeners: (channel) => {
        return electron.ipcRenderer.removeAllListeners(channel);
      }
    });
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = preload.electronAPI;
  window.api = api;
  window.IPC = {
    invoke: (channel, data) => {
      return electron.ipcRenderer.invoke(channel, data);
    },
    ipcOn: (channel, fun) => {
      const subscription = (event, data) => fun(event, data);
      return electron.ipcRenderer.on(channel, subscription);
    },
    removeAllListeners: (channel) => {
      return electron.ipcRenderer.removeAllListeners(channel);
    }
  };
}

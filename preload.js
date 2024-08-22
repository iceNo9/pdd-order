// preload.js
window.api = {};

window.api.send = (channel, args) => {
  window.require('electron').ipcRenderer.send(channel, args);
};

window.api.on = (channel, listener) => {
  const ipcRenderer = window.require('electron').ipcRenderer;
  ipcRenderer.on(channel, (event, ...args) => listener(...args));
};

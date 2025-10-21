// preload.js
const { contextBridge, ipcRenderer } = require('electron');

// We are exposing the ipcRenderer to the window object, but only the 'send' method
// for the 'show-notification' channel. This is a security measure.
window.ipcRenderer = ipcRenderer;

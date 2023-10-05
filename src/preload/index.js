import { contextBridge } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
const { ipcRenderer } = electronAPI;

const darkModeApi = {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system'),
};
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('darkMode', darkModeApi);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = electronAPI;
  window.darkMode = darkModeApi;
}

import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    openFile: (type: string[] | string) => ipcRenderer.invoke('open-dir', type),
    saveFile: (content: string[]) => ipcRenderer.invoke('save-file', content),
    uploadFile: (file: string[]) => ipcRenderer.invoke('upload-file', file),
    dragUploadFile: (file: string[]) =>
      ipcRenderer.invoke('drag-upload-file', file),
    processImage: (images: string[]) =>
      ipcRenderer.invoke('process-image', images),
  },
});

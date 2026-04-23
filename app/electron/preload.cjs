const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("kernelBreach", {
  sendKey(key) {
    ipcRenderer.send("game:key", key);
  },
  sendResize(size) {
    ipcRenderer.send("game:resize", size);
  },
  onFrame(callback) {
    const listener = (_event, lines) => callback(lines);
    ipcRenderer.on("game:frame", listener);
    return () => ipcRenderer.removeListener("game:frame", listener);
  }
});

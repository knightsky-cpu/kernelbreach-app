import { app, BrowserWindow, ipcMain } from "electron";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  KEY,
  resizeEmbeddedRuntime,
  sendKeyToRuntime,
  setEmbeddedQuitHandler,
  startEmbeddedRuntime,
  stopRuntime
} from "../runtime.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MAX_RUNTIME_KEY_LENGTH = 16;
const MIN_RUNTIME_COLS = 40;
const MAX_RUNTIME_COLS = 240;
const MIN_RUNTIME_ROWS = 20;
const MAX_RUNTIME_ROWS = 100;

let mainWindow = null;

function clampNumber(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getRuntimePackageJson() {
  const packageJsonPath = path.join(__dirname, "../../package.json");
  try {
    return JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  } catch {
    return null;
  }
}

function shouldEnableDevMenu() {
  const explicit = process.env.KERNELBREACH_ENABLE_DEV_MENU;
  if (explicit === "1") return true;
  if (explicit === "0") return false;
  const packageJson = getRuntimePackageJson();
  return packageJson?.kernelBreach?.devMenuEnabled === true;
}

function getWindowIconPath() {
  return app.isPackaged
    ? path.join(process.resourcesPath, "icon.png")
    : path.join(__dirname, "../../build/icon.png");
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 960,
    minWidth: 980,
    minHeight: 720,
    backgroundColor: "#070c11",
    autoHideMenuBar: true,
    icon: process.platform === "linux" ? getWindowIconPath() : undefined,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

function estimateGridSize(window) {
  const [width, height] = window.getContentSize();
  return {
    cols: Math.max(80, Math.floor((width - 32) / 12)),
    rows: Math.max(24, Math.floor((height - 32) / 20))
  };
}

app.whenReady().then(async () => {
  createWindow();
  process.env.KERNELBREACH_ENABLE_DEV_MENU = shouldEnableDevMenu() ? "1" : "0";
  setEmbeddedQuitHandler(() => {
    stopRuntime();
    app.quit();
  });

  const sendFrame = (lines) => {
    if (!mainWindow || mainWindow.isDestroyed()) return;
    mainWindow.webContents.send("game:frame", lines);
  };

  const initialSize = estimateGridSize(mainWindow);
  await startEmbeddedRuntime({
    onFrame: sendFrame,
    cols: initialSize.cols,
    rows: initialSize.rows
  });

  mainWindow.webContents.on("did-finish-load", () => {
    const size = estimateGridSize(mainWindow);
    resizeEmbeddedRuntime(size.cols, size.rows);
  });

  mainWindow.on("resize", () => {
    if (!mainWindow || mainWindow.isDestroyed()) return;
    const size = estimateGridSize(mainWindow);
    resizeEmbeddedRuntime(size.cols, size.rows);
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

ipcMain.on("game:key", (_event, key) => {
  if (typeof key !== "string") return;
  if (key.length === 0 || key.length > MAX_RUNTIME_KEY_LENGTH) return;
  sendKeyToRuntime(key);
});

ipcMain.on("game:resize", (_event, size) => {
  if (!size || typeof size !== "object") return;
  const cols = Number(size.cols);
  const rows = Number(size.rows);
  if (!Number.isFinite(cols) || !Number.isFinite(rows)) return;
  resizeEmbeddedRuntime(
    clampNumber(Math.floor(cols), MIN_RUNTIME_COLS, MAX_RUNTIME_COLS),
    clampNumber(Math.floor(rows), MIN_RUNTIME_ROWS, MAX_RUNTIME_ROWS)
  );
});

ipcMain.handle("game:keymap", () => KEY);

app.on("before-quit", () => {
  stopRuntime();
});

app.on("window-all-closed", () => {
  stopRuntime();
  app.quit();
});

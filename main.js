const { app, BrowserWindow, ipcMain, Notification, Menu } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');

let mainWindow;
let settingsWindow;

function createSettingsWindow() {
  if (settingsWindow) {
    settingsWindow.focus();
    return;
  }

  settingsWindow = new BrowserWindow({
    width: 550,
    height: 400,
    parent: mainWindow,
    modal: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    autoHideMenuBar: true
  });

  settingsWindow.loadFile('settings.html');

  settingsWindow.on('closed', () => {
    settingsWindow = null;
    // Notify the main window that settings might have changed
    if (mainWindow) {
        mainWindow.webContents.send('settings-closed');
    }
  });
}

function createMenu() {
    const template = [
        {
            label: 'App',
            submenu: [
                {
                    label: 'Settings',
                    accelerator: 'CmdOrCtrl+,',
                    click: () => {
                        createSettingsWindow();
                    }
                },
                { type: 'separator' },
                { role: 'quit' }
            ]
        },
        // You can add other menus like 'Edit', 'View' etc. here
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: false,
      nodeIntegration: true
    }
  });

  mainWindow.loadFile('index.html');
  // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();
  createMenu();

  autoUpdater.checkForUpdates();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 모든 창이 닫혔을 때 앱을 종료합니다. (macOS 제외)
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// 네이티브 알림을 위한 IPC 핸들러
ipcMain.on('show-notification', (event, title, body) => {
  new Notification({ title, body }).show();
});

// --- Auto Updater Logic ---
autoUpdater.on('update-available', (info) => {
  const currentVersion = app.getVersion();
  mainWindow.webContents.send('update-message', 'updateAvailable', { currentVersion, latestVersion: info.version });
});

autoUpdater.on('update-not-available', (info) => {
  const currentVersion = app.getVersion();
  mainWindow.webContents.send('update-message', 'updateNotAvailable', { currentVersion, latestVersion: info.version });
});

autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update-message', 'updateDownloaded');
});

autoUpdater.on('error', (err) => {
  mainWindow.webContents.send('update-message', 'updateError', err.message);
});

ipcMain.on('check-for-update', () => {
  autoUpdater.checkForUpdates();
});

ipcMain.on('restart-app', () => {
  autoUpdater.quitAndInstall();
});

ipcMain.on('close-settings-window', () => {
    if (settingsWindow) {
        settingsWindow.close();
    }
});

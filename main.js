const { app, BrowserWindow, ipcMain, Notification, Menu, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
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

let currentTranslations = {}; // Store translations for use in dialogs etc.

function exportWindowAsImage() {
    if (!mainWindow) return;

    mainWindow.webContents.capturePage().then(image => {
        const picturesPath = app.getPath('pictures');
        const timestamp = new Date().toISOString().replace(/:/g, '-');
        const filePath = path.join(picturesPath, `percentage-clock-${timestamp}.png`);

        fs.writeFile(filePath, image.toPNG(), (err) => {
            if (err) {
                dialog.showErrorBox(
                    currentTranslations.exportErrorTitle || 'Export Failed',
                    currentTranslations.exportErrorMessage || 'Could not save the screenshot.'
                );
                return;
            }
            dialog.showMessageBox(mainWindow, {
                type: 'info',
                title: currentTranslations.exportSuccessTitle || 'Export Successful',
                message: currentTranslations.exportSuccessMessage || 'Screenshot saved to your Pictures folder.'
            });
        });
    }).catch(err => {
        console.error('Failed to capture page:', err);
        dialog.showErrorBox(
            currentTranslations.exportErrorTitle || 'Export Failed',
            currentTranslations.exportErrorMessage || 'Could not save the screenshot.'
        );
    });
}

function createMenu(translations) {
    currentTranslations = translations;
    const template = [
        {
            label: translations.menuFile || 'File',
            submenu: [
                {
                    label: translations.menuExport || 'Export as Image',
                    click: exportWindowAsImage
                },
                { type: 'separator' },
                {
                    label: translations.menuExit || 'Exit',
                    role: 'quit'
                }
            ]
        },
        {
            label: translations.menuEdit || 'Edit',
            submenu: [
                {
                    label: translations.menuSettings || 'Settings',
                    accelerator: 'CmdOrCtrl+,',
                    click: () => {
                        createSettingsWindow();
                    }
                }
            ]
        },
        {
            label: translations.menuHelp || 'Help',
            submenu: []
        }
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
  // The menu is now created dynamically when the renderer process sends language info.
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

ipcMain.on('update-menu', (event, translations) => {
    createMenu(translations);
});

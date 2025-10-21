const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path');

function createWindow () {
  // 브라우저 창을 생성합니다.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      // In a real app, you'd want to be more secure than this
      contextIsolation: false,
      nodeIntegration: true
    }
  });

  // 앱의 index.html 파일을 로드합니다.
  mainWindow.loadFile('index.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
}

// 이 메서드는 Electron의 초기화가 완료되고
// 브라우저 창을 생성할 준비가 되었을 때 호출됩니다.
// 일부 API는 이 이벤트 이후에만 사용할 수 있습니다.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // macOS에서는 dock 아이콘이 클릭되고 다른 창이 열려있지 않을 때
    // 앱에서 창을 다시 생성하는 것이 일반적입니다.
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

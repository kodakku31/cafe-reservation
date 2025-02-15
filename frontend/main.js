const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

function createWindow() {
  // ブラウザウィンドウを作成します。
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // 開発環境の場合はローカルサーバー、本番環境の場合はビルドされたファイルを読み込む
  const startUrl = isDev 
    ? 'http://localhost:3000' 
    : `file://${path.join(__dirname, '../out/index.html')}`;

  mainWindow.loadURL(startUrl);

  // 開発環境の場合は開発者ツールを開く
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

// このメソッドは、Electron の初期化が完了し、
// ブラウザウィンドウの作成準備ができたときに呼ばれます。
app.whenReady().then(createWindow);

// すべてのウィンドウが閉じられたときの処理
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

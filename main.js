const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow

var mainWindow = null;

// 当所有窗口被关闭了，退出。
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});
app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  // 加载应用的 index.html
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  // 打开开发工具
  mainWindow.openDevTools();
  // 当 window 被关闭，这个事件会被发出
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

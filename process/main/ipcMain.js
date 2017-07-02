const electron = require('electron');
const ipc = electron.ipcMain;
const dialog = electron.dialog;
const BrowserWindow = electron.BrowserWindow;
var rootPath = require('path').resolve(__dirname, "../../");
ipc.on('SYNC-MSG', function(event, arg) {
	event.returnValue = 'SYNC-MSG Replay:data(' + arg + ')';
})
ipc.on('ASYNC-MSG', function(event, arg) {
	event.sender.send('ASYNC-MSG-Replay', arg);
})
ipc.on('open-file-dialog', function (event) {
  dialog.showOpenDialog({
    properties: ['openFile', 'openDirectory']
  }, function (files) {
    if (files) event.sender.send('selected-directory', files)
  })
})
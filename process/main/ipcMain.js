const electron = require('electron');
const ipc = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
var rootPath = require('path').resolve(__dirname, "../../");
ipc.on('SYNC-MSG', function(event, arg) {
	event.returnValue = 'SYNC-MSG Replay:data(' + arg + ')';
})
ipc.on('ASYNC-MSG', function(event, arg) {
	event.sender.send('ASYNC-MSG-Replay', arg);
})
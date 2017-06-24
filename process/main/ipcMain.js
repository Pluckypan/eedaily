const ipc = require('electron').ipcMain;
ipc.on('SYNC-MSG', function (event, arg) {
  event.returnValue = 'SYNC-MSG Replay:data('+arg+')';
})
ipc.on('ASYNC-MSG', function (event, arg) {
  event.sender.send('ASYNC-MSG-Replay', arg);
})
const electron = require('electron');
const path = require('path');
const ipc = electron.ipcMain;
const dialog = electron.dialog;
const BrowserWindow = electron.BrowserWindow;
var rootPath = require('path').resolve(__dirname, "../../");
var jsPath = path.resolve(rootPath, "process/lib/eeutils.js");
var eeutils = require(jsPath);

ipc.on('SYNC-MSG', function(event, arg) {
	event.returnValue = 'SYNC-MSG Replay:data(' + arg + ')';
})

ipc.on('ASYNC-MSG', function(event, arg) {
	event.sender.send('ASYNC-MSG-Replay', arg);
})

ipc.on('open-file-dialog', function(event) {
	dialog.showOpenDialog({
		properties: ['openFile', 'openDirectory']
	}, function(files) {
		if(files) event.sender.send('selected-directory', files)
	})
})

ipc.on('open-project', function(event) {
	dialog.showOpenDialog({
		title: "打开工程文件",
		properties: ['openFile'],
		filters: [{
			extensions: ['ep']
		}]
	}, function(files) {
		if(files && files.length > 0) {
			event.sender.send('open-project-path', files[0]);
			loadIndexUrl(files[0]);
		}
	})
})

ipc.on('save-project', function(event, arg) {
	const options = {
		title: '保存工程文件',
		filters: [{
			name: "project.ep",
			extensions: ['ep']
		}]
	};
	dialog.showSaveDialog(options, function(filename) {
		if(filename) {
			eeutils.write(filename, arg);
			event.sender.send('save-project-path', filename);
			loadIndexUrl(filename);
		}
	})
})

function loadIndexUrl(path) {
	if(!eeutils.exists(path)) return;
	var configStr = eeutils.read(path);
	if(!configStr || configStr.length == 0) return;
	var pro = eeutils.getJson(configStr);
	console.log(pro);
	if(pro == null) return;
	var wins = BrowserWindow.getAllWindows();
	console.log(wins);
	if(wins == null || wins.length == 0) return;
	wins[0].loadURL('file://' + rootPath + '/sections/index.html');
}
const electron = require('electron');
const path = require('path');
const ipc = electron.ipcMain;
const dialog = electron.dialog;
const BrowserWindow = electron.BrowserWindow;
var rootPath = require('path').resolve(__dirname, "../../");
var jsPath = path.resolve(rootPath, "process/lib/envutil.js");
var envutil = require(jsPath);

ipc.on('SYNC-MSG', function(event, arg) {
	event.returnValue = 'SYNC-MSG Replay:data(' + arg + ')';
})

ipc.on('get-recent-project', function(event, arg) {
	event.returnValue = envutil.getRecent();
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
ipc.on('open-index-page', function(event, path) {
	loadIndexUrl(path);
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
			envutil.write(filename, arg);
			event.sender.send('save-project-path', filename);
			loadIndexUrl(filename);
		}
	})
})

function loadIndexUrl(path) {
	if(!envutil.exists(path)) return;
	var configStr = envutil.read(path);
	if(!configStr || configStr.length == 0) return;
	var pro = envutil.getJson(configStr);
	if(pro == null) return;
	var wins = BrowserWindow.getAllWindows();
	if(wins == null || wins.length == 0) return;
	envutil.setLastpath(path);
	wins[0].loadURL('file://' + rootPath + '/sections/index.html');
}
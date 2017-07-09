const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const glob = require('glob');
const app = electron.app;
if(process.mas) app.setName('EEDaily');
var mainWindow = null;
var jsPath = path.resolve(__dirname, "process/lib/envutil.js");
var envutil = require(jsPath);
var envCfg = envutil.getConfig();

var currentProject;
if(envCfg) {
	currentProject = envCfg.lastPath;
} else {
	currentProject = null;
}

function initAppMenu() {
	var files = glob.sync(path.join(__dirname, 'process/main/**/*.js'))
	files.forEach(function(file) {
		//console.log(file);
		require(file)
	});
}

function initApp() {
	initAppMenu();
}
initApp();

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1024,
		height: 768,
		minWidth: 1000,
		minHeight: 600,
		title: app.getName()
	});
	if(currentProject && currentProject.length > 0) {
		mainWindow.loadURL('file://' + __dirname + '/sections/index.html');
	} else {
		mainWindow.loadURL('file://' + __dirname + '/sections/welcome.html');
	}

	mainWindow.on('closed', function() {
		mainWindow = null;
	});
}
app.on('ready', function() {
	createWindow();
});

app.on('activate', function() {
	if(mainWindow === null) {
		createWindow()
	}
});

// 当所有窗口被关闭了，退出。
app.on('window-all-closed', function() {
	if(process.platform != 'darwin') {
		app.quit();
	}
});
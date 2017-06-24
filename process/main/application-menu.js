const electron = require('electron');
const app = electron.app;
const appMenu = electron.Menu;
const BrowserWindow = electron.BrowserWindow;

let template = [{
	label: '编辑',
	submenu: []
}, {
	label: '视图',
	submenu: [{
    label: '刷新',
    accelerator: 'CmdOrCtrl+R',
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        if (focusedWindow.id === 1) {
          BrowserWindow.getAllWindows().forEach(function (win) {
            if (win.id > 1) {
              win.close()
            }
          })
        }
        focusedWindow.reload()
      }
    }
  },{
		label: '全屏',
		accelerator: (function() {
			if(process.platform === 'darwin') {
				return 'Ctrl+Command+F'
			} else {
				return 'F11'
			}
		})(),
		click: function(item, focusedWindow) {
			if(focusedWindow) {
				focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
			}
		}
	}, {
		type: 'separator'
	}, {
		label: '开发者选项',
		accelerator: (function() {
			if(process.platform === 'darwin') {
				return 'Alt+Command+I'
			} else {
				return 'Ctrl+Shift+I'
			}
		})(),
		click: function(item, focusedWindow) {
			if(focusedWindow) {
				focusedWindow.toggleDevTools()
			}
		}
	}]
}, {
	label: '帮助',
	role: 'help',
	submenu: [{
		label: '了解更多',
		click: function() {
			electron.shell.openExternal('http://echo.engineer');
		}
	}]
}];

app.on('ready', function() {
	const menu = appMenu.buildFromTemplate(template);
	appMenu.setApplicationMenu(menu);
})
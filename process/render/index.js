$(function() {
	const ipc = require('electron').ipcRenderer;
	const shell = require('electron').shell;
	const BrowserWindow = require('electron').remote.BrowserWindow;
	const os = require('os');
	var path = require('path');

	ipc.on('ASYNC-MSG-Replay', function(event, arg) {
		$("#preResult").html(arg);
	})

	ipc.on('selected-directory', function(event, path) {
		$("#preResult").html(`You selected: ${path}`);
	})

	$("#btnSync").click(function() {
		const reply = ipc.sendSync('SYNC-MSG', 'ping');
		$("#preResult").html(reply);
	});
	$("#btnAsync").click(function() {
		ipc.send('ASYNC-MSG', 'ping-ping-ping');
	});
	$("#btnAjax").click(function() {
		$.ajax({
			type: "get",
			url: "http://wthrcdn.etouch.cn/weather_mini?city=青岛",
			async: true,
			success: function(data) {
				$("#preResult").html(data);
			},
			error: function(err) {
				$("#preResult").html(err);
			}
		});
	});
	$("#btnNotify").click(function() {
		const notification = {
			title: '下载完成',
			body: 'xxx-20170630-ja.avi'
		};
		const mNotification = new window.Notification(notification.title, notification)
		mNotification.onclick = () => {
			$("#preResult").html('Notification clicked');
		}
	});
	$("#btnOpenPath").click(function() {
		shell.showItemInFolder(os.homedir());
	});
	$("#btnOpenUrl").click(function() {
		shell.openExternal('http://www.echo.engineer')
	});
	$("#btnOpenFileAndDir").click(function() {
		ipc.send('open-file-dialog');
	});
	$("#btnEditor").click(function() {
		const modalPath = path.join("file://", __dirname, "editor.html");
		$("#preResult").html(modalPath);
		let win = new BrowserWindow({
			width: 1024,
			height: 768,
			minWidth: 1000,
			minHeight: 600
		});
		win.on('close', function() {
			win = null
		});
		win.loadURL(modalPath);
		win.show();
	});

	$("#li-dashboard").click(function() {
		$("#li-dashboard").attr("class", "active");
		$("#li-about").attr("class", "");
		$("#col-dashboard").css("display", "block");
		$("#col-about").css("display", "none");
	});
	$("#li-about").click(function() {
		$("#li-dashboard").attr("class", "");
		$("#li-about").attr("class", "active");
		$("#col-dashboard").css("display", "none");
		$("#col-about").css("display", "block");
	});

	$('#using_json').jstree({
		'plugins': ['types', 'dnd'],
		'types': {
			'default': {
				'icon': 'fa fa-folder'
			},
			'html': {
				'icon': 'fa fa-file-code-o'
			},
			'svg': {
				'icon': 'fa fa-file-picture-o'
			},
			'css': {
				'icon': 'fa fa-file-code-o'
			},
			'img': {
				'icon': 'fa fa-file-image-o'
			},
			'js': {
				'icon': 'fa fa-file-text-o'
			}

		},
		'core': {
			'data': [
				'Empty Folder',
				{
					'text': 'Resources',
					'state': {
						'opened': true
					},
					'children': [{
							'text': 'css',
							'children': [{
									'text': 'animate.css',
									'type': 'css'

								},
								{
									'text': 'bootstrap.css',
									'type': 'css'
								},
								{
									'text': 'main.css',
									'type': 'css'
								},
								{
									'text': 'style.css',
									'type': 'css'
								}
							],
							'state': {
								'opened': true
							}
						},
						{
							'text': 'js',
							'children': [{
									'text': 'bootstrap.js',
									'type': 'js'
								},
								{
									'text': 'inspinia.min.js',
									'type': 'js'
								},
								{
									'text': 'jquery.min.js',
									'type': 'js'
								},
								{
									'text': 'jsTree.min.js',
									'type': 'js'
								},
								{
									'text': 'custom.min.js',
									'type': 'js'
								}
							],
							'state': {
								'opened': true
							}
						},
						{
							'text': 'html',
							'children': [{
									'text': 'layout.html',
									'type': 'html'
								},
								{
									'text': 'navigation.html',
									'type': 'html'
								},
								{
									'text': 'navbar.html',
									'type': 'html'
								},
								{
									'text': 'footer.html',
									'type': 'html'
								},
								{
									'text': 'sidebar.html',
									'type': 'html'
								}
							],
							'state': {
								'opened': true
							}
						}
					]
				}
			]
		}
	});
	$('#using_json').on("changed.jstree", function(e, data) {
		$("#preResult").html("ID=" + data.node.id + " test=" + data.node.text);

	});
});
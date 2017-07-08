$(function() {
	const ipc = require('electron').ipcRenderer;

	ipc.on('open-project-path', function(event, path) {
		if(path) {
			console.log(path)
		}
	})

	ipc.on('save-project-path', function(event, path) {
		if(path) {
			console.log(path)
		}
	})

	$("#btnOpenPro").click(function() {
		ipc.send('open-project');
	});
	$("#btnSavePro").click(function() {
		var tvTitle = $("#tvTitle").val();
		if(!tvTitle || tvTitle.length == 0) {
			notie.alert(3, "请输入网站标题", 2);
			return;
		}
		var tvDesc = $("#tvDesc").val();
		if(!tvDesc || tvDesc.length == 0) {
			notie.alert(3, "请输入网站描述", 2);
			return;
		}
		var tvKeywords = $("#tvKeywords").val();
		if(!tvKeywords || tvKeywords.length == 0) {
			notie.alert(3, "请输入网站关键字", 2);
			return;
		}

		var cdn = $("input[name='rdCDN']").val();
		var webType = $("#webType").val();

		var pro = {
			"title": tvTitle,
			"description": tvDesc,
			"keywords": tvKeywords,
			"type": webType,
			"publish": {
				"url": "",
				"name": cdn,
				"key": "",
				"domain": ""
			}
		};
		ipc.send('save-project', JSON.stringify(pro));
	});
});
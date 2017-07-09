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

	var recent_pro = ipc.sendSync('get-recent-project');
	if(recent_pro && recent_pro.length) {
		var str = "";
		recent_pro.forEach(function(pro, index) {
			str += '<li><a href="#" class="recent-pro" data-url="' + pro + '">' + pro + '</a></li>';
		});
		$("#proDivider").before(str);
		$(".recent-pro").click(function() {
			ipc.send('open-index-page', $(this).attr("data-url"));
		});
	} else {
		$("#proDivider").before('<li><a href="#">No Recent</a></li>');
	}

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
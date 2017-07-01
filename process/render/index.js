$(function() {
	const ipc = require('electron').ipcRenderer;
	ipc.on('ASYNC-MSG-Replay', function(event, arg) {
		$("#preResult").html(arg);
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
});
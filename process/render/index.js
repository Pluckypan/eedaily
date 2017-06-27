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
		renderMap();
		$("#li-dashboard").attr("class", "");
		$("#li-about").attr("class", "active");
		$("#col-dashboard").css("display", "none");
		$("#col-about").css("display", "block");
	});
});

function renderMap() {
	var mapData = {
		"CN": 100
	};
	$('#world-map').html("");
	$('#world-map').vectorMap({
		map: 'world_mill_en',
		backgroundColor: "transparent",
		regionStyle: {
			initial: {
				fill: '#e4e4e4',
				"fill-opacity": 1,
				stroke: 'none',
				"stroke-width": 0,
				"stroke-opacity": 0
			}
		},
		series: {
			regions: [{
				values: mapData,
				scale: ["#1ab394", "#22d6b1"],
				normalizeFunction: 'polynomial'
			}]
		}
	});
}
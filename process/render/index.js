const ipc = require('electron').ipcRenderer;
$(function() {
	$("#btnSync").click(function() {
		const reply = ipc.sendSync('SYNC-MSG', 'ping');
		$("#preResult").html(reply);
	});
	$("#btnAsync").click(function() {
		ipc.send('ASYNC-MSG', 'ping-ping-ping');
	});
	$("#btnAjax").click(function(){
		$.ajax({
			type:"get",
			url:"http://wthrcdn.etouch.cn/weather_mini?city=青岛",
			async:true,
			success:function(data){
				$("#preResult").html(data);
			},
			error:function(err){
				$("#preResult").html(err);
			}
		});
	});
});
ipc.on('ASYNC-MSG-Replay', function(event, arg) {
	$("#preResult").html(arg);
})
$(document).ready(function() {
	var mapData = {
		"CN": 100
	};

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
});
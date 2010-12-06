## A direction picker for JS 

A picker for choosing a direction, or click in the center to choose no direction

Requires RaphaelJS


	new AzimuthPicker({
		id: 'myId',
		accuracy: 4, // 2 = NSEW, 3 = 8 directions, 4 = 16 directions etc
		onchange: function(azimuth){}, // in degrees clockwise from north
	});




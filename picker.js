function AzimuthPicker(options){

	this.options = options;
	var t = this;
	this.paper = Raphael(document.getElementById(options.id), options.size, options.size);

	var cols = {
		off: '#eed',
		hover: 'blue',
		selected: 'red'
	};


	var p = this.paper;
	var margin = 5;
	var mx = (this.options.size - margin*2) / 2;

	var wedgeCount = Math.pow(2, this.options.accuracy);
	// create wedges
	var c;
	var wedges = [];
	var wedAng = 360 / wedgeCount;
	var w;
	var ms = 4000;

	var selected = t.options.selected ? Math.round(t.options.selected / wedAng) : '';

	function select(no){
		no = no % wedgeCount;
		// if the same the deselect
		if (selected === no){
			if (selected !== '') wedges[no].attr({fill: cols.off}).toBack();
			no = '';
		}

		// unselect old
		if (selected !== ''){
			wedges[selected].attr({fill: cols.off}).toBack();
		}
		selected = no;
		if (selected !== ''){
			wedges[selected].attr({fill: cols.selected}).toFront();
		}
		t.options.onchange( selected === '' ? '' : selected*wedAng );

		// display center
		if (selected === ''){
			center.attr({fill: cols.selected }).toFront();
		} else {
			center.attr({fill: cols.off });
		}
	}

	function sector(cx, cy, r, startAngle, endAngle, params) {
		var rad = Math.PI / 180;
		var x1 = cx + r * Math.cos(-startAngle * rad),
		x2 = cx + r * Math.cos(-endAngle * rad),
		y1 = cy + r * Math.sin(-startAngle * rad),
		y2 = cy + r * Math.sin(-endAngle * rad);
		return paper.path(["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params);
	}

	function makeWedge(no){
		var ang1 = -90 - wedAng * (no+.5);
		var w = sector(mx+margin, mx+margin, mx, ang1, ang1 + wedAng, {
			'fill': selected === no ? cols.selected : cols.off,
			'stroke-width': 1.8

		});
		w.mouseover(function(){
			w.attr({fill: cols.hover}).toFront();
		});
		w.mouseout(function(){
			w.attr({fill: selected === no ? cols.selected : cols.off})
			if (selected !== no){ w.toBack(); }
		});
		w.click(function(){
			select(no);
		});
		return w;
	}

	for(c=0; c<wedgeCount; c++){
		wedges[c] = makeWedge(c);
	}

	// create centre
	var center = paper.circle(mx+margin, mx+margin, t.options.size / 7)
		.attr({fill: selected === '' ? cols.selected : cols.off })
		.click(function(){
			select('');
		})
		;


	select(selected);

}

AzimuthPicker.prototype.setAzimuth = function(angle){
	this.angle = angle;
	// do some mod stuff
	// highlight the new one
	// unhighligh the old one
}


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

	// create background
	p.circle(mx+margin,mx+margin,mx)
	.attr({
		fill: 'r#fff-#ccc'
	});

	var selected = '';

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
			'fill': cols.off,
			'stroke-width': 1.8

		});
		w.mouseover(function(){
			w.attr({fill: cols.hover});
		});
		w.mouseout(function(){
			w.attr({fill: selected === no ? cols.selected : cols.off});
		});
		w.click(function(){
			if (selected === no){
				selected = '';
				t.options.onchange('');
				w.attr({fill: cols.off});
				return;
			}
			if (selected !== ''){
				// unselect old
				wedges[selected].attr({fill: cols.off});
			}
			t.options.onchange( no*wedAng );
			selected = no;
			w.attr({fill: cols.selected});
		});
		return w;
	}

	for(c=0; c<wedgeCount; c++){
		wedges[c] = makeWedge(c);
	}


	// create centre



}

AzimuthPicker.prototype.setAzimuth = function(angle){
	this.angle = angle;
	// do some mod stuff
	// highlight the new one
	// unhighligh the old one
}


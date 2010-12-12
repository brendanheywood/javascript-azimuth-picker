/**
 *
 */
function AzimuthPicker(options){

	this.options = options;
	var t = this;
	this.paper = Raphael(document.getElementById(options.id), options.size, options.size);

	this.cols = {
		off: '#eed',
		hover: 'blue',
		selected: 'red'
	};

	var p = this.paper;
	var margin = 5;
	var mx = (this.options.size - margin*2) / 2;

	this.wedgeCount = Math.pow(2, this.options.accuracy);
	// create wedges
	var c;
	this.wedges = [];
	this.wedAng = 360 / this.wedgeCount;
	var w;
	var ms = 4000;

	var picker = this;


	function sector(cx, cy, r, startAngle, endAngle, params) {
		var rad = Math.PI / 180;
		var x1 = cx + r * Math.cos(-startAngle * rad),
		x2 = cx + r * Math.cos(-endAngle * rad),
		y1 = cy + r * Math.sin(-startAngle * rad),
		y2 = cy + r * Math.sin(-endAngle * rad);
		return picker.paper.path(["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params);
	}

	function makeWedge(no){
		var ang1 = -90 - picker.wedAng * (no+.5);
		var w = sector(mx+margin, mx+margin, mx, ang1, ang1 + picker.wedAng, {
			'fill': picker.selected === no ? picker.cols.selected : picker.cols.off,
			'stroke-width': 1.8

		});
		w.mouseover(function(){
			w.attr({fill: picker.cols.hover}).toFront();
		});
		w.mouseout(function(){
			w.attr({fill: picker.selected === no ? picker.cols.selected : picker.cols.off})
			if (picker.selected !== no){ w.toBack(); }
		});
		w.click(function(){
			picker.select(no);
		});
		return w;
	}

	for(c=0; c<this.wedgeCount; c++){
		this.wedges[c] = makeWedge(c);
	}

	// create centre
	this.center = this.paper.circle(mx+margin, mx+margin, t.options.size / 7)
		.attr({fill: picker.selected === '' ? this.cols.selected : this.cols.off })
		.click(function(){
			picker.select('');
		})
		;

	if ('selected' in t.options){
		this.setAzimuth(t.options.selected);
	}
}
AzimuthPicker.prototype.select = function(no){
	no = no === '' ? no : no % this.wedgeCount;
	// if the same the deselect
	if (this.selected === no){
		if (this.selected !== '') this.wedges[no].attr({fill: this.cols.off}).toBack();
		no = '';
	}

	// unselect old
	if (this.selected !== '' && this.wedges[this.selected]){
		this.wedges[this.selected].attr({fill: this.cols.off}).toBack();
	}
	this.selected = no;
	if (this.selected !== '' && this.wedges[this.selected]){
		this.wedges[this.selected].attr({fill: this.cols.selected}).toFront();
	}
	this.options.onchange( this.selected === '' ? '' : this.selected * this.wedAng );

	// display center
	if (this.selected === ''){
		this.center.attr({fill: this.cols.selected }).toFront();
	} else {
		this.center.attr({fill: this.cols.off });
	}
}

AzimuthPicker.prototype.setAzimuth = function(angle){

	this.select( Math.round(angle / this.wedAng) );
	// do some mod stuff
	// highlight the new one
	// unhighligh the old one
}



$(document).ready(function() {

	// Constants
	var	  CANVAS_WIDTH = 1200
		, CANVAS_HEIGHT = 700;

	// Add canvas to page
	var canvasElement = $("<canvas width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas>");
	window.canvas = canvasElement.get(0).getContext("2d");
	canvasElement.appendTo('body');



	var sampler = new PoissonDiskSampler( CANVAS_WIDTH, CANVAS_HEIGHT, 30, 30 );
	sampler.grid.drawGrid( canvas );

	var solution = sampler.sampleUntilSolution();
	sampler.drawOutputList( canvas )

/*
	// Render loop
	var timer = setInterval( function(){
		if ( ! sampler.sample() ){
			console.log( "Done. "+sampler.outputList.length+" points found...like a boss." );
			clearInterval( timer );
		}
		sampler.drawOutputList( canvas );

	}, 1);
*/

});



PoissonDiskSampler.prototype.drawOutputList = function( canvas ){
	for ( var i = 0; i < this.outputList.length; i++ ){
		this.grid.drawPoint( this.outputList[ i ], "#444", canvas );
	}
}


Grid.prototype.drawGrid = function( canvas ){

	canvas.lineWidth = 0.05;
	canvas.strokeStyle = 'black';

	// Borders
	canvas.beginPath();
	canvas.moveTo( 0, 0 );
	canvas.lineTo( this.width, 0 );
	canvas.lineTo( this.width, this.height );
	canvas.lineTo( 0, this.height );
	canvas.lineTo( 0, 0 );
	canvas.stroke();

	// Vertical lines
	for ( var x = 1; x < this.cellsWide; x++ ){
		canvas.beginPath();
		canvas.moveTo( x * this.cellSize, 0 );
		canvas.lineTo( x * this.cellSize, this.height );
		canvas.stroke();
	}

	// Horizontal lines
	for ( var y = 1; y < this.cellsHigh; y++ ){
		canvas.beginPath();
		canvas.moveTo( 0, y * this.cellSize );
		canvas.lineTo( this.width, y * this.cellSize );
		canvas.stroke();
	}
}

Grid.prototype.drawPoint = function( point, color, canvas ){
	// Default color
	color =  color || '#aaa';
	// Draw a circle
	canvas.beginPath();
	// arc(x, y, radius, startAngle, endAngle, anticlockwise)
	canvas.arc( point.x, point.y, this.pointSize, 0, 2 * Math.PI, false);
	canvas.fillStyle = color;
	canvas.fill();
}

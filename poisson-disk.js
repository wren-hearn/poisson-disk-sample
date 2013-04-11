
// Constants
var	  CANVAS_WIDTH = 700
	, CANVAS_HEIGHT = 500;

// Add canvas to page
var canvasElement = $("<canvas width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas>");
var canvas = canvasElement.get(0).getContext("2d");
canvasElement.appendTo('body');






function Grid( width, height, minDistance ){
	this.width = width;
	this.height = height;
	this.minDistance = minDistance;
	this.cellSize = this.minDistance / Math.SQRT2;

	this.cellsWide = Math.ceil( this.width / this.cellSize );
	this.cellsHigh = Math.ceil( this.height / this.cellSize );

	// Initialize grid
	this.grid = [];
	for ( var x = 0; x < this.cellsWide; x++ ){
		this.grid[x] = []
		for ( var y = 0; y < this.cellsHigh; y++ ){
			this.grid[x][y] = null;
		}
	}
}

Grid.prototype.drawGrid = function( canvas ){

	canvas.lineWidth = 0.2;
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


function RandomQueue( a ){
	this.queue = a;
}

RandomQueue.prototype.push = function( element ){
	this.queue.push( element );
}

RandomQueue.prototype.pop = function(){

	randomIndex = getRandomInt( 0, this.queue.length );
	while( this.queue[randomIndex] === undefined ){
		randomIndex = getRandomInt( 0, this.queue.length );
	}

	element = this.queue[ randomIndex ];
	this.queue.remove( randomIndex );
	return element;
}

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


var demo = new Grid( CANVAS_WIDTH, CANVAS_HEIGHT, 20 );
demo.drawGrid( canvas );

var rq = new RandomQueue( [1,2,3,4,5,6,7,8,9] );
console.log( rq.pop() );
console.log( rq.pop() );
console.log( rq.pop() );
console.log( rq.pop() );
console.log( rq.pop() );
console.log( rq.pop() );
console.log( rq.pop() );
console.log( rq.queue );

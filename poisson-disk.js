
// Constants
var	  CANVAS_WIDTH = 700
	, CANVAS_HEIGHT = 500;

// Add canvas to page
var canvasElement = $("<canvas width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas>");
var canvas = canvasElement.get(0).getContext("2d");
canvasElement.appendTo('body');


function PoissonDiskSampler( width, height, minDistance, sampleFrequency ){
	this.grid = new Grid( width, height, minDistance );
	this.outputList = new Array();
	this.processingQueue = new RandomQueue();

	// Generate first point
	this.queueToAll( this.grid.randomPoint() );

}

PoissonDiskSampler.prototype.queueToAll = function ( point ){
	this.processingQueue.push( point );
	this.outputList.push( point );
	this.grid.addPointToGrid( point, this.grid.pixelsToGridCoords( point ) );
}

PoissonDiskSampler.prototype.drawOutputList = function( canvas ){
	for ( var i = 0; i < this.outputList.length; i++ ){
		this.grid.drawPoint( this.outputList[ i ], "#aaa", canvas );
	}
}



function Grid( width, height, minDistance ){
	this.width = width;
	this.height = height;
	this.minDistance = minDistance;
	this.cellSize = this.minDistance / Math.SQRT2;
	console.log( this.cellSize );

	this.cellsWide = Math.ceil( this.width / this.cellSize );
	this.cellsHigh = Math.ceil( this.height / this.cellSize );

	// Initialize grid
	this.grid = [];
	for ( var x = 0; x < this.cellsWide; x++ ){
		this.grid[x] = [];
		for ( var y = 0; y < this.cellsHigh; y++ ){
			this.grid[x][y] = null;
		}
	}
}

Grid.prototype.pixelsToGridCoords = function( point ){
	var gridX = Math.floor( point.x / this.cellSize );
	var gridY = Math.floor( point.y / this.cellSize );
	return { x: gridX, y: gridY };
}

Grid.prototype.addPointToGrid = function( pointCoords, gridCoords ){
	this.grid[ gridCoords.x ][ gridCoords.y ] = pointCoords;
}

Grid.prototype.randomPoint = function(){
	return { x: getRandomArbitrary(0,this.width), y: getRandomArbitrary(0,this.height) };
}

Grid.prototype.randomPointAround = function( point ){
	var r1 = Math.random();
	var r2 = Math.random();
	// get a random radius between the min distance and 2 X mindist
	var radius = this.minDistance * (r1 + 1);
	// get random angle around the circle
	var angle = 2 * Math.PI * r2;
	// get x and y coords based on angle and radius
	var x = point.x + radius * Math.cos( angle );
	var y = point.y + radius * Math.sin( angle );
	return { x: x, y: y };
}

Grid.prototype.inNeighborhood = function( point ){
	var gridPoint = this.pixelsToGridCoords( point );

	// TODO cells around point

	for ( var i = 0; i < cellsAroundPoint.length; i++ ){
		if ( cellsAroundPoint[i] != null ){
			if ( this.calcDistance( cellsAroundPoint[i], point ) < this.minDistance ){
				return true;
			}
		}
	}
	return false;

/*
  //get the neighbourhood if the point in the grid
  cellsAroundPoint = squareAroundPoint(grid, gridPoint, 5)
  for every cell in cellsAroundPoint
    if (cell != null)
      if distance(cell, point) < mindist
        return true
  return false
*/

}

Grid.prototype.calcDistnce = function( pointInCell, point ){
	return (point.x - pointInCell.x)*(point.x - pointInCell.x)
	     + (point.y - pointInCell.y)*(point.y - pointInCell.y)
}


Grid.prototype.drawPoint = function( point, color, canvas ){
	// Default color
	color =  color || '#aaa';
	// Draw a circle
	canvas.beginPath();
	canvas.arc( point.x, point.y, 3, 0, 2 * Math.PI, false);
	canvas.fillStyle = color;
	canvas.fill();
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
	this.queue = a || new Array();
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

// MDN Random Number Functions
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/random
function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


/*
for( var i = 0; i < 30; i++ ){
	point = demo.randomPoint();
	demo.drawPoint( point, null, canvas );
}
*/

var sampler = new PoissonDiskSampler( CANVAS_WIDTH, CANVAS_HEIGHT, 40, 30 );
sampler.grid.drawGrid( canvas );

for ( var i = 0; i < 30; i++ ){
	sampler.outputList.push( sampler.grid.randomPointAround(sampler.outputList[0]) );
}
sampler.drawOutputList( canvas );


console.log( sampler );




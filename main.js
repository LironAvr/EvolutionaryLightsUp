var lightsUpFile = require('./LightsUp.js');
var conf = require('./Config.js');
var Evolution = require('./Evolution.js');

var CellType = lightsUpFile.CellType;
var LightsUp = lightsUpFile.LightsUp;

var maxFitness = Number.MAX_SAFE_INTEGER;
var lastFitness = Number.MAX_SAFE_INTEGER;

LightsUp.printBoard();
var missing_blocks = LightsUp.preProcess();
Evolution.initiate(missing_blocks.length, conf.generation_size);

while (maxFitness > 0){

}

var lightsUpFile = require('./LightsUp.js');
var conf = require('./Config.js');
var Evolution = require('./Evolution.js');

var CellType = lightsUpFile.CellType;
var LightsUp = lightsUpFile.LightsUp;

var maxFitness = Number.MAX_SAFE_INTEGER;
var lastFitness = Number.MAX_SAFE_INTEGER;
console.log('initial board: ');
LightsUp.printBoard();
var missing_blocks = LightsUp.preProcess();
console.log('after preprocess:');
LightsUp.printBoard();
Evolution.initiate(missing_blocks.length, conf.generation_size);
console.log('after initial generation:');
LightsUp.printBoard();

while (maxFitness > 0){
    Evolution.calcGenerationFitness();
    Evolution.generation.sort((a, b) => (a.fitness - b.fitness));
    maxFitness = Evolution.generation[0].fitness;
    console.log('after calc fitness');
    LightsUp.printBoard();

}

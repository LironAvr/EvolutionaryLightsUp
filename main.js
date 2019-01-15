var lightsUpFile = require('./LightsUp.js');
var conf = require('./Config.js');

var CellType = lightsUpFile.CellType;
var LightsUp = lightsUpFile.LightsUp;

var individuos = [];

LightsUp.printBoard();
var missing_blocks = LightsUp.preProcess();

for (var i = 0; i < conf.muestra; i++) {
    individuos[i] = {};
    individuos[i].genome = Genetics.getRandomGenome();
}

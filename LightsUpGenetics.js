var LightsUp = require('./LightsUp.js').LightsUp;
var Genetics = {};

Genetics.getRandomGenome = function (genomeSize) {
    var randomGenome = new Array();
    for(var i=0; i < genomeSize; i++ ){
        /// ToDo random genome
    }
};

Genetics.evaluateGenome = function (genome ) {
    var fitness = 0;

    //num of empty cells * 10
    boardTemp = LightsUp.board;
};

module.export = Genetics;

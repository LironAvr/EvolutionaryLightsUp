var LightsUp = require('./LightsUp.js').LightsUp;
var Evolution = {};

Evolution.generation = [];
Evolution.genomeLength = 0;
Evolution.generationSize = 0;


Evolution.initiate = function(genomeLength, generationSize){
    Evolution.generationSize = generationSize;
    Evolution.genomeLength = genomeLength;
    for(let i = 0; i < generationSize; i++){
        Evolution.generation[i] = {};
        Evolution.generation[i].genome = Evolution.createIndividual();
    }
};

Evolution.createIndividual = function(){
    let individual = [];
    for(let i = 0; i < Evolution.genomeLength; i++){
        if(Math.random() > 0.7)
            individual.push(1);
        else
            individual.push(0);
    }
    return individual;
};

Evolution.calcGenerationFitness = function(){
    for(var i = 0; i < this.generationSize; i++){
        this.fitness(Evolution.generation[i]);
    }
};

Evolution.fitness = function(individual){
    var tempBoard = LightsUp.board.map(x => Object.assign({}, x));
    LightsUp.assignmentLightsOnBoard(tempBoard, individual.genome);
    individual.fitness = LightsUp.numOfUnlightCells(tempBoard) * 10;
};

Evolution.mutate = function(individual){
    let location = Math.floor(Math.random() * individual.genome.length);
    if(individual.genome[location] == 1)
        individual.genome[location] = 0;
    else
        individual.genome[location] = 1;
};

Evolution.crossOver1 = function(ind1, ind2){
    var a = ind1.genome, b = ind2.genome;
    if (Math.random() > 0.5){
        a = ind2.genome;
        b = ind1.genome;
    }

    for (var i = Math.floor(a.length / 2); i < a.length; i++)
        a[i] = b[i];

    return a;
};

Evolution.crossOver2 = function(ind1, ind2){
    var a = ind1.genome, b = ind2.genome;
    for(var i = 0; i < a.length; i++){
        if(Math.random() > 0.5)
            a[i] = b[i];
    }
    return a;
};

Evolution.parentSelection = function(){

};

Evolution.survivorSelection = function(){

};

// Evolution.initiate(10, 50);
// for (let i = 0; i < 2; i++)
// console.log(Evolution.generation[i].genome.toString());
// console.log(Evolution.crossOver1(Evolution.generation[0], Evolution.generation[1]));
module.exports = Evolution;

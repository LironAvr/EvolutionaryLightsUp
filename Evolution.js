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
    individual.fitness = (LightsUp.numOfUnlightCells(tempBoard) + LightsUp.getCollisions(tempBoard) + LightsUp.lightsSatisfaction(tempBoard)) * 10;
};

Evolution.mutate = function(individual){
    let location = Math.floor(Math.random() * individual.genome.length);
    if(individual.genome[location] == 1)
        individual.genome[location] = 0;
    else
        individual.genome[location] = 1;
};

Evolution.mutate2 = function(individual){
    for(let i = 0; i < individual.genome.length; i++){
        if(Math.random() < 0.5){
            if(individual.genome[i] == 1)
                individual.genome[i] = 0;
            else
                individual.genome[i] = 1;
        }
    }
};

Evolution.crossOver1 = function(ind1, ind2){
    var a = ind1.genome.slice(), b = ind2.genome.slice();
    if (Math.random() > 0.5){
        a = ind2.genome.slice();
        b = ind1.genome.slice();
    }

    for (var i = Math.floor(a.length / 2); i < a.length; i++)
        a[i] = b[i];

    return a;
};

Evolution.crossOver2 = function(ind1, ind2){
    var a = ind1.genome.slice(), b = ind2.genome.slice();
    for(var i = 0; i < a.length; i++){
        if(Math.random() > 0.5)
            a[i] = b[i];
    }
    return a;
};

Evolution.crossOver3 = function (genA, genB) {
    var a, b;
    if (Math.random() > 0.5) {
        a = genA.genome.slice();
        b = genB.genome.slice();
    } else {
        a = genB.genome.slice();
        b = genA.genome.slice();
    }
    for (var i = 0; i < a.length; i++) {
        if (Math.random() > 0.5) {
            a[i] = b[i];
        }
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

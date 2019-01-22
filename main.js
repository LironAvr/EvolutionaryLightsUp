var lightsUpFile = require('./LightsUp.js');
var conf = require('./Config.js');
var Evolution = require('./Evolution.js');

var CellType = lightsUpFile.CellType;
var LightsUp = lightsUpFile.LightsUp;
var generationCounter = 0;

var maxFitness = Number.MAX_SAFE_INTEGER;
var lastFitness = Number.MAX_SAFE_INTEGER;

var fitnessData = [];
var fs = require('fs');

console.log('initial board: ');
LightsUp.printBoard(LightsUp.board);
var missing_blocks = LightsUp.preProcess();
console.log('after preprocess:');
LightsUp.printBoard(LightsUp.board);
Evolution.initiate(missing_blocks.length, conf.generation_size);
console.log('after initial generation:');
LightsUp.printBoard(LightsUp.board);
console.log('Genome length : '+ LightsUp.missing.length);

while (maxFitness > 0 ){//&& generationCounter < conf.number_of_generations){
    Evolution.calcGenerationFitness();
    // Update max fitness
    Evolution.generation.sort((a, b) => (a.fitness - b.fitness));
    maxFitness = Evolution.generation[0].fitness;
    fitnessData.push(maxFitness);

    console.log("Generation: " + generationCounter + " - Best individual: " + maxFitness);

    lastFitness = maxFitness;

    //Evolution.generation.length = Math.floor(conf.generation_size * conf.partGenerationToContinue)//
    //while (Evolution.generation.length < conf.generation_size) {
    //    var hijo = {};
    //    if(true){//Math.random() > conf.mutation_probability){
    //        var x = Math.floor(Math.random() * Evolution.generation.length);
    //        var y = Math.floor(Math.random() * Evolution.generation.length);
    //        hijo.genome = Evolution.crossOver1(Evolution.generation[x], Evolution.generation[y]);
    //        if(Math.random() < conf.mutation_probability){
    //            Evolution.mutate(hijo);
    //        }
    //    } else {
    //        var x = Math.floor(Math.random() * Evolution.generation.length);
    //        hijo.genome = Evolution.generation[x];
    //        Evolution.mutate(hijo);
    //    }
    //    Evolution.generation.push(hijo);
    //}

    let newGeneration = [];
    for(let i = 0; i < conf.generation_size * conf.partGenerationToContinue; i++){
        if(Math.random() < conf.mutation_probability)
            Evolution.mutate(Evolution.generation[i]);
        newGeneration.push(Evolution.generation[i]);
    }

    for(let i = newGeneration.length; i < Evolution.generationSize; i++){
        var ind1 = Math.floor(Math.random() * Evolution.generation.length);
        var ind2 = Math.floor(Math.random() * Evolution.generation.length);
        var newIndividual = {};
        newIndividual.genome = Evolution.crossOver1(Evolution.generation[ind1], Evolution.generation[ind2]);
        if(Math.random() < conf.mutation_probability)
            Evolution.mutate(newIndividual);
        newGeneration.push(newIndividual)
    }

    generationCounter++;
}


fs.writeFile('./FitnessData/formList.txt', fitnessData, 'utf8', function (err) {
  if (err) {
    console.log('Some error occured - file either not saved or corrupted file saved.');
  } else{
    console.log('It\'s saved!');
  }
});

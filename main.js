var lightsUpFile = require('./LightsUp.js');
var conf = require('./Config.js');
var Evolution = require('./Evolution.js');

var CellType = lightsUpFile.CellType;
var LightsUp = lightsUpFile.LightsUp;
var generationCounter = 0;
var no_change_in_fitness = 0;

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
console.log('missing cells: ' );
for (let i =0; i < LightsUp.missing.length; i++)
    console.log(LightsUp.missing[i]);
console.log('Genome length : '+ LightsUp.missing.length);



while (maxFitness > 0 && generationCounter < conf.number_of_generations){
    Evolution.calcGenerationFitness();
    let covHash = {};

    for (let i = 0; i < Evolution.generation.length; i++){
        if (covHash[Evolution.generation[i].genome]){
            covHash[Evolution.generation[i].genome]+=1;
        }
        else{
            covHash[Evolution.generation[i].genome]=1;
        }
    }

    for (let i = 0; i < Evolution.generation.length; i++){
        Evolution.generation[i].fitness= Evolution.generation[i].fitness * covHash[Evolution.generation[i].genome];
        //*Math.floor(individuals.length/i);
        // covHash[Evolution.generation[i].genome]+=1;
    }


    // Update max fitness
    Evolution.generation.sort((a, b) => (a.fitness - b.fitness));


    maxFitness = Evolution.generation[0].fitness;
    fitnessData.push(maxFitness);

    console.log("Generation: " + generationCounter + " - Best individual: " + maxFitness);

    lastFitness = maxFitness;

    /*
    Evolution.generation.length = Math.floor(conf.generation_size * conf.partGenerationToContinue);
    while (Evolution.generation.length < conf.generation_size) {
        var hijo = {};

        if(Math.random() > conf.mutation_probability){
            var x = Math.floor(Math.random() * Evolution.generation.length);
            var y = Math.floor(Math.random() * Evolution.generation.length);
            hijo.genome = Evolution.crossOverByRows(Evolution.generation[x], Evolution.generation[y]);
            if(Math.random() < conf.mutation_probability){
                Evolution.mutate(hijo);
            }
        } else {
            var x = Math.floor(Math.random() * Evolution.generation.length);
            hijo.genome = Evolution.generation[x].genome.slice();
            Evolution.mutate2(hijo);
            //hijo.genome = Evolution.createIndividual();
        }
        Evolution.generation.push(hijo);
    }

    */
    let keepCount = Math.floor(conf.generation_size * conf.percentage_winners);

    let newArray = [];

    for (let i = 0; i<keepCount; i++){
        var child = {};
        child.genome = Evolution.generation[i].genome.slice();


        if(Math.random() < conf.crossover_probability){
            var x = Math.floor(Math.random() * Evolution.generation.length  /*keepCount*/);
            let childGenome = Evolution.crossoverGenomesZiv(child.genome.slice(), Evolution.generation[x].genome.slice());
            let individual={};
            individual.genome = childGenome;
            Evolution.fitness(individual);
            Evolution.fitness(child);

            if (individual.fitness < child.fitness){
                child.genome = childGenome;
            }
        }

        if (Math.random() < conf.mutation_probability){
            let mutatedChild = {};
            mutatedChild.genome = child.genome.slice();
            Evolution.mutate(mutatedChild);
            Evolution.fitness(mutatedChild);
            Evolution.fitness(child);

            if (mutatedChild.fitness < child.fitness){
                child.genome = mutatedChild.genome.slice();
            }
        }

        newArray.push(child);
    }

    while (newArray.length < conf.generation_size){
        var child = {};
        child.genome = Evolution.createIndividual();
        newArray.push(child);
    }
    Evolution.generation = newArray;
    generationCounter++;
}


fs.writeFile('./FitnessData/formList-'+LightsUp.board.length+'.txt', fitnessData, 'utf8', function (err) {
  if (err) {
    console.log('Some error occured - file either not saved or corrupted file saved.');
  } else{
    console.log('It\'s saved!');
  }
});

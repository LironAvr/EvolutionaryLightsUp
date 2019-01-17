var lightsUpFile = require('./LightsUp.js');
var conf = require('./Config.js');
var Evolution = require('./Evolution.js');

var CellType = lightsUpFile.CellType;
var LightsUp = lightsUpFile.LightsUp;
var generationCounter = 0;

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
    // Update max fitness
    Evolution.generation.sort((a, b) => (a.fitness - b.fitness));
    maxFitness = Evolution.generation[0].fitness;
    // console.log('after calc fitness');
    // LightsUp.printBoard();

    if(maxFitness < lastFitness) {
        console.log("Generation: " + generationCounter + " - Mejor individual: " + maxFitness);
        // Kakuro.printMatrixWithData(Kakuro.buildDataMatrix(individuos[0].genome));
    } else {
        console.log("Evaluation generation " + generationCounter);
        // process.stdout.cursorTo(0);
    }

    lastFitness = maxFitness;

    Evolution.generation.length = Math.floor(conf.generation_size * conf.partGenerationToContinue);

    while (Evolution.generation.length < conf.generation_size) {
        var hijo = {};
        if(Math.random() > conf.mutation_probability){
            var x = Math.floor(Math.random() * Evolution.generation.length);
            var y = Math.floor(Math.random() * Evolution.generation.length);
            hijo.genome = Evolution.crossOver1(Evolution.generation[x], Evolution.generation[y]);
            if(Math.random() < conf.mutation_probability){
                Evolution.mutate(hijo);
            }
        } else {
            var x = Math.floor(Math.random() * Evolution.generation.length);
            hijo.genome = Evolution.generation[x];
            Evolution.mutate(hijo);
        }
        Evolution.generation.push(hijo);
    }

    generationCounter++;
}

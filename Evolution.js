var Evolution = {};

Evolution.generation = [];
Evolution.genomeLength = 0;


Evolution.initiate = function(genomeLength, generationSize){
    Evolution.genomeLength = genomeLength;
    for(let i = 0; i < generationSize; i++){
        Evolution.generation[i] = {};
        Evolution.generation[i].genome = Evolution.createIndividual();
    }
};

Evolution.createIndividual = function(){
    let individual = []
    for(let i = 0; i < Evolution.genomeLength; i++){
        if(Math.random() > 0.7)
            individual.push(1);
        else
            individual.push(0);
    }
    return individual;
};

Evolution.fitness = function(individual){

};

Evolution.mutate = function(individual){
    let location = Math.floor(Math.random() * Evolution.genomeLength);
    if(individual.genome[location] == 1)
        individual.genome[location] = 0;
    else
        individual.genome[location] = 1;
};

Evolution.crossOver = function(ind1, ind2){

};




var Evolution = {};

Evolution.generation = [];
Evolution.genomeLength = 0;


Evolution.initiate = function(genomeLength, generationSize){
    Evolution.genomeLength = genomeLength;
    for(let i = 0; i < generationSize; i++){
        Evolution.generation.push(Evolution.createIndividual());
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
    Evolution.generation.push(individual);
};

Evolution.fitness = function(individual){

};

Evolution.mutate = function(individual){

};

Evolution.crossOver = function(ind1, ind2){

};




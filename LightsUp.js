let LightsUp = {};

LightsUp.fill = function(row, col, locations, fill_value){
    for (let location in locations) {
        switch (location) {
            case 'left':
                LightsUp[row][col - 1] = fill_value;
                break;
            case 'up':
                LightsUp[row - 1][col] = fill_value;
                break;
            case 'right':
                LightsUp[row][col + 1] = fill_value;
                break;
            case 'down':
                LightsUp[row + 1][col] = fill_value;
                break;
        }
    }
};

LightsUp.preProccess = function (){
    let not_done = true;
    let round = 4;
    for(let row = 0; row < LightsUp.length; row ++) {
        for(let col = 0; col < LightsUp.length; col ++){
            let locations = ['left', 'up', 'right', 'down'];
            if (LightsUp[row][col] === 0)
                LightsUp.fill (row, col, locations, fill_value)
        }}

    while(not_done){
        notDone = false;
        for(let row = 0; row < LightsUp.length; row ++) {
            for(let col = 0; col < LightsUp.length; col ++){
                if ()
            }
        }
    }
};

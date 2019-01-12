var LightsUp = {};

LightsUp.board = [
    [5,5,-1,5,0,5,5],
    [5,5,5,5,5,5,5],
    [0,5,5,5,5,5,0],
    [5,5,5,1,5,5,5],
    [2,5,5,5,5,5,-1],
    [5,5,5,5,5,5,5],
    [5,5,-1,5,-1,5,5]
];

var CellType = {"BLOCK":-1,
    "ZERO_LIGHTS":0,
    "ONE_LIGHT":1,
    "TWO_LIGHTS":2,
    "THREE_LIGHTS":3,
    "FOUR_LIGHTS":4,
    "NO_LIGHT":5,
    "LIGHT_BULB":6,
    "LIGHT":7,
    "INVALID":8}

LightsUp.fill_board = function(row, col, directions, fill_value){
    for (var direction in directions) {
        switch (direction) {
            case 'left':
                this.board[row][col - 1] = fill_value;
                if (fill_value == CellType.LIGHT_BULB)
                    LightsUp.light(row, col);
                break;

            case 'up':
                this.board[row - 1][col] = fill_value;
                if (fill_value == CellType.LIGHT_BULB)
                    LightsUp.light(row, col);
                break;

            case 'right':
                this.board[row][col + 1] = fill_value;
                if (fill_value == CellType.LIGHT_BULB)
                    LightsUp.light(row, col);
                break;

            case 'down':
                this.board[row + 1][col] = fill_value;
                if (fill_value == CellType.LIGHT_BULB)
                    LightsUp.light(row, col);
                break;
        }
    }
};

LightsUp.light = function(row, col) {

    //Light Up
    let i = row - 1;
    while (i >= 0 && LightsUp.board[i][col] == (CellType.NO_LIGHT | CellType.INVALID | CellType.LIGHT)) {
        LightsUp.board[i][col] = CellType.LIGHT;
        i--;
    }

    //Light Down
    i = row + 1;
    while (i < LightsUp.board.length && LightsUp.board[i][col] == (CellType.NO_LIGHT | CellType.INVALID | CellType.LIGHT)) {
        LightsUp.board[i][col] = CellType.LIGHT;
        i++;
    }

    //Light Left
    i = col - 1;
        while (i >= 0 && LightsUp.board[row][i] == (CellType.NO_LIGHT | CellType.INVALID | CellType.LIGHT)) {
        LightsUp.board[row][i] = CellType.LIGHT;
        i--;
    }

    //Light Right
    i = col + 1;
    while (i < LightsUp.board[0].length && LightsUp.board[row][i] == (CellType.NO_LIGHT | CellType.INVALID | CellType.LIGHT)) {
        LightsUp.board[row][i] = CellType.LIGHT;
        i++;
    }
};

LightsUp.validateDirection = function(row, col, direction){
    if (LightsUp.board[row][col] != (CellType.LIGHT | CellType.NO_LIGHT))
        return false;

    switch(direction){
        case "up":
            for(let current = row - 1; current >= 0; current--){
                if(LightsUp.board[current][col] == CellType.LIGHT_BULB)
                    return false;
                else if(LightsUp.board[current][col] < CellType.NO_LIGHT)
                    break;
            }
            return true;

        case "down":
            for(let current = row + 1; current < LightsUp.board.length; current++){
                if(LightsUp.board[current][col] == CellType.LIGHT_BULB)
                    return false;
                else if(LightsUp.board[current][col] < CellType.NO_LIGHT)
                    break;
            }
            return true;

        case "left":
            for(let current = col - 1; current >= 0; current--){
                if(LightsUp.board[row][current] == CellType.LIGHT_BULB)
                    return false;
                else if(LightsUp.board[row][current] < CellType.NO_LIGHT)
                    break;
            }
            return true;

        case "right":
            for(let current = col + 1; current < LightsUp.board[0].length; current++){
                if(LightsUp.board[row][current] == CellType.LIGHT_BULB)
                    return false;
                else if(LightsUp.board[row][current] < CellType.NO_LIGHT)
                    break;
            }
            return true;
    }
};

LightsUp.checkValidDirections = function(row, col){

    let valid_directions = [];
    let current = row - 1;

    //Up
    if (current >= 0 && LightsUp.validateDirection(current, col, "up")){
        valid_directions.push("up");
    }

    //Down
    current = row + 1;
    if (current < LightsUp.board.length && LightsUp.validateDirection(current, col, "down")){
        valid_directions.push("down");
    }

    //Left
    current = col - 1;
    if (current >= 0 && LightsUp.validateDirection(row, current, "left")){
        valid_directions.push("left");
    }

    //Right
        current = col + 1;
    if (current < LightsUp.board[0].length && LightsUp.validateDirection(row, current, "right")){
        valid_directions.push("right");
    }

    return valid_directions;
};

LightsUp.preProccess = function (){
    let not_done = true;
    let round = 3;
    for(let row = 0; row < LightsUp.board.length; row ++) {
        for(let col = 0; col < LightsUp.board.length; col ++){
            let directions = ['left', 'up', 'right', 'down'];
            if (LightsUp.board[row][col] == CellType.ZERO_LIGHTS)
                LightsUp.fill(row, col, directions, CellType.INVALID)
            else if (LightsUp.board[row][col] == CellType.FOUR_LIGHTS)
                LightsUp.fill(row, col, directions, CellType.LIGHT_BULB);
        }}

    while(not_done){
        notDone = false;
        for(let row = 0; row < LightsUp.length; row ++) {
            for(let col = 0; col < LightsUp.length; col ++){
                if (LightsUp.board[row][col] == round) {
                    let valid_directions = LightsUp.CheckValidDirections(row, col);

                }
            }
        }
    }
};

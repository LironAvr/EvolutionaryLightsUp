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

LightsUp.fill_board = function(row, col, locations, fill_value){
    for (var location in locations) {
        switch (location) {
            case 'left':
                this.board[row][col - 1] = fill_value;
                break;
            case 'up':
                this.board[row - 1][col] = fill_value;
                break;
            case 'right':
                this.board[row][col + 1] = fill_value;
                break;
            case 'down':
                this.board[row + 1][col] = fill_value;
                break;
        }
    }
};

LightsUp.light = function(row, col) {

    //Light Up
    let i = row - 1;
    while (LightsUp.board[i][col] == (CellType.NO_LIGHT | CellType.INVALID | CellType.LIGHT)) {
        LightsUp.board[i][col] = CellType.LIGHT;
        i--;
    }

    //Light Down
    i = row + 1;
    while (LightsUp.board[i][col] == (CellType.NO_LIGHT | CellType.INVALID | CellType.LIGHT)) {
        LightsUp.board[i][col] = CellType.LIGHT;
        i++;
    }

    //Light Left
    i = col - 1;
        while (LightsUp.board[i][col] == (CellType.NO_LIGHT | CellType.INVALID | CellType.LIGHT)) {
        LightsUp.board[i][col] = CellType.LIGHT;
        i--;
    }

    //Light Right
    i = col + 1;
    while (LightsUp.board[i][col] == (CellType.NO_LIGHT | CellType.INVALID | CellType.LIGHT)) {
        LightsUp.board[i][col] = CellType.LIGHT;
        i++;
    }
};

LightsUp.preProccess = function (){
    let not_done = true;
    let round = 4;
    for(let row = 0; row < LightsUp.board.length; row ++) {
        for(let col = 0; col < LightsUp.board.length; col ++){
            let locations = ['left', 'up', 'right', 'down'];
            if (LightsUp.board[row][col] == CellType.ZERO_LIGHTS)
                LightsUp.fill(row, col, locations, CellType.INVALID)
            else if (LightsUp.board[row][col] == CellType.FOUR_LIGHTS)
                LightsUp.fill(row, col, locations, CellType.LIGHT_BULB);
                LightsUp.light(row, col);
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
}

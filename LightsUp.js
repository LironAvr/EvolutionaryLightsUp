var Parser = require('./Parser.js');
var LightsUp = {};
//
// LightsUp.board = [
//     [5,5,-1,5,0,5,5],
//     [5,5,5,5,5,5,5],
//     [0,5,5,5,5,5,0],
//     [5,5,5,1,5,5,5],
//     [2,5,5,5,5,5,-1],
//     [5,5,5,5,5,5,5],
//     [5,5,-1,5,-1,5,5]
// ];

LightsUp.board = Parser.toMatrix();

LightsUp.missing = {};

let CellType = {"BLOCK":-1,
    "ZERO_LIGHTS":0,
    "ONE_LIGHT":1,
    "TWO_LIGHTS":2,
    "THREE_LIGHTS":3,
    "FOUR_LIGHTS":4,
    "NO_LIGHT":5,
    "LIGHT_BULB":6,
    "LIGHT":7,
    "INVALID":8};

let AllDirections = ["up", "down", "left", "right"]

LightsUp.fill_board = function(row, col, directions, fill_value){
    directions.forEach(function(direction){
        switch (direction) {
            case "left":
                if(col > 0 && LightsUp.board[row][col - 1] != CellType.LIGHT_BULB){
                    LightsUp.board[row][col - 1] = fill_value;
                    if (fill_value == CellType.LIGHT_BULB)
                        LightsUp.light(row, col-1, LightsUp.board);
                }
                break;

            case "up":
                if(row > 0 && LightsUp.board[row - 1][col] != CellType.LIGHT_BULB){
                    LightsUp.board[row - 1][col] = fill_value;
                    if (fill_value == CellType.LIGHT_BULB)
                        LightsUp.light(row-1, col, LightsUp.board);
                }
                break;

            case "right":
                if(col + 1 < LightsUp.board[0].length && LightsUp.board[row][col + 1] != CellType.LIGHT_BULB){
                    LightsUp.board[row][col + 1] = fill_value;
                    if (fill_value == CellType.LIGHT_BULB)
                        LightsUp.light(row, col+1, LightsUp.board);
                }
                break;

            case "down":
                if(row + 1 < LightsUp.board.length && LightsUp.board[row + 1][col] != CellType.LIGHT_BULB)
                {
                    LightsUp.board[row + 1][col] = fill_value;
                    if (fill_value == CellType.LIGHT_BULB)
                        LightsUp.light(row+1, col, LightsUp.board);
                }
                break;
        }
    })
};

function lightable(row, col, board){
    return ((board[row][col] == CellType.LIGHT) || (board[row][col] == CellType.NO_LIGHT) || (board[row][col] == CellType.INVALID));
}

LightsUp.light = function(row, col, board) {

    //Light Up
    let i = row - 1;
    while (i >= 0 && lightable(i, col, board)){
        board[i][col] = CellType.LIGHT;
        i--;
    }

    //Light Down
    i = row + 1;
    while (i < board.length && lightable(i, col, board)){
        board[i][col] = CellType.LIGHT;
        i++;
    }

    //Light Left
    i = col - 1;
        while (i >= 0 && lightable(row, i, board)){
        board[row][i] = CellType.LIGHT;
        i--;
    }

    //Light Right
    i = col + 1;
    while (i < board.length && lightable(row, i, board)){
        board[row][i] = CellType.LIGHT;
        i++;
    }
};

LightsUp.validateDirection = function(row, col, direction, board){
    if (board[row][col] != CellType.NO_LIGHT)
        return false;

    switch(direction){
        case "up":
            for(let current = row - 1; current >= 0; current--){
                if(board[current][col] == CellType.LIGHT_BULB)
                    return false;
                else if(board[current][col] < CellType.NO_LIGHT)
                    break;
            }
            return true;

        case "down":
            for(let current = row + 1; current < board.length; current++){
                if(board[current][col] == CellType.LIGHT_BULB)
                    return false;
                else if(board[current][col] < CellType.NO_LIGHT)
                    break;
            }
            return true;

        case "left":
            for(let current = col - 1; current >= 0; current--){
                if(board[row][current] == CellType.LIGHT_BULB)
                    return false;
                else if(board[row][current] < CellType.NO_LIGHT)
                    break;
            }
            return true;

        case "right":
            for(let current = col + 1; current < board[0].length; current++){
                if(board[row][current] == CellType.LIGHT_BULB)
                    return false;
                else if(board[row][current] < CellType.NO_LIGHT)
                    break;
            }
            return true;
    }
};

LightsUp.checkValidDirections = function(row, col){

    let valid_directions = [];
    let current = row - 1;

    //Up
    if (current >= 0 && LightsUp.validateDirection(current, col, "up", LightsUp.board)){
        valid_directions.push("up");
    }

    //Down
    current = row + 1;
    if (current < LightsUp.board.length && LightsUp.validateDirection(current, col, "down", LightsUp.board)){
        valid_directions.push("down");
    }

    //Left
    current = col - 1;
    if (current >= 0 && LightsUp.validateDirection(row, current, "left", LightsUp.board)){
        valid_directions.push("left");
    }

    //Right
        current = col + 1;
    if (current < LightsUp.board[0].length && LightsUp.validateDirection(row, current, "right", LightsUp.board)){
        valid_directions.push("right");
    }

    return valid_directions;
};

LightsUp.checkMissingLights = function(row, col, count, board){
    let ans = count;

    //up
    if (row > 0 && board[row - 1][col] == CellType.LIGHT_BULB)
        ans--;

    //down
    if (row + 1 < board.length && board[row + 1][col] == CellType.LIGHT_BULB)
        ans--;

    //left
    if (col > 0 && board[row][col - 1] == CellType.LIGHT_BULB)
        ans--;

    //right
    if (col + 1 < board.length && board[row][col + 1] == CellType.LIGHT_BULB)
        ans--;
    return ans;
};

// LightsUp.printBoard_old = function (board) {
//     board.forEach(function (line) {
//         let count = 0;
//         let string = "";
//         line.forEach(function (cell) {
//             switch (cell) {
//                 case CellType.LIGHT_BULB:
//                     string += "| ! ";
//                     count++;
//                     if (count == board.length) {
//                         console.log(string + "|")
//                         count = 0;
//                     }
//                     break;
//
//                 case CellType.LIGHT:
//                     string += "| ◼ ";
//                     count++;
//                     if (count == board.length) {
//                         console.log(string + "|")
//                         count = 0;
//                     }
//                     break;
//
//                 case CellType.BLOCK:
//                     string += "| * ";
//                     count++;
//                     if (count == board.length) {
//                         console.log(string + "|")
//                         count = 0;
//                     }
//                     break;
//
//                 case CellType.ZERO_LIGHTS:
//                     string += "| 0 ";
//                     count++;
//                     if (count == board.length) {
//                         console.log(string + "|")
//                         count = 0;
//                     }
//                     break;
//
//                 case CellType.ONE_LIGHT:
//                     string += "| 1 ";
//                     count++;
//                     if (count == board.length) {
//                         console.log(string + "|")
//                         count = 0;
//                     }
//                     break;
//
//                 case CellType.TWO_LIGHTS:
//                     string += "| 2 ";
//                     count++;
//                     if (count == board.length) {
//                         console.log(string + "|")
//                         count = 0;
//                     }
//                     break;
//
//                 case CellType.THREE_LIGHTS:
//                     string += "| 3 ";
//                     count++;
//                     if (count == board.length) {
//                         console.log(string + "|")
//                         count = 0;
//                     }
//                     break;
//
//                 case CellType.FOUR_LIGHTS:
//                     string += "| 4 ";
//                     count++;
//                     if (count == board.length) {
//                         console.log(string + "|")
//                         count = 0;
//                     }
//                     break;
//
//                 default:
//                     string += "| ◻ ";
//                     count++;
//                     if (count == board.length) {
//                         console.log(string + "|")
//                         count = 0;
//                     }
//
//             }
//         });
//     });
// };

LightsUp.printBoard = function (board) {
    for (let line = 0; line < board.length; line++) {
        let count = 0;
        let string = "";
        for (let cell = 0; cell < board.length; cell++){
            if(board[line][cell] == CellType.LIGHT_BULB){
                string += "| ! ";
                count++;
                if (count == board.length) {
                    console.log(string + "|")
                    count = 0;
                }
            }
            else if(board[line][cell] == CellType.LIGHT ){
                string += "| ◼ ";
                count++;
                if (count == board.length) {
                   console.log(string + "|")
                   count = 0;
                }
            }
            else if(board[line][cell] == CellType.BLOCK ){
                string += "| * ";
                count++;
                if (count == board.length) {
                    console.log(string + "|")
                    count = 0;
                }
            }
            else if(board[line][cell] == CellType.ZERO_LIGHTS ){
                string += "| 0 ";
                count++;
                if (count == board.length) {
                    console.log(string + "|")
                    count = 0;
                }
            }
            else if(board[line][cell] == CellType.ONE_LIGHT ){
                string += "| 1 ";
                count++;
                if (count == board.length) {
                    console.log(string + "|")
                    count = 0;
                }
            }
            else if(board[line][cell] == CellType.TWO_LIGHTS ){
                string += "| 2 ";
                count++;
                if (count == board.length) {
                    console.log(string + "|")
                    count = 0;
                }
            }
            else if(board[line][cell] == CellType.THREE_LIGHTS ){
                string += "| 3 ";
                count++;
                if (count == board.length) {
                    console.log(string + "|")
                    count = 0;
                }
            }
            else if(board[line][cell] == CellType.FOUR_LIGHTS ){
                string += "| 4 ";
                count++;
                if (count == board.length) {
                    console.log(string + "|")
                    count = 0;
                }
            }
            else {
                string += "| ◻ ";
                count++;
                if (count == board.length) {
                    console.log(string + "|")
                    count = 0;
                }
            }
        }
    }
};

LightsUp.preProcess = function (){
    let not_done = true;
    let round = 3;
    let directions = ['left', 'up', 'right', 'down'];
    for(let row = 0; row < LightsUp.board.length; row ++) {
        for(let col = 0; col < LightsUp.board[0].length; col ++){
            if (LightsUp.board[row][col] == CellType.ZERO_LIGHTS)
                LightsUp.fill_board(row, col, directions, CellType.INVALID)
            else if (LightsUp.board[row][col] == CellType.FOUR_LIGHTS)
                LightsUp.fill_board(row, col, directions, CellType.LIGHT_BULB);
        }}

    while(/*not_done ||*/ round > 0){
        not_done = false;
        for(let row = 0; row < LightsUp.board.length; row ++) {
            for(let col = 0; col < LightsUp.board.length; col ++){
                if (LightsUp.board[row][col] == round) {
                    let valid_directions = LightsUp.checkValidDirections(row, col);
                    let missing_lights = LightsUp.checkMissingLights(row, col, round, LightsUp.board);

                    if (missing_lights > 0 && valid_directions.length == missing_lights){
                        LightsUp.fill_board(row, col, valid_directions, CellType.LIGHT_BULB);
                        // let invalid_directions = AllDirections.filter(x => !valid_directions.includes(x));
                        // LightsUp.fill_board(row, col, invalid_directions, CellType.INVALID);
                        // not_done = true;
                        row = -1;
                        col = -1;
                        round = 3;
                        break;
                    }
                }
            }
        }
        round --;
    }

    let missing_cells = [];
    for(let row = 0; row < LightsUp.board.length; row ++) {
        for(let col = 0; col < LightsUp.board.length; col ++) {
            if(LightsUp.board[row][col] == CellType.NO_LIGHT)
                missing_cells.push({row:row, col:col})
        }
    }
    LightsUp.missing = missing_cells;
    return missing_cells;
};

LightsUp.numOfUnlightCells = function(board){
    var sum = 0;
    for(var i = 0; i < board.length; i++){
        for(var j = 0; j < board.length; j++){
            if(board[i][j] == CellType.INVALID || board[i][j] == CellType.NO_LIGHT)
                sum++;
        }
    }
    return sum;
};

LightsUp.assignmentLightsOnBoard = function(board, genome){
    for (var i = 0; i < genome.length; i++){
        if(genome[i] == 1){
            board[this.missing[i].row][this.missing[i].col] = CellType.LIGHT_BULB;
            this.light(this.missing[i].row, this.missing[i].col, board);
        }
    }
};

LightsUp.misplacedLights = function(board){
    //LightsUp.printBoard(board);
    let errors = 0;
    for(let i = 0; i < board.length; i++){
        for(let k = 0; k < board.length; k++){
            //If its a number block
            if(board[i][k] >= 0 && board[i][k] < 5){
                errors += Math.abs(LightsUp.checkMissingLights(i, k, board[i][k], board));
            }
            else if(board[i][k] == CellType.LIGHT_BULB){
                if(i > 0 && !LightsUp.validateDirection(i, k, "up", board)){
                    errors+= 1;
                }

                if(i < board.length - 1 && !LightsUp.validateDirection(i, k, "down", board)){
                    errors+= 1;
                }

                if(k > 0 && LightsUp.validateDirection(i, k ,"left", board)){
                    errors+= 1;
                }

                if(k < board[0].length - 1 && LightsUp.validateDirection(i, k, "right", board)){
                    errors+= 1;
                }
            }
        }
    }
    //console.log("Errors: " + errors);
    return errors;
};

LightsUp.lightsSatisfaction = function(board){
    //LightsUp.printBoard(board);
    let errors = 0;
    for(let i = 0; i < board.length; i++){
        for(let k = 0; k < board.length; k++){
            //If its a number block
            if(board[i][k] >= 0 && board[i][k] < 5)
                errors += Math.abs(LightsUp.checkMissingLights(i, k, board[i][k], board));
        }
    }
    return errors;
};

LightsUp.getCollisions = function(board) {
    var collision = 0;
    for(let i = 0; i < LightsUp.missing.length; i++){
        var firstRow = LightsUp.missing[i].row;
        var firstCol = LightsUp.missing[i].col;

        //check if exists LIGHT_BULB in i cell
        if(board[firstRow][firstCol] == CellType.LIGHT_BULB) {
            for (let j = 0; j < LightsUp.missing.length; j++) {
                var secondRow = LightsUp.missing[j].row;
                var secondCol = LightsUp.missing[j].col;

                //check if exists LIGHT_BULB in j cell
                if (board[secondRow][secondCol] == CellType.LIGHT_BULB && i != j)
                {
                    //check LIGHT_BULB in same row case
                    if (firstRow == secondRow) {
                        if (firstCol < secondCol) {
                            if (checkRowCollisions(firstCol, secondCol, firstRow, board))
                                collision++;
                        }
                        else {
                            if (checkRowCollisions(secondCol, firstCol, firstRow, board))
                                collision++;
                        }
                    }
                    //check LIGHT_BULB in same col case
                    if (firstCol == secondCol) {
                        if (firstRow < secondRow) {
                            if (checkColCollisions(firstRow, secondRow, firstCol, board))
                                collision++;
                        }
                        else {
                            if (checkColCollisions(secondRow, firstRow, firstCol, board))
                                collision++;
                        }
                    }
                }
            }
        }
    }
    collision = collision / 2;
    return collision ;
};

function checkRowCollisions(lowerCol, higherCol, row, board){
    for(let i = lowerCol+1; i < higherCol; i++){
        if(board[row][i] <= 4) // block cell or block with number cell
            return false;
    }
    return true;
}

function checkColCollisions(lowerRow, higherRow, col, board){
    for(let i = lowerRow+1; i < higherRow; i++){
        if(board[i][col] <= 4) // block cell or block with number cell
            return false;
    }
    return true;
}

module.exports = {
     LightsUp, CellType
};

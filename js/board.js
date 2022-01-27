'use strict'


/*
create a matrix with a given size
gets the number of mine to put in the matrix 
*/
function buildBoard(boardSize, numOfMines) {

    var board = [];
    //get mines locations
    var minesLocations = randomMinesLocations(numOfMines, boardSize);
    for (var i = 0; i < boardSize; i++) {
        var row = [];
        for (var j = 0; j < boardSize; j++) {
            var cell = {
                i,
                j,
                mine: false,
                state: CELL_STATES.HIDDEN
            }
            //set the mine attribute in the cell object if the cell have the same location as one of the mines
            if (minesLocations.some(loc => locationCompare(loc, cell))) {
                cell.mine = true;
                gGame.minesPos.push(cell);
            }
            row.push(cell);
        }
        board.push(row);
    }

    return board;
}
/*
update the board in the DOM
*/
function printBoard(board, selector) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            var data = cell.state;
            strHTML += `<div class="${i},${j}" data-state="${data}"onclick="revealCell(this)" oncontextmenu="markCell(this)"></div>`
        }
    }
    var elContainer = document.querySelector(selector);
    elContainer.style.setProperty("--size", boardSize)
    elContainer.innerHTML = strHTML;
}

/*
gets an element from the DOM
returns the same cell in the matrix
*/
function getCell(element) {
    var cellClass = element.className;
    var cellIdx = cellClass.split(',');
    var i = parseInt(cellIdx[0]);
    var j = parseInt(cellIdx[1]);
    var cell = gBoard[i][j];
    return cell;
}

/*
gets a cell in the matrix
returns all of the cells elements around in the DOM
*/
function getCellsAround(cell) {
    var cellsAround = [];
    for (var i = -1; i <= 1; i++) {
        if ((cell.i + i) < 0 || (cell.i + i) > gBoard.length - 1) {
            continue;
        }
        for (var j = -1; j <= 1; j++) {
            if (cell.j + j < 0 || cell.j + j > gBoard.length - 1) {
                continue;
            }
            cellsAround.push(document.getElementsByClassName(`${cell.i + i},${cell.j + j}`)[0])
        }
    }
    return cellsAround;
}
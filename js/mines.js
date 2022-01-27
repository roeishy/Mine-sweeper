'use strickt'

/*
gets the number of mines and board size
return array of different random locations
*/
function randomMinesLocations(minesNum, boardSize) {
    var locations = [];
    while (locations.length < minesNum) {
        var location = {
            i: getRandomIntInclusive(0, boardSize - 1),
            j: getRandomIntInclusive(0, boardSize - 1)
        }
        if (!locations.some(loc => locationCompare(loc, location))) {
            locations.push(location);
        }

    }
    return locations;
}

/*
reveal all the mines in the board
*/
function revealMines() {
    gGame.minesPos.forEach(element => {
        element.state = CELL_STATES.MINE
    });
    printBoard(gBoard, '.board-container');
}

/*
gets a cell
returns the number of mines around it
*/
function cntMinesAround(cell) {
    var cntMines = 0;
    for (var i = -1; i <= 1; i++) {
        if ((cell.i + i) < 0 || (cell.i + i) > gBoard.length - 1) {
            continue;
        }
        for (var j = -1; j <= 1; j++) {
            if (cell.j + j < 0 || cell.j + j > gBoard.length - 1) {
                continue;
            }
            if (gBoard[cell.i + i][cell.j + j].mine) {
                cntMines++;
            }
        }
    }
    return cntMines;
}
'use strict'

var gBoard = [];
var boardSize = 4;
var numOfMines = 3;
var timerInterval;
const CELL_STATES = {
    HIDDEN: "hidden",
    MINE: "mine",
    NUM: "num",
    MARKED: "marked"
}
const EMOJIS = {
    NORMAL: '😀',
    WIN: '😎',
    LOSE: '🤬'
}

var gGame = {
    minesCnt: undefined,
    markedCnt: undefined,
    hiddenCnt: undefined,
    minesPos: [],
    timer: 0,
    isTimerOn: false,
    lives: 3,
    level: 'easy'
}


function init() {
    clearInterval(timerInterval);
    resetInfo();
    setInfo();
    gBoard = buildBoard(boardSize, numOfMines);
    printBoard(gBoard, '.board-container');
    printScore();
    console.log(gBoard)
    console
}


/*
gets a button element and set the size of the board and number of mines depending on the text in the button
*/
function setLevel(elBtn) {
    var level = elBtn.innerText;
    console.log(level)
    switch (level) {
        case 'easy':
            gGame.level = 'easy';
            boardSize = 4;
            numOfMines = 3;
            init();
            break;
        case 'normal':
            gGame.level = 'normal';
            boardSize = 8;
            numOfMines = 12;
            init();
            break;
        case 'hard':
            gGame.level = 'hard';
            boardSize = 12;
            numOfMines = 30;
            init();
            break;
    }
}

/*
gets a button element and check if it can be marked or unmarked
*/
function markCell(elCell) {
    event.preventDefault(); //prevents from the right click menu to open

    //if its the first click start the timer
    if (!gGame.isTimerOn) {
        gGame.isTimerOn = true
        timerInterval = setInterval(setTime, 1000);
    }
    var cell = getCell(elCell);
    if (cell.state !== CELL_STATES.MARKED && cell.state !== CELL_STATES.HIDDEN) {
        return;
    }
    //unmark
    else if (cell.state === CELL_STATES.MARKED) {
        cell.state = CELL_STATES.HIDDEN;
        gGame.markedCnt--
        gGame.hiddenCnt++
        if (cell.mine) {
            gGame.minesCnt++
        }
    }
    //mark
    else {
        cell.state = CELL_STATES.MARKED;
        gGame.markedCnt++;
        gGame.hiddenCnt--;
        if (cell.mine) {
            gGame.minesCnt--;
        }
    }
    //update the DOM
    elCell.dataset.state = cell.state;
    setInfo();
    //check for victory. true if the last cell that the user marked was a mine
    if (checkVictory()) {
        gameOver(true);
    }
}


/*
gets a button element and check if it can be revealed
*/
function revealCell(elCell) {
    //if its the first click start the timer
    if (!gGame.isTimerOn) {
        gGame.isTimerOn = true
        timerInterval = setInterval(setTime, 1000);
    }
    var cell = getCell(elCell);
    if (cell.state !== CELL_STATES.HIDDEN) {
        return;
    }
    else if (cell.mine) {
        cell.state = CELL_STATES.MINE;
        gGame.hiddenCnt--;
        gGame.minesCnt--
        gGame.lives--
        setInfo();
        if (!gGame.lives) {
            gameOver();
            revealMines();
        }
    }
    else {
        var mines = cntMinesAround(cell);
        elCell.innerText = mines;
        cell.state = CELL_STATES.NUM;
        gGame.hiddenCnt--;
        if (mines === 0) {
            var neighbors = getCellsAround(cell);
            //check all the cells around and reveal them until one of his neighbors is a mine
            neighbors.forEach(element => {
                revealCell(element);
            });
        }
    }
    elCell.dataset.state = cell.state;
    if (checkVictory()) {
        gameOver(true);
    }

}

/*
returns true if all of the mines are marked and no cell is hidden
*/
function checkVictory() {
    return (gGame.minesCnt === 0 && gGame.hiddenCnt === 0);
}

/*
 initialize game over sequence
 gets boolean (true) for victory or lose
*/
function gameOver(bool = false) {
    clearInterval(timerInterval);
    var elEmoji = document.querySelector('.emoji');
    var elContainer = document.querySelector('.board-container');
    var emoji = EMOJIS.LOSE;
    //if victory
    if (bool) {
        emoji = EMOJIS.WIN;
        updateLocalStorageScores();
        printScore();
    }
    elEmoji.innerText = emoji;
    elContainer.style.pointerEvents = 'none';

}

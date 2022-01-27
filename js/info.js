'use strict'

/*
reset the game variabels before a new game
*/
function resetInfo() {
    var elMin = document.querySelector('.min');
    var elSec = document.querySelector('.sec');
    elMin.innerText = '00';
    elSec.innerText = '00';
    gGame.hiddenCnt = boardSize ** 2;
    gGame.markedCnt = 0;
    gGame.minesCnt = numOfMines;
    gGame.timer = 0;
    gGame.isTimerOn = false;
    gGame.lives = 3;
    var elEmoji = document.querySelector('.emoji');
    elEmoji.innerText = EMOJIS.NORMAL;
    var elContainer = document.querySelector('.board-container');
    elContainer.style.pointerEvents = '';
}

/*
update the scores in the DOM
*/
function printScore() {
    var elEasyScore = document.querySelector('.easy');
    var elNormalScore = document.querySelector('.normal');
    var elHardScore = document.querySelector('.hard');
    var defaultScore = '00:00';

    //easy
    if (localStorage.getItem("easy") === 'Infinity') {
        elEasyScore.innerText = defaultScore
    }
    else {
        elEasyScore.innerText = pad(parseInt(localStorage.getItem("easy") / 60)) + ':' + pad(localStorage.getItem("easy") % 60);
    }

    //normal
    if (localStorage.getItem("normal") === 'Infinity') {
        elNormalScore.innerText = defaultScore
    }
    else {
        elNormalScore.innerText = pad(parseInt(localStorage.getItem("normal") / 60)) + ':' + pad(localStorage.getItem("normal") % 60);
    }

    //hard
    if (localStorage.getItem("hard") === 'Infinity') {
        elHardScore.innerText = defaultScore
    }
    else {
        elHardScore.innerText = pad(parseInt(localStorage.getItem("hard") / 60)) + ':' + pad(localStorage.getItem("hard") % 60);
    }
}

/*
 update all of the game variabels that are shown to the user
 */
function setInfo() {
    var elMinesCnt = document.querySelector('.mines');
    var elMarkedCnt = document.querySelector('.marked');
    var elLivesCnt = document.querySelector('.lives');
    var livesStr = '🧡🧡🧡';

    switch (gGame.lives) {
        case 2:
            livesStr = '🖤🧡🧡';
            break;
        case 1:
            livesStr = '🖤🖤🧡';
            break;
        case 0:
            livesStr = '🖤🖤🖤';
            break;
    }

    elLivesCnt.innerText = livesStr;
    elMarkedCnt.innerText = gGame.markedCnt;
    elMinesCnt.innerText = gGame.minesCnt;
}
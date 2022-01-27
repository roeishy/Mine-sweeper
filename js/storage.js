'use strict'

/*
set local storage variabels only if they do not exist.
set to infinity so that the first score will be the highest
*/
if (!localStorage.getItem("easy")) {
    localStorage.setItem("easy", Infinity)
}
if (!localStorage.getItem("normal")) {
    localStorage.setItem("normal", Infinity)
}
if (!localStorage.getItem("hard")) {
    localStorage.setItem("hard", Infinity)
}


/*
update the local storage variabels
*/
function updateLocalStorageScores() {
    switch (gGame.level) {
        case 'easy':
            if (gGame.timer < localStorage.getItem("easy")) {
                localStorage.setItem("easy", gGame.timer)
            }
            break;
        case 'normal':
            if (gGame.timer < localStorage.getItem("normal")) {
                localStorage.setItem("normal", gGame.timer)
            }
            break;
        case 'hard':
            if (gGame.timer < localStorage.getItem("hard")) {
                localStorage.setItem("hard", gGame.timer)
            }
            break;
    }
}
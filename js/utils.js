'use strict'

var totalSeconds = 0;


//checks if two cells are if the same location
function locationCompare(locA, locB) {
    return locA.i === locB.i && locA.j === locB.j
}


function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//update the timer and the timer in the DOM
function setTime() {
    var elMinutes = document.querySelector(".min");
    var elSec = document.querySelector(".sec");
    ++gGame.timer;
    elSec.innerHTML = pad(gGame.timer % 60);
    elMinutes.innerHTML = pad(parseInt(gGame.timer / 60));
}

//add zero before a singale number for the timer
function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    }
    else {
        return valString;
    }
}
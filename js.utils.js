'use strict'
function getRandomID() {
    console.log('k');
    
    var chars = '1234567890'
    var id = ''
    for (let i = 0; i < 6; i++) {
        id += chars[getRandomNumber(chars.length)]
    }
    return +id;
}

function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}
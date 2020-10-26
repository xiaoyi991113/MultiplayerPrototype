
let squareStates = {
    BLANK: null, 
    O: 0,
    X: 1
};

let gameState = [
    [squareStates.BLANK, squareStates.BLANK, squareStates.BLANK],
    [squareStates.BLANK, squareStates.BLANK, squareStates.BLANK],
    [squareStates.BLANK, squareStates.BLANK, squareStates.BLANK],
];

let players = {
    player1: {
        id: 1,
        letter: squareStates.X
    },
    player2: {
        id: 2,
        letter: squareStates.O
    }
};

let location = {
    horizontalPosition: 0,
    verticalPosition: 0
};

function setUpBoard() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.moveTo(0, 0);
    ctx.lineTo(200, 100);
    ctx.stroke();
}

function markSquare(playerId, location) {

}

window.onload = setUpBoard();


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

let player1, player2;

function Player(id, letter) {
    this.id = id;
    this.letter = letter;
}

function SquareLocation(horizontalPosition, verticalPosition) {
    this.horizontalPosition = horizontalPosition;
    this.verticalPosition = verticalPosition;
};

function setUpGame() {
    setUpBoard();
    makePlayers();
}

function setUpBoard() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.moveTo(100, 0);
    ctx.lineTo(100, 300);
    ctx.moveTo(200, 0);
    ctx.lineTo(200, 300);
    ctx.moveTo(0, 100);
    ctx.lineTo(300, 100);
    ctx.moveTo(0, 200);
    ctx.lineTo(300, 200);
    ctx.stroke();
}

function makePlayers() {
    player1 = new Player(1, squareStates.X);
    player2 = new Player(2, squareStates.O);
}

function markSquare(playerId, location) {
    console.log(gameState);
}

window.onload = setUpGame();

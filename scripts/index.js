
let squareStates = {
    BLANK: null, 
    O: 0,
    X: 1
};

let gameState = [
    // Column 0          Column 1            Column 2
    [squareStates.BLANK, squareStates.BLANK, squareStates.BLANK], // Horizontal row 0
    [squareStates.BLANK, squareStates.BLANK, squareStates.BLANK], // Horizontal row 1
    [squareStates.BLANK, squareStates.BLANK, squareStates.BLANK], // Horizontal row 2
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
    ctx.moveTo(10,10);
    ctx.lineTo(10,10);
    ctx.moveTo(200, 0);
    ctx.lineTo(200, 300);
    ctx.moveTo(0, 100);
    ctx.lineTo(300, 100);
    ctx.moveTo(0, 200);
    ctx.lineTo(300, 200);
    ctx.stroke();
    
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(c.width, c.height);
    ctx.stroke();

    
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(c.width, 0);
    ctx.lineTo(0, c.height);
    ctx.stroke();
}

function makePlayers() {
    player1 = new Player(1, squareStates.X);
    player2 = new Player(2, squareStates.O);
}

function markSquare(player, squareLocation) {
    gameState[squareLocation.horizontalPosition][squareLocation.verticalPosition] = player.letter;
}

window.onload = setUpGame();

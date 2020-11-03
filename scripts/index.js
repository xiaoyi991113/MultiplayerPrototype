
// PREDEFINED CONSTANTS
// Width of the board, in pixels
let boardSize = 300;
// Width of one line, in pixels
let lineWidth = 1;
// Margin, in pixels, between the X or O drawn and the boundaries of the box
let letterMargin = 10;

// Simple utility function to get the width of the board
function squareWidth() {
    return boardSize/3;
}

// A Square can have an X, an O, or be blank. Use this enum to denote the state
let squareStates = {
    BLANK: null, 
    O: 0,
    X: 1
};

// This is the official starting state of the game. Everything is blank.
let gameState = [
    // Column 0          Column 1            Column 2
    [squareStates.BLANK, squareStates.BLANK, squareStates.BLANK], // Horizontal row 0
    [squareStates.BLANK, squareStates.BLANK, squareStates.BLANK], // Horizontal row 1
    [squareStates.BLANK, squareStates.BLANK, squareStates.BLANK], // Horizontal row 2
];

// Here's a testing game state with some X's and O's filled in.
let testGameState = [
    // Column 0          Column 1            Column 2
    [squareStates.X, squareStates.BLANK, squareStates.O], // Horizontal row 0
    [squareStates.O, squareStates.X, squareStates.BLANK], // Horizontal row 1
    [squareStates.X, squareStates.BLANK, squareStates.BLANK], // Horizontal row 2
];

// Uncomment this line to start with the testing game state
//gameState = testGameState;

// 0 for no winner, 1 for Player1(O), 2 for Player2(X), 3 for Draw
let gameCondition = 0;
let player1, player2;

// Constructor for Player Object
function Player(id, letter) {
    this.id = id;
    this.letter = letter;
}

// Constructor for Square Location object, which is the horizontal and vertical square location
// Upper left square is new SquareLocation(0, 0);
function SquareLocation(horizontalPosition, verticalPosition) {
    this.horizontalPosition = horizontalPosition;
    this.verticalPosition = verticalPosition;
};

// Utility function to get the contect object for the canvas
function getCanvCtxt() {
    var c = document.getElementById("myCanvas");
    return c.getContext("2d");
}

// Runs on window.onload. Sets up the board, players, and renders the state on the canvas
function setUpGame() {
    setUpBoard();
    makePlayers();
    // TODO: Decide if the state really needs to be rendered here
    renderState();
}

// Draws the Tic-Tac-Toe board itself.
function setUpBoard() {
    let ctx = getCanvCtxt();

    // Draw the lines that make up the board itself
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
}

function drawCircle(event){
    var c = document.getElementById("myCanvas");
    let ctx = getCanvCtxt();

    var rect = c.getBoundingClientRect();
    var posx = event.clientX - rect.left;
    var posy = event.clientY - rect.top;

    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(posx, posy, 40, 0, 2 * Math.PI);
}

/**
 * Given a SquareLocation, draws an X in that square
 * @param {SquareLocation} squareLocation the square in which to draw.
 *  Should be new SquareLocation(1, 1) to draw an X in the middle square
 */
function drawX(squareLocation) {
    let ctx = getCanvCtxt();

    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(
        squareLocation.horizontalPosition * squareWidth() + letterMargin,
        squareLocation.verticalPosition * squareWidth() + letterMargin
        );
    ctx.lineTo(
        squareLocation.horizontalPosition * squareWidth() + squareWidth() - letterMargin,
        squareLocation.verticalPosition * squareWidth() + squareWidth() - letterMargin
        );
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(
        squareLocation.horizontalPosition * squareWidth() + squareWidth() - letterMargin,
        squareLocation.verticalPosition * squareWidth() + letterMargin
        );
    ctx.lineTo(
        squareLocation.horizontalPosition * squareWidth() + letterMargin,
        squareLocation.verticalPosition * squareWidth() + squareWidth() - letterMargin
        );
    ctx.stroke();
}

/**
 * Given a SquareLocation, draws an O in that square
 * @param {SquareLocation} squareLocation the square in which to draw.
 *  Should be new SquareLocation(0, 2) to draw an O in the upper right square
 */
function drawO(sqLoc) {
    let ctx = getCanvCtxt();

    ctx.moveTo(sqLoc.horizontalPosition + letterMargin, sqLoc.verticalPosition + letterMargin);
    ctx.arc(
        sqLoc.horizontalPosition * squareWidth() + squareWidth()/2,
        sqLoc.verticalPosition * squareWidth() + squareWidth()/2, 
        (squareWidth() - 2 * letterMargin)/2, 0, 2 * Math.PI);
    ctx.fill();
}

// Setup function to make the players
function makePlayers() {
    player1 = new Player(1, squareStates.X);
    player2 = new Player(2, squareStates.O);
}

// Given a player, retrieves that player's letter and draws a square there
function markSquare(player, squareLocation) {
    gameState[squareLocation.horizontalPosition][squareLocation.verticalPosition] = player.letter;
    checkGameState();
    renderState();
}

// Call this after any state changes. This will draw the X's and O's on the board according to the state
function renderState() {
    for (let rIndex = 0; rIndex <= 2; rIndex++) {
        for (let cIndex = 0; cIndex <= 2; cIndex++) {
            if (gameState[rIndex][cIndex] === squareStates.X) {
                // cIndex is horizontal position because it's the number of columns over
                // rIndex is vertical position because it's the number of rows down
                drawX(new SquareLocation(cIndex, rIndex));
                console.log(rIndex + ", " + cIndex + " is X");
            }
            else if (gameState[rIndex][cIndex] === squareStates.O) {
                drawO(new SquareLocation(cIndex, rIndex));
                console.log(rIndex + ", " + cIndex + " is O");
            }
            else {
                console.log(rIndex + ", " + cIndex + " is empty");
            }
        }
    }
}

// Call this after any change in the game state to detect a win!
function checkGameState() {
    //Wins with top left
    if(gameState[0][0] != null && (gameState[0][0] == gameState [0][1] == gameState[0][2] || gameState[0][0] == gameState[1][1] == gameState[2][2] || gameState[0][0] == gameState[1][0] == gameState[2][0])){
        if(gameState[0][0] == squareStates.O){
            gameCondition = 1;
        } else{
            gameCondition = 2;
        }
        return;
    }
    //Wins with middle
    if(gameState[1][1] != null && (gameState[1][1] == gameState [0][1] == gameState[2][1] || gameState[1][1] == gameState[1][0] == gameState[1][2] || gameState[1][1] == gameState[2][0] == gameState[0][2])){
        if(gameState[1][1] == squareStates.O){
            gameCondition = 1;
        } else{
            gameCondition = 2;
        }
        return;
    }
    //Wins with bottom right
    if(gameState[2][2] != null && (gameState[0][2] == gameState [1][2] == gameState[2][2] || gameState[2][0] == gameState[2][1] == gameState[2][2])){
        if(gameState[2][2] == squareStates.O){
            gameCondition = 1;
        } else{
            gameCondition = 2;
        }
        return;
    }
    //Checks for draw
    for(i = 0; i < 3; i++){
        for(j = 0; j < 3; j++){
            if(gameState[i][j] != null){
                return;
            }
        }
    }
    gameCondition = 3;
}

// When the page is loaded, sets up the game
window.onload = setUpGame();


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

//0 for no winner, 1 for Player1(O), 2 for Player2(X), 3 for Draw
let gameCondition = 0;

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

window.onload = setUpBoard();

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
                return
            }
        }
    }
    gameCondition = 3;
}
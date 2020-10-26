
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

function setUpBoard() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.moveTo(100, 0);
    ctx.lineTo(100, 300);
    ctx.stroke();
    ctx.moveTo(200, 0);
    ctx.lineTo(200, 300);
    ctx.stroke();
    ctx.moveTo(0, 100);
    ctx.lineTo(300, 100);
    ctx.stroke();
    ctx.moveTo(0, 200);
    ctx.lineTo(300, 200);
    ctx.stroke();
}

window.onload = setUpBoard();

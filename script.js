var origBoard;
const huPlayer = 'O'; // The X's and O's represented in the board
const aiPlayer = 'X';
const winCombos = [ //All the combinations that qualify as a win
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,3,6],
	[1,4,7],
	[2,5,8],
	[0,4,8],
	[6,4,2], 

]

const cells = document.querySelectorAll('.cell');
startGame();


function startGame() {  //The function that allows the computer to begin the game
	// Usually the first person to go will be the user followed by the AI
	document.querySelector(".endgame").style.display = "none";
	origBoard = Array.from(Array(9).keys());
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color'); 
		cells[i].addEventListener('click', turnClick, false);
	}
}

function turnClick(square) {  //The function that takes into account what square the player wants to place the O
	if (typeof origBoard [square.target.id] == 'number') {
		turn(square.target.id, huPlayer)
	if (!checkTie()) turn(bestSpot(), aiPlayer);
	}
}

function turn(squareId, player) { //The function that controls the turns of the players
	origBoard[squareId] = player; // In this case there are two players the AI and the user
	document.getElementById(squareId).innerText = player;
	let gameWon = checkWin(origBoard, player)
	if (gameWon) gameOver(gameWon)
}

function checkWin(board, player) { //This function goes back to our wincombos to see if the player or AI has won the game
	let plays = board.reduce((a, e, i) =>
		(e == player) ? a.concat(i) : a, [])
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon; // returns who won
}


function gameOver(gameWon) { //If the user win the background color of the winning boxes turn blue
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor = 
		gameWon.player == huPlayer ? "blue" : "green"; //If the AI wins the background color of the winning boxes turns green
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false)
	}
	declareWinner(gameWon.player == huPlayer ? "You Win!" : "You lose!");
}
function declareWinner(who) { //The function that would declare which player is the winner (the user of the AI)
	document.quertSelector(".endgame").style.display = "block";
	document.querySelector(".endgame.text").innerText = who;
}


function emptySquares () {
	return origBoard.filter (s => typeof s == 'number');
}

function bestSpot() {
	return emptySquares()[0];
}

function checkTie() { //If the game would be a Tie the background colors of all the squares would become red.
	//This can be changed to any color.
	if (emptySquares(). length == 0) {
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "red";
			cells[i].removeEventListener('click', turnClick, false);
		}
		declareWinner("Tie Game!")  // In the event if the game were a tie
		return true;
	}
	return false;
}





























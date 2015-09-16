// Memory game
// Author: Louise Stigell
// Last changed: 2015-08-29


// ------ Variables & objects: -------------------------------------------------------------------------

// var score = 0; //Holds the player's score.
// var motifs = []; //Holds all the possible motifs.
// var selectedMotifs = [] //Holds 2 of each of the chosen number of motifs.
// var shuffledMotifs = []; //Holds the shuffled version of the selected motifs.
// var cards = []; //Holds the card objects. This is basically the game board.


// //Constructor function for Card object:
// var Card = function(x, y, motif) {
// 	this.x = x;
// 	this.y = y;
// 	this.width = 100;
// 	this.motif = motif;
// 	isShown: false;
// }



// ----- Functions: -----------------------------------------------------------------------------------

$("button").click(function() {
	console.log("Button clicked!");
	$("#card-area").append("<div class='card'></div>");
});
	


// //Pick motifs from the motifs array, half as many as the desired gridSize, and pair the motifs in a new array:
// function createMotifArray() {
// 	//Loop through the motifs array the same number of times as half the gridSize.

// 	//Assign each motif to a pos in this array (selectedMotifs)

// 	//Create a new array which loops through selectedMotifs two times, adding 2 of each of the motifs.

// 	//Shuffle the new array (shuffledMotifs):

// 	//Return shuffledMotifs.
// }



// //Generate cards:
// function generateCards(gridSize) {
// 	//Check if amount is an even number:
// 	if (gridSize % 2 === 0) {
// 		//Split amount into 2 and place in the cols and rows variables:
// 		var cols = gridSize / 2;
// 		var rows = gridSize / 2;

// 		//Generate columns with Card objects:
// 		for (i = 0; i < cols; i++) {
// 			//Generate rows of Card objects:
// 			for (j = 0; j < rows; j++) {
// 				//Push a new Card object to the current place in the cards array:
// 				cards.push(new Card(i, j, shuffledMotifs.pop())); //Assign each new cards a col and row position and pops motifs from the randomMotifs array.
// 			}
// 		}
// 	}
// 	else {
// 		console.log("Amount must be an even number.");
// 	}












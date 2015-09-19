// Memory game
// Author: Louise Stigell
// Last changed: 2015-08-29


// ------ Variables & objects: -------------------------------------------------------------------------

// var score = 0; //Holds the player's score.
// var motifs = []; //Holds all the possible motifs.
// var selectedMotifs = [] //Holds 2 of each of the chosen number of motifs.
// var shuffledMotifs = []; //Holds the shuffled version of the selected motifs.
// var cards = []; //Holds the card objects. This is basically the game board.


 //Constructor function for Card object:
 function Card (color) {
	 this.color = color; //Give random color to card.
	 this.isShown = false; //Turn card up side down by default.
 }



// ----- Functions: -----------------------------------------------------------------------------------

//Generate a random color:
function randomColor() {
  function color() {
    return Math.floor(Math.random()*256).toString(16)
  }
  return "#"+color()+color()+color();
}

//The Fisher–Yates shuffle:
function shuffle(array) {
	var m = array.length, t, i;
	// While there remain elements to shuffle…
	while (m) {
		// Pick a remaining element…
    	i = Math.floor(Math.random() * m--);
			
		// And swap it with the current element.
    	t = array[m];
    	array[m] = array[i];
    	array[i] = t;
  	}
  	return array;
}

//Create a cards array to add to grid:
function createCardsArray(gridSize) {
	var cardsFirstHalf = [];
	var cardsSecondHalf = [];
	var colors = [];
	//Generate he correct number of colors to put on cards. This is to avoid having to deep copy a whole array of card objects:
	for (i = 0; i < gridSize/2; i++) {
		colors.push(randomColor());
	}
	console.log(colors);
	//Fill cardsFirstHalf with card objects, as many as half of gridSize. Each card object gets a color from the colors array.
	for (i = 0; i < gridSize/2; i++) {
		var cardColor = colors.splice([i], 1); //To get color, splice an element from colors array, making sure each color is only added once.
		var card = new Card(cardColor[0]); //Since slice returns an array, add only the color value to the object.
		cardsFirstHalf.push(card);
	}
	console.log(cardsFirstHalf);
	//Duplicate the cardsFirstHalf array into cardsSecondHalf:
	for (i = 0; i < gridSize/2; i++) {
		var card = new Card(colors[i]);
		cardsSecondHalf.push(card);
	}
	console.log(cardsSecondHalf);
	//Combine the two arrays into the cardsCombined array:
	var cardsCombined = cardsFirstHalf.concat(cardsSecondHalf);
	console.log(cardsCombined);
	
	//Shuffle the cardsCombined array using the Fisher–Yates shuffle:
	shuffle(cardsCombined);
	console.log(cardsCombined);
}

//Start new game:
$("#submit-button").click(function() {
	var gridSize = document.getElementById("gridSize").value; //Get requested gridSize from input field.
	if (gridSize % 2 === 0) { //Make sure gridSize is an even number.
		//Run createCards function to get the cards array:
 		var cards = createCardsArray(gridSize);
		console.log(cards);
		//Create a div to hold a card:
		var cardDiv = ""
		//For each card in the array, add id and rest of html to the cardDiv:
		for (i = 0; i < gridSize; i++) {
			cardDiv += "<div class='card' id='"
			cardDiv += cards[i].toString;
			cardDiv += "'></div>"
		}
 		$("#card-area").append(cardDiv); //Append cards to grid.
 	}
	else {
 		console.log("Amount must be an even number."); //Odd number = no can do. 
 	}
});








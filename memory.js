// Memory game
// Author: Louise Stigell

// ------ Variables & objects: -------------------------------------------------------------------------

var score = 0; //Holds the player's score.
var cards = []; //The array that holds the cards.
var cardsTurnedUp = 0; //Initialize number of turned cards to 0.

 //Constructor function for Card object:
 function Card (color) {
	 this.color = color; //Give random color to card.
	 this.isShown = false; //Card status is turned down by default.
 }


// ----- Functions: -----------------------------------------------------------------------------------

//Generate a random color:
function randomColor() {
  function color() {
    return Math.floor(Math.random()*256).toString(16)
  }
  return "#"+color()+color()+color();
}

//The Fisher–Yates shuffle: (Not working right now...)
function shuffle(array) {
	var m = array.length, temp, i;
	// While there remain elements to shuffle…
	while (m) {
		// Pick a remaining element…
    	i = Math.floor(Math.random() * m--);
			
		// And swap it with the current element.
    	temp = array[m];
    	array[m] = array[i];
    	array[i] = temp;
  	}
  	return array;
}

//Find which cards are turned up:
function findTurnedCards(array, key, value) {
	var turnedCards = [];
	for (var i = 0; i < array.length; i++) {
		if (array[i][key] === value) {
			turnedCards.push(array[i]); //Add to the new array both the original placement of the card and the actual card object.
		}
	}
	return turnedCards;
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
	//Fill cardsFirstHalf with card objects, as many as half of gridSize. Each card object gets a color from the colors array.
	for (i = 0; i < gridSize/2; i++) {
		var cardColor = colors.slice([i]); //To get color, splice an element from colors array, making sure each color is only added once.
		var card = new Card(cardColor[0]); //Since slice returns an array, add only the color value to the object.
		cardsFirstHalf.push(card);
	}
	//Duplicate the cardsFirstHalf array into cardsSecondHalf:
	for (i = 0; i < gridSize/2; i++) {
		var card = new Card(colors[i]);
		cardsSecondHalf.push(card);
	}
	//Combine the two arrays into the cardsCombined array:
	var cardsCombined = cardsFirstHalf.concat(cardsSecondHalf);
	
	//Shuffle the cardsCombined array using the Fisher–Yates shuffle. Thos does not seem to work atm:
	shuffle(cardsCombined);
	return cardsCombined;
}


// ----- Game logic: -----------------------------------------------------------------------------------

//Start new game:
$("#submit-button").click(function() {
	var gridSize = document.getElementById("gridSize").value; //Get requested gridSize from input field.
	if (gridSize % 2 === 0) { //Make sure gridSize is an even number.
		//Run createCards function to get the cards array:
 		cards = createCardsArray(gridSize);
		//Create a div to hold a card:
		var cardDiv = ""
		//For each card in the array, add id and rest of html to the cardDiv:
		for (i = 0; i < gridSize; i++) {
			cardDiv += "<div class='card' id='"
			cardDiv += i;
			cardDiv += "'></div>"
		}
 		$("#card-area").append(cardDiv); //Append cards to grid.
 	}
	else {
 		alert("Amount must be an even number."); //Odd number = no can do! 
 	}
});

//When player clicks a card:
$(document.body).on('click','.card',function(event) {
	var cardId = this.id; //Collect card id.
	var cardColor = cards[cardId].color; //Collect card color.
	
	if (cardsTurnedUp < 2) { //As long as number of turned cards are less than 2...
		
		if (cards[cardId].isShown === false) { //If this card is turned down...
			$(this).toggleClass("turned"); //Add class for turned up cards.
			$(this).css("background-color", cardColor); //Show the color.
			cards[cardId].isShown = true; //Set card's isShown property to true.
			cardsTurnedUp += 1; //And add a card to cardsTurnedUp counter.
			console.log("Number of turned cards: " + cardsTurnedUp);
			
			//Check to see if two cards are turned:
			if (cardsTurnedUp === 2) {
				var turnedCards = findTurnedCards(cards, 'isShown', true); //Collect the turned cards.
				
				//Check to see if card colors match:
				if (turnedCards[0].color === turnedCards[1].color) {
					console.log("The card's colors match!");
					$(".turned").hide();//Hide the cards.
					score += 10;//Add score.
					//Reset board.
				}
				else { //Reset the board.
					console.log("Resetting board...");
					for (i = 0; i < turnedCards.length; i++) {
						$(".turned").css("background-color", "white"); //Set their color back to white.
						$(".turned").toggleClass("turned"); //Toggle back the turned cards.
						cards[i].isShown = false; //Set the cards' isShown to false.
					}	
					console.log(cards);
					cardsTurnedUp = 0;
				}
			}//End of card comparance check.
		}//End of card turn allowance check.
	}//End of cardsTurnedUp check.
});//End of card click event.



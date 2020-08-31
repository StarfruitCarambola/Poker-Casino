function initialize()
{	
	jBoard = document.getElementById("board");
	jGameStatus = document.getElementById("game_status");
	jBetAmount = document.getElementById("bet_amount");
	jSetAmount = document.getElementById("set_amount");

	//board will contain up to 5 cards 
	BOARD_SIZE = 5;
	
	//will start with no cards on board
	cardsOnBoard = [];
	
	//assign point values to each respective card
	//ace has a point value of 13, 2 has a point value of 1, 3 has a point value of 2, etc.
	pointValues = [13, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	
	//cards selected on the board
	selected = [];
	
	//how much you want to bet
	betMoney = 0;
	//amount used to help calculate how much you have left
	finalMoney = 0;
	//how much you currently have 
	accountMoney = 2000;
	display();
	
	//assigns point values to special cards
	ACE = 1, JACK = 11, QUEEN = 12, KING = 13;
	//assigns point values to the suites
	CLUB = 0, DIAMOND = 1, HEART = 2, SPADE = 3;
	
	//creates the deck 			
	myDeck = generateDeckWithPointValues(pointValues);
	//shuffles the deck
	myDeck = shuffleDeck(myDeck);
	
	//helps indicate if you can click on the buttons or not to perform the action
	replaceCards.disabled = true;
	replaceHand.disabled = true; 
	
	//deals cards from top of the deck to board
	for (let i = 0; i < BOARD_SIZE; i++)
	{
		let theTD = jBoard.insertCell(i);
		cardsOnBoard.push(dealCard(myDeck)); 
		theTD.innerHTML = "<img src = 'card images/" + cardsOnBoard[i].cardImg + "'/>";
		theTD.setAttribute("onclick", "selectUnselect(this);");
		selected.push(false);
	}			
}

//allows the user to selected card
//cardValue is the point value of the selected card
function selectUnselect(cardValue)
{
	//loop through the board of cards 
	for (let i = 0; i < jBoard.cells.length; i++)
	{
		if (jBoard.cells[i] == cardValue)
		{
			selected[i] = !selected[i];
			
			//makes the border of the selected card red 
			if (selected[i])
				cardValue.style.border = "solid red";
			//otherwise de-select the card and remove the red border 
			else
				cardValue.style.border = "none";
			return;
		}
	}
}

//replace the card at the index
function replaceCard(index)
{
	let theTD = jBoard.cells[index];
	
	//while there are still cards, it will deal the top card
	if (myDeck.length > 0)
	{
		cardsOnBoard[index] = dealCard(myDeck);
		theTD.innerHTML = "<img src = 'card images/" + cardsOnBoard[index].cardImg + "'/>";
	}
	//if not, display a backwards card 
	else
	{
		cardsOnBoard[index] = null;
		theTD.innerHTML = "<img src = 'card images/back-red-75-1.png'/>";
	}
	//takes the card selected and highlight it with a red border
	selectUnselect(theTD);
}

/*
//debug function to make sure all the indexes of each card is correct
function getIndexesOfCardsOnBoard()
{
	let selectedIndexes = [];
	for (let i = 0; i < BOARD_SIZE; i++)
	{
		if (cardsOnBoard[i] != null)
		{
			selectedIndexes.push(i);
		}
	}	
	return selectedIndexes;
}
*/

//gets all the cards that were selected
function getSelectedIndexes()
{
	let selectedIndexes = [];
	
	//loops through all the cards on board
	//take all the selected cards and push it in the array to return in the end
	for (let i = 0; i < BOARD_SIZE; i++)
	{
		if (selected[i] && cardsOnBoard != null)
		{
			selectedIndexes.push(i);
		}
	}	
	return selectedIndexes;
}

function insertionSortPointValue()
{
	for (let i = 1; i < BOARD_SIZE; i++) 
	{
		let key = cardsOnBoard[i].pointValue;
		let j = i - 1;
		while (j >= 0 && cardsOnBoard[j].pointValue > key) {
			cardsOnBoard[j + 1].pointValue = cardsOnBoard[j].pointValue;
			j = j - 1;
		}
		cardsOnBoard[j + 1].pointValue = key;
	}
	
}

function insertionSortSuit()
{
	for (let i = 1; i < BOARD_SIZE; i++) 
	{
		let key = cardsOnBoard[i].suit;
		let j = i - 1;
		while (j >= 0 && cardsOnBoard[j].suit > key) {
			cardsOnBoard[j + 1].suit = cardsOnBoard[j].suit;
			j = j - 1;
		}
		cardsOnBoard[j + 1].suit = key;
	}
}

//returns if there are two pairs of cards with the same value 
function containsTwoPairs()
{
	const map = {};
	let firstPair = false;
	let notRepeat;
	for (let i = 0; i < cardsOnBoard.length; i++)
	{
		const dupe = cardsOnBoard[i].pointValue;
		if (dupe in map && !firstPair)
		{
			firstPair = true;
			notRepeat = dupe;
		}
		if (dupe in map && firstPair && dupe != notRepeat)
		{
			return true;
		}
		map[dupe] = i;
	}
	return false;
}

//returns if there are three cards with the same point value
function containsTriple()
{
	let counter = 0;
	for (let i = 1; i < cardsOnBoard.length; i++)
	{
		if (cardsOnBoard[i-1].pointValue == cardsOnBoard[i].pointValue)
		{
			counter++;
		}
		else
		{
			counter = 0;
		}
		if (counter == 2)
		{
			return true;
		}
	}
	return false;
	
}

//returns if there are four cards with the same point value
function containsFourOfKind()
{
	let counter = 0;
	
	for (let i = 1; i < cardsOnBoard.length; i++)
	{
		if (cardsOnBoard[i-1].pointValue == cardsOnBoard[i].pointValue)
		{
			counter++;
		}
		else
		{
			counter = 0;
		}
		if (counter == 3)
		{
			return true;
		}
	}
	return false;
}


//returns if all 5 cards is a straight
function containsStraight()
{	
	let counter = 0;
	for (let i = 1; i < cardsOnBoard.length; i++)
	{
		if (cardsOnBoard[i-1].pointValue + 1 == cardsOnBoard[i].pointValue)
		{
			counter++;
		}
		else if (cardsOnBoard[i-1].pointValue == cardsOnBoard[i].pointValue)
		{
			counter = counter;
		}
		else
		{
			counter = 0;
		}
		if (counter == 4)
		{
			return true;
		}
	}
	return false;
} 

function containsFlush()
{		
	if (cardsOnBoard.length > 5){
		insertionSortSuit();
	}
	let counter = 0;
	for (let i = 1; i < cardsOnBoard.length; i++)
	{
		if (cardsOnBoard[i-1].suit == cardsOnBoard[i].suit)
		{
			counter++;
		}
		else
		{
			counter = 0;
		}
		if (counter == 4)
		{
			if (cardsOnBoard.length > 5){
				insertionSortPointValue();
			}
			return true;
		}
	}
	insertionSortPointValue();
	return false;
}

function containsFullHouse()
{
	let i = 0;
	let counter = 0;
	let triplePair = false;
	let doublePair = false;
	let firstCombo = -1;
	
	for (let i = 0; i < cardsOnBoard.length - 2; i++){
		if (cardsOnBoard[i].pointValue == cardsOnBoard[i+1].pointValue && cardsOnBoard[i].pointValue == cardsOnBoard[i+2].pointValue){
			firstCombo = cardsOnBoard[i].pointValue;
			triplePair = true;
			break;
		}
	}
	
	if (triplePair == false){
		return false;
	}
	
	for (let i = 0; i < cardsOnBoard.length - 2; i++){
		if (cardsOnBoard[i].pointValue == cardsOnBoard[i+1].pointValue && cardsOnBoard[i].pointValue != firstCombo){
			doublePair = true;
			return true;
		}
	}
	
	return false;
} 

function containStraightFlush()
{
	if (containsStraight() && containsFlush())
	{
		return true;
	}
	return false;
} 

function containRoyalStraightFlush()
{	
	insertionSortSuit();
	let counter = 0;
	for (let i = 1; i < cardsOnBoard.length; i++)
	{
		if (cardsOnBoard[i-1].pointValue >= 9)
		{
			if (cardsOnBoard[i-1].pointValue + 1 == cardsOnBoard[i].pointValue)
			{
				if (cardsOnBoard[i-1].suit == cardsOnBoard[i].suit)
				{
					counter++;
				}	
			}
			if (counter == 4)
			{
				return true;
			}
		}
	}
	insertionSortPointValue();
	return false;
} 

function updateMoney()
{	
	insertionSortPointValue();
	if (containRoyalStraightFlush())
	{
		betMoney = betMoney * 250;
		accountMoney = accountMoney + betMoney;
		jGameStatus.innerHTML = "Royal Straight Flush! You got $" + betMoney + "!";
		display();		
		return true;
	}
		 
	else if (containStraightFlush())
	{
		betMoney = betMoney * 25;
		accountMoney = accountMoney + betMoney;
		jGameStatus.innerHTML = "Straight Flush! You got $" + betMoney + "!";
		display();
		return true;
	} 
			
	else if (containsFourOfKind())
	{
		betMoney = betMoney * 20;
		accountMoney = accountMoney + betMoney;
		jGameStatus.innerHTML = "Four Of a Kind! You got $" + betMoney + "!";
		display();
		return true;
	} 
		
	else if (containsFullHouse())
	{
		betMoney = betMoney * 10;
		accountMoney = accountMoney + betMoney;
		jGameStatus.innerHTML = "Full House! <br> You got $" + betMoney + "!";
		display();
		return true;
	}  
		
	else if (containsFlush())
	{
		betMoney = betMoney * 5;
		accountMoney = accountMoney + betMoney;
		jGameStatus.innerHTML = "Flush! You got $" + betMoney + "!";
		display();
		return true;
	}  

	else if (containsStraight())
	{
		betMoney = betMoney * 3;
		accountMoney = accountMoney + betMoney;
		jGameStatus.innerHTML = "Straight! You got $" + betMoney + ".";
		display();
		return true;
	} 

	else if (containsTriple())
	{
		betMoney = betMoney * 2;
		accountMoney = accountMoney + betMoney;
		jGameStatus.innerHTML = "Triple! You got $" + betMoney + "!";
		display();
		return true;
	} 

	else if (containsTwoPairs())
	{
		betMoney = betMoney * 1;
		accountMoney = accountMoney + betMoney;
		jGameStatus.innerHTML = "Two Pairs! You got $" + betMoney + "!";
		display();
		return true;
	} 
	else
	{
		accountMoney = accountMoney - betMoney;
		jGameStatus.innerHTML = "No combos! You've lost $" + betMoney + "...";
		display();
	}
}

function replace()
{
	let selectedIndexes = getSelectedIndexes();
	replaceCards.disabled = true;
	replaceHand.disabled = false;
	betOne.disabled = true;
	betTen.disabled = true;
	betHundred.disabled = true;
	betThousand.disabled = true; 
	betZero.disabled = true;
	
	for (let i = 0; i < selectedIndexes.length; i++)
	{
		replaceCard(selectedIndexes[i]);
	}

	updateMoney();
} 

function newHand()
{					
	myDeck = generateDeckWithPointValues(pointValues);
	myDeck = shuffleDeck(myDeck);
	betMoney = 0;
	finalMoney = 0;
	display();
	
	replaceHand.disabled = true;
	betOne.disabled = false;			
	betTen.disabled = false;
	betHundred.disabled = false;
	betThousand.disabled = false;
	betZero.disabled = false;	
	
	for(let i = 0; i < BOARD_SIZE; i++)
	{
		let theTD = jBoard.cells[i];
		selected[i] = true;
		replaceCard(i);
	}
	
	jGameStatus.innerHTML = "Make your decision!";
}

function restart()
{				
	myDeck = generateDeckWithPointValues(pointValues);
	myDeck = shuffleDeck(myDeck);
	betMoney = 0;
	finalMoney = 0;
	accountMoney = 2000;
	display();
	
	replaceCards.disabled = true;
	replaceHand.disabled = true;
	betOne.disabled = false;
	betTen.disabled = false;
	betHundred.disabled = false;
	betThousand.disabled = false; 
	
	for(let i = 0; i < BOARD_SIZE; i++)
	{
		let theTD = jBoard.cells[i];
		selected[i] = true;
		replaceCard(i);
	}
	
	jGameStatus.innerHTML = "Make your decision!";
}


function bet(number)
{
	betMoney += number;
	finalMoney += number;
	
	if (accountMoney >= betMoney)
	{
		display();
		replaceCards.disabled = false;
	}
	else
	{
		betMoney -= number;
		finalMoney -= number;
	}
	display();
}

function resetMoney()
{
	betMoney = 0;
	finalMoney = 0;
	replaceCards.disabled = true; 
	display();
}

function display()
{
	jSetAmount.innerHTML = "Have: $" + accountMoney;
	jBetAmount.innerHTML = "Betting: $" + finalMoney;
}
		

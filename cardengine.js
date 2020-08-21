//CONSTANTS
ACE = 1, JACK = 11, QUEEN = 12, KING = 13;
CLUB = 0, DIAMOND = 1, HEART = 2, SPADE = 3;

/*
	generateStandardDeck
	
	Creates a deck of standard playing cards as an array.
	
	returns
		The deck of cards
*/
function generateStandardDeck()
{
	//The deck starts as an empty array.
	var deck = [];
	
	/*
		A double for loop will create all 52 cards, running the 13 ranks each 4 times for the suits.
	*/
	for (var r = ACE; r <= KING; r++)
		for (var s = CLUB; s <= SPADE; s++)
		{
			/*
				By declaring the card as an empty object, we can begin to create member variables (rank, suit, and cardImg) dynamically, assigning them values on the fly.
				
				Each call to new Object() creates a new object in card so that the loop creates 52 individual cards.
			*/
			var card = new Object();
			card.rank = r;
			card.suit = s;
			card.cardImg = r + "-" + s + ".png";
			deck.push(card);
		}
		
	//return the completed array.
	return deck;
}

function generateDeckWithPointValues(pointValues)
{
	//The deck starts as an empty array.
	var deck = [];
	if (pointValues.length != 13)
		return deck;
	/*
		A double for loop will create all 52 cards, running the 13 ranks each 4 times for the suits.
	*/
	for (var r = ACE; r <= KING; r++)
		for (var s = CLUB; s <= SPADE; s++)
		{
			/*
				By declaring the card as an empty object, we can begin to create member variables (rank, suit, and cardImg) dynamically, assigning them values on the fly.
				
				Each call to new Object() creates a new object in card so that the loop creates 52 individual cards.
			*/
			var card = new Object();
			card.rank = r;
			card.suit = s;
			card.pointValue = pointValues[r-1];
			card.cardImg = r + "-" + s + ".png";
			deck.push(card);
		}
		
	//return the completed array.
	return deck;
}

function shuffleDeck(deck)
{
	var randomDeck = [];
	while(deck.length > 0)
	{
		var idx = getRandomInteger(0, deck.length - 1);
		var card = deck.splice(idx, 1);
		randomDeck.push(card[0]);	
	}
	return randomDeck;
}

function dealCard(deck)
{
	return deck.shift();
}

function Card(theRank, theSuit, theImg, thePointValue)
{
	this.rank = theRank;
	this.suit = theSuit;
}






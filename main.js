
class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
        this.color = this.determineColor(suit);
    }

    determineColor(suit) {
        if (suit === 'Hearts' || suit === 'Diamonds') {
            return 'Red';
        } else {
            return 'Black';
        }
    }
}

class Deck {
    constructor() {
        this.deck = [];
        this.discardPile = [];
    }

    createDeck(suits, values) {
        this.deck = [];
        for (let suit of suits) {
            for (let value of values) {
                this.deck.push(new Card(suit, value));
            }
        }
        return this.deck;
    }
    shuffle() {
        let counter = this.deck.length, temp, i;

        while (counter) {
            i = Math.floor(Math.random() * counter--);
            temp = this.deck[counter];
            this.deck[counter] = this.deck[i];
            this.deck[i] = temp;
        }
        return this.deck;
    }

    discarded() {
        this.deck = this.deck.concat(this.discardPile);
        this.discardPile = [];
    }

    deal(numberOfCards = 1) {
        let hand = [];
        while (hand.length < numberOfCards) {
            hand.push(this.deck.pop());
        }
        return hand;
    }
}

class player {
    constructor(name) {
        this.name = name;
        this.hand = [];
    }

    reciveCards(cards) {
        this.hand = this.hand.concat(cards);
    }

    calculateVal() {
        let value = 0;
        for (let card of this.hand) {
            if (typeof card.value === 'number') {
                value += card.value;
            } else if (card.value !== 'Ace') {
                value += 10;
            }
            else {
                value += 11;
            }
        }
        return value;
    }

    discardHand(deck) {
        deck.discardPile = deck.discardPile.concat(this.hand);
        this.hand = [];
    }

}

function discard(player, numberOfCards) {
    const actualNumberToDiscard = Math.min(numberOfCards, player.hand.length);
    const cardsToDiscard = player.hand.splice(0, actualNumberToDiscard);
    deck.discardPile = deck.discardPile.concat(cardsToDiscard);
}


function resetGame() {
    slim.discardHand(deck);
    luke.discardHand(deck);

    console.log('Discard Pile:', deck.discardPile.length, 'cards');
    deck.discarded();
    deck.shuffle();

    console.log('Deck:', deck.deck.length, 'cards');
    console.log('Slims hand:', slim.hand.length, 'cards');
    console.log('Lukes hand:', luke.hand.length, 'cards');
    console.log('Discard Pile:', deck.discardPile.length, 'cards');
}

let suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
let values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];
let deck = new Deck();

deck.createDeck(suits, values);
// console.log(deck.deal());
deck.shuffle();

let slim = new player('Slim');
let luke = new player('Luke');

slim.reciveCards(deck.deal(5));
luke.reciveCards(deck.deal(5));

console.log('Deck:', deck.deck.length, 'cards left');
console.log('Slims hand:', [...slim.hand], 'total value:', slim.calculateVal());
console.log('Lukes hand:', [...luke.hand], 'total value:', luke.calculateVal());


function PlayerTurn() {
    discard(slim, 2);
    discard(luke, 2);


    slim.reciveCards(deck.deal(2));
    luke.reciveCards(deck.deal(2));
    console.log('Deck:', deck.deck.length, 'cards left');
    console.log('Slims hand:', [...slim.hand], 'total value:', slim.calculateVal());
    console.log('Lukes hand:', [...luke.hand], 'total value:', luke.calculateVal());
}


document.getElementById("pokerBtn").addEventListener('click', PlayerTurn);
document.getElementById("restart").addEventListener('click', resetGame);
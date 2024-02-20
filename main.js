
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
    }

    createDeck(suits, values) {
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
    deal() {
        let hand = [];
        while (hand.length < 2) {
            hand.push(this.deck.pop());
        }
        return hand;
    }
}
let suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
let values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];
let deck = new Deck();

deck.createDeck(suits, values);
// console.log(deck.deal());
console.log(deck.shuffle());
console.log(deck.deal());
const rules = {
    r1: "What's the color of the first card?",
    r2: "Is the next one higher or lower?",
    r3: "Is it between or outside the previous cards?",
    r4: "What's the suit of the final card?",
    win: "Congratulations! You won the round!",
    lose: "Wrong! Try again!",
    reset: "New Deck!",
    shuffle: "You just shuffle the deck!"
}

const suits = ['C', 'D', 'H', 'S'];
const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

let deck = [];
let hand = [];
let values = [];

let createDeck = function () {
    for (let suit of suits) {
        for (let rank of ranks) {
            deck.push(`${rank}${suit}`);
        }
    }
}

let shuffle = function () {
    let counter = deck.length, temp, i;
    while (counter) {
        i = Math.floor(Math.random() * counter--);
        temp = deck[counter];
        deck[counter] = deck[i];
        deck[i] = temp;
    }
}

let createHand = function () {
    while (hand.length = 0) {
        hand.pop();
    }
    while (hand.length < 4) {
        hand.push(deck.pop());
    }
    createValues();
    console.log(hand);
}

let createValues = function() {
    values = [parseInt(hand[0]), parseInt(hand[1]), parseInt(hand[2]), parseInt(hand[3])];
}

let newDeck = function () {
    while (deck.length = 0) {
        deck.pop();
    }
    createDeck();
    shuffle();
}

createDeck();
shuffle();

let instructions = document.querySelector('#instructions');

let start = document.querySelector('#start');
let red = document.querySelector('#red');
let or = document.querySelector('#or');
let black = document.querySelector('#black');
let high = document.querySelector('#high');
let low = document.querySelector('#low');
let between = document.querySelector('#in');
let out = document.querySelector('#out');
let clubs = document.querySelector('#clubs');
let diamonds = document.querySelector('#diamonds');
let hearts = document.querySelector('#hearts');
let spades = document.querySelector('#spades');
let actions = document.querySelectorAll('.action');

let shuffleButton = document.querySelector('#shuffle');
let reset = document.querySelector('#new');


let card1 = document.querySelector('#card1');
let card2 = document.querySelector('#card2');
let card3 = document.querySelector('#card3');
let card4 = document.querySelector('#card4');

let response = document.querySelector('.response');
let responseMsg = document.querySelector('.responseMsg');

function letPlayer() {
    response.classList.add("responseEffect");
}

function correct() {
    response.classList.remove("responseEffect");
    response.classList.remove("wrong");
    response.classList.add("correct");
    response.style.display = "flex";
    responseMsg.textContent = "Correct!";
    setTimeout(() => { letPlayer() }, 700);
}

function wrong() {
    response.classList.remove("responseEffect");
    response.classList.add("correct");
    response.classList.add("wrong");
    response.style.display = "flex";
    responseMsg.textContent = "Wrong!";
    setTimeout(() => { letPlayer() }, 900);
}

function round1() {
    deck.length < 1 ? newDeck() : console.log(deck.length);
    createHand();
    instructions.textContent = rules.r1;
    start.style.display = "none";
    red.style.display = "flex";
    or.style.display = "flex";
    black.style.display = "flex";
    card1.src = "./SVG/blankCard.svg";
    card2.src = "./SVG/blankCard.svg";
    card3.src = "./SVG/blankCard.svg";
    card4.src = "./SVG/blankCard.svg";
    card1.classList.remove("card1");
    card2.style.display = "flex";
    card3.style.display = "flex";
    card4.style.display = "flex";
}

function round2() {
    correct();
    instructions.textContent = rules.r2;
    start.style.display = "none";
    red.style.display = "none";
    black.style.display = "none";
    high.style.display = "flex";
    or.style.display = "flex";
    low.style.display = "flex";
}

function round3() {
    correct();
    instructions.textContent = rules.r3;
    start.style.display = "none";
    high.style.display = "none";
    low.style.display = "none";
    between.style.display = "flex";
    or.style.display = "flex";
    out.style.display = "flex";
}

function round4() {
    correct();
    instructions.textContent = rules.r4;
    start.style.display = "none";
    between.style.display = "none";
    or.style.display = "none";
    out.style.display = "none";
    clubs.style.display = "flex";
    diamonds.style.display = "flex";
    hearts.style.display = "flex";
    spades.style.display = "flex";
}

function win() {
    instructions.textContent = rules.win;
    red.style.display = "none";
    or.style.display = "none";
    black.style.display = "none";
    high.style.display = "none";
    low.style.display = "none";
    between.style.display = "none";
    out.style.display = "none";
    clubs.style.display = "none";
    diamonds.style.display = "none";
    hearts.style.display = "none";
    spades.style.display = "none";
    start.style.display = "flex";
    start.textContent = "Play Again!";
}

function gameOver() {
    wrong();
    instructions.textContent = rules.lose;
    red.style.display = "none";
    or.style.display = "none";
    black.style.display = "none";
    high.style.display = "none";
    low.style.display = "none";
    between.style.display = "none";
    out.style.display = "none";
    clubs.style.display = "none";
    diamonds.style.display = "none";
    hearts.style.display = "none";
    spades.style.display = "none";
    start.style.display = "flex";
    start.textContent = "Play Again!";
}

function again() {
    newDeck();
    win();
    instructions.textContent = rules.reset;
    card1.src = "./SVG/Deck of Cards.svg";
    card1.classList.add("card1");
    card2.style.display = "none";
    card3.style.display = "none";
    card4.style.display = "none";
}

shuffleButton.addEventListener('click', function () {
    shuffle();
    instructions.textContent = rules.shuffle;
});

reset.addEventListener('click', function () {
    again();
})

start.addEventListener('click', function () {
    round1();
});

red.addEventListener('click', function () {
    card1.src = `./SVG/${hand[0]}.svg`
    if (hand[0].indexOf('C') == -1 && hand[0].indexOf('S') == -1) {
        round2();
    } else {
        gameOver();
    }
});

black.addEventListener('click', function () {
    card1.src = `./SVG/${hand[0]}.svg`
    if (hand[0].indexOf('D') == -1 && hand[0].indexOf('H') == -1) {
        round2();
    } else {
        gameOver();
    }
});


high.addEventListener('click', function () {
    card2.src = `./SVG/${hand[1]}.svg`
    if (values[1] >= values[0]) {
        round3();
    } else {
        gameOver();
    }
});

low.addEventListener('click', function () {
    card2.src = `./SVG/${hand[1]}.svg`
    if (values[1] <= values[0]) {
        round3();
    } else {
        gameOver();
    }
});

between.addEventListener('click', function () {
    card3.src = `./SVG/${hand[2]}.svg`
    if (values[0] <= values[1]) {
        if (values[2] >= values[0] && values[2] <= values[1]) {
            round4();
        } else {
            gameOver();
        }
    } else {
        if (values[2] >= values[1] && values[2] <= values[0]) {
            round4();
        } else {
            gameOver();
        }
    }
});

out.addEventListener('click', function () {
    card3.src = `./SVG/${hand[2]}.svg`
    if (values[0] < values[1]) {
        if (values[2] < values[0] || values[2] > values[1]) {
            round4();
        } else {
            gameOver();
        }
    } else {
        if (values[2] < values[1] || values[2] > values[0]) {
            round4();
        } else {
            gameOver();
        }
    }
});

clubs.addEventListener('click', function () {
    card4.src = `./SVG/${hand[3]}.svg`
    if (!(hand[3].indexOf('C') == -1)) {
        correct();
        win();
    } else {
        gameOver();
    }
});

diamonds.addEventListener('click', function () {
    card4.src = `./SVG/${hand[3]}.svg`
    if (!(hand[3].indexOf('D') == -1)) {
        correct();
        win();
    } else {
        gameOver();
    }
});

hearts.addEventListener('click', function () {
    card4.src = `./SVG/${hand[3]}.svg`
    if (!(hand[3].indexOf('H') == -1)) {
        correct();
        win();
    } else {
        gameOver();
    }
});

spades.addEventListener('click', function () {
    card4.src = `./SVG/${hand[3]}.svg`
    if (!(hand[3].indexOf('S') == -1)) {
        correct();
        win();
    } else {
        gameOver();
    }
});
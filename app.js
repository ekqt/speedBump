const rules = {
    rule1: "What's the color of the first card?",
    rule2: "Is the next one higher or lower?",
    rule3: "Is it between or outside the previous cards?",
    rule4: "What's the suit of the final card?",
    congratulations: "Congratulations! You won the round!",
    reset: "New Deck!",
    wrong: "Wrong! Try again!",
    shuffle: "You just shuffle the deck!"
}

const suits = ['C', 'D', 'H', 'S'];
const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];


class Deck {
    constructor() {
        this.deck = [];
    }

    createDeck() {
        this.deck = [];
        for (let suit of suits) {
            for (let rank of ranks) {
                this.deck.push(`${rank}${suit}`);
            }
        }
        return this.deck;
    }

    shuffle() {
        let counter = this.deck.length, temp, i;
        while(counter) {
            i = Math.floor(Math.random()* counter--);
            temp = this.deck[counter];
            this.deck[counter] = this.deck[i];
            this.deck[i] = temp;
        }
        return this.deck;
    }

    deal () {
        let hand =  [];
        while(hand.length<4) {
            hand.push(this.deck.pop());
        }
        return hand;
    }
}

let deck = new Deck;
deck.createDeck();
deck.shuffle();

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
    setTimeout(()=>{letPlayer()},700);
}

function wrong() {
    response.classList.remove("responseEffect");
    response.classList.add("correct");
    response.classList.add("wrong");
    response.style.display = "flex";
    responseMsg.textContent = "Wrong!";
    setTimeout(()=>{letPlayer()},900);
}

let clss = [];
for (let suit of suits) {
    for (let rank of ranks) {
       clss.push(`c${rank}${suit}`);
    }
};

function round1() {
    instructions.textContent = rules.rule1;
    start.style.display = "none";
    red.style.display = "flex";
    or.style.display = "flex";
    black.style.display = "flex";
    card1.classList.remove(...clss);
    card2.classList.remove(...clss);
    card3.classList.remove(...clss);
    card4.classList.remove(...clss);
    card1.classList.remove("doc");
    card1.classList.add("bc");
    card2.classList.add("bc");
    card3.classList.add("bc");
    card4.classList.add("bc");
    card1.style.width = "150px";
    card2.style.display = "flex";
    card3.style.display = "flex";
    card4.style.display = "flex";
}

function round2() {
    correct();
    instructions.textContent = rules.rule2;
    start.style.display = "none";
    red.style.display = "none";
    black.style.display = "none";
    high.style.display = "flex";
    or.style.display = "flex";
    low.style.display = "flex";
}

function round3() {
    correct();
    instructions.textContent = rules.rule3;
    start.style.display = "none";
    high.style.display = "none";
    low.style.display = "none";
    between.style.display = "flex";
    or.style.display = "flex";
    out.style.display = "flex";
}

function round4() {
    correct();
    instructions.textContent = rules.rule4;
    start.style.display = "none";
    between.style.display = "none";
    or.style.display = "none";
    out.style.display = "none";
    clubs.style.display = "flex";
    diamonds.style.display = "flex";
    hearts.style.display = "flex";
    spades.style.display = "flex";
}

function winner() {
    instructions.textContent = rules.congratulations;
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
    start.style.textContent = "Play Again!";
}

function gameOver() {
    wrong();
    instructions.textContent = rules.wrong;
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
    start.style.textContent = "Play Again!";
}

function freshStart() {
    deck.createDeck();
    deck.shuffle();
    winner();
    instructions.textContent = rules.reset;
    card1.src = "./SVG/Deck%20of%20Cards.svg";
    card2.src = " ";
    card3.src = " ";
    card4.src = " ";
    card1.classList.add("doc");
    card1.style.width = "250px";
    card2.style.display = "none";
    card3.style.display = "none";
    card4.style.display = "none";
}

shuffleButton.addEventListener('click', function(){
    deck.shuffle();
    instructions.textContent = rules.shuffle;
});

reset.addEventListener('click', function(){
    freshStart();
})


start.addEventListener('click', function(){
    round1();
    let call = deck.deal();
    let val = [parseInt(call[0]), parseInt(call[1]), parseInt(call[2]), parseInt(call[3])];
    console.log(call);

    red.addEventListener('click', function(){
        card1.classList.remove("bc");
        card1.classList.add(`c${call[0]}`);
        if(call[0].indexOf('C') == -1 && call[0].indexOf('S') == -1){
            round2();
        } else { 
            gameOver();
        }
    });

    black.addEventListener('click', function(){
        card1.classList.remove("bc");
        card1.classList.add(`c${call[0]}`);
        if(call[0].indexOf('D') == -1 && call[0].indexOf('H') == -1){
            round2();
        } else { 
            gameOver();
        }
    });


    high.addEventListener('click', function(){
        card2.classList.remove("bc");
        card2.classList.add(`c${call[1]}`);
        if(val[1] >= val[0]){
            round3();
        } else { 
            gameOver();
        }
    });

    low.addEventListener('click', function(){
        card2.classList.remove("bc");
        card2.classList.add(`c${call[1]}`);
        if(val[1] <= val[0]){
            round3();
        } else { 
            gameOver();
        }
    });

    between.addEventListener('click', function(){
        card3.classList.remove("bc");
        card3.classList.add(`c${call[2]}`);
        if (val[0] <= val[1]) {
            if (val[2] >= val[0] && val[2] <= val[1]){
                round4();
            } else {
                gameOver();
            }
        } else {
            if (val[2] >= val[1] && val[2] <= val[0]){
                round4();
            } else {
                gameOver();
            }
        }
    });

    out.addEventListener('click', function(){
        card3.classList.remove("bc");
        card3.classList.add(`c${call[2]}`);
        if (val[0] < val[1]) {
            if (val[2] < val[0] || val[2] > val[1]){
                round4();
            } else {
                gameOver();
            }
        } else {
            if (val[2] < val[1] || val[2] > val[0]){
                round4();
            } else {
                gameOver();
            }
        }
    });

    clubs.addEventListener('click', function(){
        card4.classList.remove("bc");
        card4.classList.add(`c${call[3]}`);
        if(!(call[3].indexOf('C') == -1)){
            correct();
            winner();
        } else { 
            gameOver();
        }
    });

    diamonds.addEventListener('click', function(){
        card4.classList.remove("bc");
        card4.classList.add(`c${call[3]}`);
        if(!(call[3].indexOf('D') == -1)){
            correct();
            winner();
        } else { 
            gameOver();
        }
    });

    hearts.addEventListener('click', function(){
        card4.classList.remove("bc");
        card4.classList.add(`c${call[3]}`);
        if(!(call[3].indexOf('H') == -1)){
            correct();
            winner();
        } else { 
            gameOver();
        }
    });

    spades.addEventListener('click', function(){
        card4.classList.remove("bc");
        card4.classList.add(`c${call[3]}`);
        if(!(call[3].indexOf('S') == -1)){
            correct();
            winner();
        } else { 
            gameOver();
        }
    });
});
/*
 * Create a list that holds all of your cards
 */
//list of cards
const cards = ["fa-diamond", "fa-diamond",
                  "fa-paper-plane-o", "fa-paper-plane-o",
                  "fa-anchor", "fa-anchor",
                  "fa-bolt", "fa-bolt",
                  "fa-cube", "fa-cube",
                  "fa-leaf", "fa-leaf",
                  "fa-bicycle", "fa-bicycle",
                  "fa-bomb", "fa-bomb"
                ];

function generateCard(card) {
  return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
};

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    };

    return array;
};

function initGame() {
  const deck = document.querySelector('.deck');

  let cardHTML = shuffle(cards).map(function(card) {
    return generateCard(card);
  });

  deck.innerHTML = cardHTML.join('');
};

initGame();

let allCards = document.querySelectorAll('.card');
let openCards = [];
let moves = 0;
let starRating = 3

const deck = document.querySelector('.deck');

let totalMatched = [];

//adds a move for every card that is flipped
function addMoves() {
  moves++;
  const movesText = document.querySelector('.moves');
  movesText.innerHTML = moves;
};

//changes the star to an X if the moves are to high
const stars = document.querySelectorAll(".fa-star");
let listItems = deck.querySelectorAll("li");

listItems.forEach(card => {
  card.addEventListener("click", function() {
      if (moves === 0 && moves < 32) {
      starRating = 3;
    } else if (moves === 33 && moves < 48) {
      stars[2].classList.add("fa-times");
      stars[2].classList.remove("fa-star");
      starRating = 2;
    } else if (moves >= 49) {
      stars[1].classList.add("fa-times");
      stars[1].classList.remove("fa-star");
      starRating = 1;
    }
  });
});

//restart Game
const newGame = document.querySelector('.restart');
const playAgain = document.getElementById('modalRestart')

newGame.addEventListener('click', restartGame);
playAgain.addEventListener('click', restartGame);

function restartGame() {
  location.reload();
}

//add event listeners to show and add classes on click
allCards.forEach(function(card) {
  card.addEventListener('click', function(event) {

    if (startTimer == true) {
      timer();
    };

    if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
      openCards.push(card);
      card.classList.add('open', 'show');

      addMoves();

      if (openCards.length == 2) {
        //adds a match class if the two cards flipped are the same
        if (openCards[0].dataset.card == openCards[1].dataset.card) {
          openCards[0].classList.add('match');
          openCards[0].classList.remove('open');
          openCards[0].classList.remove('show');

          openCards[1].classList.add('match');
          openCards[1].classList.remove('open');
          openCards[1].classList.remove('show');

          totalMatched.push(openCards[0],openCards[1]);

          openCards = [];

          gameOver();

        }else{
          //This should hide the cards if not a match.
          setTimeout(function() {
            openCards.forEach(function(card) {

              card.classList.remove('open', 'show');
            });

            openCards = [];

          }, 600);
        };
      };
    };
  });
});

function gameOver() {
  if (totalMatched.length === 16) {
    openModal();
  };
};

let counter = 0;
let startTimer = true;
// this is the timer
function converter(s) {
  let min = Math.floor(s / 60);
  let sec = Math.floor(s % 60);
  return `${min} : ${sec}`;
};

function timer() {
  let timer = document.getElementById('timer');
  timer.innerHTML = (converter(counter));

  function count() {
    counter+=1;
    timer.innerHTML = (converter(counter));
  };

  setInterval(count, 1000);
  startTimer = false;
};

//the is the Modal
const modal = document.getElementById('popUpModal');
const closeBtn = document.querySelector('.closeBtn');
const modalMsg = document.querySelector('.close');

window.addEventListener('click', click);
closeBtn.addEventListener('click', closeModal);

function openModal() {
  const temp = document.getElementById('timer');
  let clock = temp.textContent;

  modal.style.display = 'block';
  modalMsg.innerHTML = `<div>
                          <h3>CONGRATULATIONS</h3>
                          <p>You completed the game in ${moves} moves with ${starRating} stars and in ${counter} seconds!</p>
                        </div>`;

};

function closeModal() {
  modal.style.display = 'none';
};

function click(clear) {
  if (clear.target === modal) {
    modal.style.display = 'none';
  };
};

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

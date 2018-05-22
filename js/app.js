const modal = document.querySelector('.modal');
const stars = document.querySelector('.stars');
const resetButton = document.querySelector('.restart');
const modalButton = document.querySelector('.play-again');
const popup = document.querySelector('.modal-content');
const counter = document.querySelector('.moves');
const deck = document.querySelector('.deck');
const cardList = document.querySelectorAll(".card");
const cards = [...cardList];
let openCards = [];
let matches = [];
let moves = 0;
let incorrectGuess = 0;


window.onload = newGame();

deck.addEventListener('click', flipCard);
resetButton.addEventListener('click', newGame);
modalButton.addEventListener('click', playAgain);


function newGame() {
  // 1. reset cards to face down
  for (const card of cards) {
    card.classList.remove('open', 'show', 'match');
  }
  // 2. shuffle cards
  let shuffledCards = shuffle(cards);
  // 3. append cards to board
  shuffledCards.forEach(function(card) {
    deck.appendChild(card);
  });
  // 4. reset move move move counter
  moves = 0;
  counter.innerHTML = moves;
  // 5. reset matches array and open cards array
  matches = [];
  openCards = [];
  // 6. reset star rating
  resetStarRating();
}



function flipCard(e) {
  const thisCard = e.target;
    if (thisCard.className === 'card') {
      thisCard.classList.add('open', 'show');
      checkForMatch(e);
    }
    // start timer
    setInterval(setTimer, 1000);
}


function checkForMatch(e) {
  openCards.push(e.target);
  if (openCards.length === 2) {
    moveCounter();
    if (openCards[0].innerHTML === openCards[1].innerHTML) {

      openCards[0].classList.add('match');
      openCards[1].classList.add('match');

      //add current match to matches array
      matches = [...matches, ...openCards];

      emptyOpenCards();
      countMatches();
    } else {
      notMatch();
    }
  }
}

function emptyOpenCards() {
  openCards = [];
}



function moveCounter() {
  moves++;
  counter.innerHTML = moves;
}


function notMatch() {
  disableCards();

  openCards[0].classList.add('incorrect');
  openCards[1].classList.add('incorrect');

  setTimeout(function() {
    openCards[0].classList.remove('open', 'show', 'incorrect');
    openCards[1].classList.remove('open', 'show', 'incorrect');
    enableCards();
    emptyOpenCards();
  }, 1000);

  starRating();
}


function starRating() {
  incorrectGuess++;

  if (incorrectGuess === 5 || incorrectGuess === 10) {
    stars.firstElementChild.remove(1);
  }
}

function resetStarRating() {
  stars.innerHTML =
  `<li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li>`;
}

function disableCards() {
  deck.removeEventListener('click', flipCard);
  for (const card of cards) {
    card.classList.add('disabled');
  }
}


function enableCards() {
  deck.addEventListener('click', flipCard);
  for (const card of cards) {
    card.classList.remove('disabled');
  }
}

function countMatches() {
  if (matches.length === 16) {
    // populate modal
    let starCount = stars.innerHTML;
    document.querySelector('.modal-rating').innerHTML = starCount;
    document.querySelector('.modal-moves').innerHTML = moves;
    toggleModal();
  }
}

function toggleModal() {
  if (modal.classList.contains('visible')) {
    modal.classList.remove('visible');
    setTimeout(function() {
      modal.classList.remove('display');
    }, 500);
  } else {
    modal.classList.add('visible', 'display');
  }
}


function playAgain() {
  toggleModal();
  newGame();
}

let minutes = document.getElementById('minutes');
let seconds = document.getElementById('seconds');
let sec = 0, min = 0;


// function setTimer() {
//   sec++;
//   sec = sec % 60;
//   if (sec < 10) {
//     seconds.innerHTML = "0" + sec;
//   } else {
//     seconds.innerHTML = sec;
//   }
//   if (sec == 0) {
//     min++;
//     if (min < 10) {
//       minutes.innerHTML = "0" + min;
//     } else {
//       minutes.innerHTML = min;
//     }
//   }
// }

function setTimer() {
  sec++;
  sec = sec % 60;

  seconds.innerHTML = pad(sec);
  if (sec == 0) {
    min++;
  }
  minutes.innerHTML = pad(min);
}


function pad(val) {
  if (val < 10) {
    return "0" + val;
  } else {
    return val;
  }
}





// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

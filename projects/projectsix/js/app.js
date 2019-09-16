
// dom element selection
const qwerty = document.querySelector('div#qwerty');
const phrase = document.querySelector('div#phrase');
const scoreboard = document.querySelector('ol');
const btn = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');

// let typedletter;
let phraseArray;
let missed = 0;
let correctGuesses = 0;

// array of phrases
const phrases = ['I still havnt found what I am looking for', 'Vertigo', 'Man and Woman', 'Stuck in a moment', 'City of blinding lights', 'Joshua Tree', 'Sometimes You Cant Make It On Your Own'];

const allhearts = `
  <li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>
  <li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>
  <li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>
  <li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>
  <li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>
`;

function resetOverlay(displayvalue, win, lose) {
  overlay.style.display = displayvalue;
  overlay.classList.remove(win);
  overlay.classList.remove(lose);
}

// get a random phrase and split array item into characters
function getRandomPhraseAsArray(arr) {
  let randomNumber = Math.floor((Math.random() * 7) + 0);
  let phrase = arr[randomNumber];
  phraseArray = phrase.split("");
  console.log(phraseArray);
};
// call ramdom phrase function returns array of characters
getRandomPhraseAsArray(phrases);


function addPhraseToDisplay(arr) {
  let x;
  for (x in phraseArray) {
    let li = document.createElement('li');
    li.innerText = phraseArray[x];
    let ul = phrase.children;
      if (phraseArray[x] !== " ") {
          li.className = "letter";
         }
      else {
        li.className = "space";
      }
    ul[0].appendChild(li);
  };
  return phrase;
};
addPhraseToDisplay(phraseArray);



btn.addEventListener('click', (e) => {
    // reset variables that count progress of game
    function resetCounters() {
      missed = 0;
      correctGuesses = 0;
    };
    // reset parameters for first start:
    function startGame() {
      resetCounters();
      resetOverlay('none', 'win', 'lose');
    };
    // clear parameter to start over again:
    function startOver() {
      // create and append new random phrase
      getRandomPhraseAsArray(phrases);
      addPhraseToDisplay(phraseArray);
      resetOverlay('none', 'win', 'lose');
      resetCounters();
      // restore all hearts to dom from template literal:
      scoreboard.innerHTML = allhearts;
      const buttonsChosen = document.querySelectorAll('.chosen');
      // loop through buttons with class chosen and remove class for new try:
      for (let i = 0; i < buttonsChosen.length; i += 1) {
        buttonsChosen[i].className = '';
        buttonsChosen[i].disabled = false;
      }
    };
    if (btn.textContent === 'Start Game') {
      // overlay.style.display = 'none';
      startGame();
    } else if (btn.textContent === 'Start over again') {
        //remove previous li's with phrase letters
      startOver();
    }
});


// select appended li elements with class letter
// used in checkletter and checkwin functions
let phraseletters = document.querySelectorAll('.letter');
let phraselength = phraseletters.length;


// function: test typed letter with phrase, handle branches
function checkLetter(button) {
  const letterFound = button.innerText;
  const phraseString = phraseArray.toString();
  const phraseStringLower = phraseString.toLowerCase();

  // function handle wrong guesses
  function wrongGuess() {
    missed += 1;
    const scoreboardItem = document.querySelector('.tries');
    scoreboardItem.classList.add('remove');
    // console.log('you have ' + (5 - missed) + ' guess(es) left');
    scoreboard.removeChild(scoreboardItem);
  }
  // function handle correct guesses
  function correctGuess() {
    phraseletters = '';
    phraselength = 0;
    phraseletters = document.querySelectorAll('.letter');
    phraselength = phraseletters.length;

    for (let i = 0; i < phraseletters.length; i += 1) {
      let phraselettersItem = phraseletters[i];
      let phraselettersItemHTML = phraselettersItem.innerHTML;
      let phraselettersText = phraselettersItemHTML.toLowerCase();

      if (phraselettersText.includes(letterFound)) {
        phraseletters[i].classList.add('show');
        correctGuesses += 1;
      }
    }
  }
  // handle wrong guesses branch
  if (!phraseStringLower.includes(letterFound)) {
    wrongGuess();
  } else {
    // handle correct guesses
    correctGuess();
  }
};



function checkWin() {
  function winLoseMessage(className, messageTitle, btnText) {
    overlay.style.display = '';
    overlay.classList.add(className);
    const message = document.querySelector('.title');
    message.textContent = messageTitle;
    btn.textContent = btnText;
    let ul = document.querySelector('ul');

    while (ul.hasChildNodes()) {
      ul.removeChild(ul.firstChild);
    }

  };
  const btn = document.querySelector('a.btn__reset');
  // handle loose branch with if
  if (missed == 5) {
    winLoseMessage('lose', 'Sorry you lost!', 'Start over again');
  }
  // handle win branch with else
  else if (correctGuesses == phraselength) {
    winLoseMessage('win', 'Congratulations, you won!', 'Start over again');
  }
};

// Add an event listener to the keyboard container, call checkLetter function on event
qwerty.addEventListener('click', (event) => {
  // add class on typed letters
  if (event.target.tagName == 'BUTTON') {
      event.target.className = 'chosen';
      event.target.disabled = true;
      const targetbutton = event.target;
      checkLetter(targetbutton);
      checkWin();
  }
});


let missed = 0;

const qwerty = document.querySelector('#qwerty');
const keyboard = qwerty.querySelectorAll('button');
const phrase = document.querySelector('#phrase');
const overlay = document.querySelector('#overlay');
const gameStartButton = document.querySelector('.btn__reset');
const phraseUl = phrase.querySelector('ul');

// Array of phrases for players to guess from
let phrases = ["chores are lame", "i love chicken", "you can do it", "front to back", "a great start"];

// Functions: 


function randomRGB(){
  let red = Math.floor(Math.random() * 256)
  let green = Math.floor(Math.random() * 256);
  let blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
}


function resetScoreBoard(){
  let scoreBoardOl = document.querySelector('#scoreboard ol');
  while(scoreBoardOl.firstElementChild){
    scoreBoardOl.removeChild(scoreBoardOl.firstElementChild);
  }
  for(let i = 0; i < 5; i ++){
    let li = document.createElement('li');
    let img = document.createElement('img');
    li.className = 'tries';
    img.setAttribute('src', 'images/liveHeart.png');
    img.setAttribute('height', '35px');
    img.setAttribute('width', '35px');
    li.appendChild(img);
    scoreBoardOl.appendChild(li);
  }
}


function backgroundColorWarningPerMiss(){
  let body = document.querySelector('body');
  let misses = {
    1:()=>{
      body.style.backgroundColor = '#FB7878'
    },
    2:()=>{
      body.style.backgroundColor = '#DC6969'
    },
    3:()=>{
      body.style.backgroundColor = '#BC5A5A'
    },
    4:()=>{
      body.style.backgroundColor = '#9D4B4B'
    },
  }
  if(missed < 5){
    misses[missed]();
  }
}

function checkWin () {
  let liLetters = document.querySelectorAll('#phrase li.letter');
  let liShow = document.querySelectorAll('#phrase li.show');
  if(liLetters.length === liShow.length){
    overlay.className = 'win';
    let overlayH2 = overlay.querySelector('.title');
    let overlayA = overlay.querySelector('a');
    overlayH2.textContent = "You Win: Congratulations"
    overlayA.textContent = "play again"
    overlay.style.display = '';

  }else if (missed === 5) {
    overlay.className = "lose";
    let overlayH2 = overlay.querySelector('.title');
    let overlayA = overlay.querySelector('a');
    overlayH2.textContent = "Sorry You Lose!!!"
    overlayA.textContent = "play again"
    overlay.style.display = '';
  }
}

function getRandomPhraseAsArray (arr){
  let arrayLength = arr.length;
  function randomNum (topNum=arrayLength){
    return Math.floor(Math.random() * topNum);
  };
  let chosenSentence = arr[randomNum()];
  let arrayOfCharacters = chosenSentence.split('');
  return arrayOfCharacters;  
}

function addPhraseToDisplay (arrOfCharacters){
  for(let i = 0; i < arrOfCharacters.length; i ++){
    let char = arrOfCharacters[i];
    let li = document.createElement('li');
    li.textContent = char;
    if(char !== " "){
      li.className = 'letter';
    } else {
      li.className = 'space';
    }
    phraseUl.appendChild(li);
  }
}


function checkLetter (buttonPressed) {
  let letters = phraseUl.querySelectorAll('.letter');
  let buttonText = buttonPressed.textContent
  let match = null;
  for(let i = 0; i < letters.length; i++){
    if(letters[i].textContent === buttonText) {
      letters[i].className = "show letter";
      letters[i].style.backgroundColor = randomRGB();
      letters[i].style.height = '75px';
      letters[i].style.width = '75px';
      match = letters[i].textContent;
    }
  }
  return match;

}

//  Event Handelers: 

overlay.addEventListener('click', (e)=>{
  let startLink = e.target;
  if(startLink.textContent === 'Start Game'){
  overlay.style.display = 'none';
  addPhraseToDisplay(getRandomPhraseAsArray(phrases));
  } else if (startLink.textContent === 'play again'){
      overlay.style.display = 'none';
      while(phraseUl.firstElementChild){
        phraseUl.removeChild(phraseUl.firstElementChild);
      }
      let body = document.querySelector('body');
      body.style.backgroundColor = 'white';
      addPhraseToDisplay(getRandomPhraseAsArray(phrases));
      resetScoreBoard();
      missed = 0;
      for(let i = 0; i < keyboard.length; i++){
        keyboard[i].className = '';
        keyboard[i].removeAttribute('disabled');
      }
    }
});

qwerty.addEventListener('click', (e)=>{
 let button = e.target;
 if(button.tagName === "BUTTON"){
  button.className = "chosen";
  button.setAttribute('disabled','true');
  let letterFound = checkLetter(button);
  if(letterFound === null){
    let scoreBoardOl = document.querySelector('#scoreboard ol');
    let lastChildLi = scoreBoardOl.lastElementChild;
    let list = scoreBoardOl.querySelectorAll('li');
    scoreBoardOl.removeChild(lastChildLi);
    missed += 1;
    backgroundColorWarningPerMiss();
  }
  checkWin();
 }
});
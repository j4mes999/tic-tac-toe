import { TIE, WINNER, checkGameFlow } from './FlowGame.js';
import { createPlayer } from './createPlayer.js';

// X = 1
// O = 0
const X = 'X';
const O = 'O';

export let boardModel = [[null,null,null],[null,null,null],[null,null,null]];
let round = 0;
let player1;
let player2;


// selectors:
const boardSpaces = document.querySelectorAll('.button');
const startButton = document.querySelector('.begin-button');
const restartButton = document.querySelector('.restart-button');
const boardContainer = document.querySelector('.board-container');
const formContainer = document.querySelector('.form-container');
const player1Name = document.getElementById('player1');
const player2Name = document.getElementById('player2');
const infoPanel = document.querySelector('.info-panel');

//TODO separate UI logic from model logic

// ********** Cell game logic **********
boardSpaces.forEach((e,i) => e.addEventListener('click', () => {
  e.disabled = true;
  round++;
  if ((round) % 2 === 1){
    boardSpaces[i].textContent = X;
  }else{
    boardSpaces[i].textContent = O;
  }
  drawModel(i, boardSpaces[i].textContent);
  drawBoardState();
  const gameState = checkGameFlow();
  if(round % 2 === 1){
    infoPanel.textContent = 'It is your turn ' + player2.firstName;
  }else {
    infoPanel.textContent = 'It is your turn ' + player1.firstName;
  }
  
  if( gameState === WINNER || gameState === TIE){
    restartButton.style.display = '';
    if(gameState === WINNER && round % 2 === 1){
      infoPanel.textContent = player1.firstName + ' won!';
      player1.incGamesWon();
    }else if(gameState === WINNER && round % 2 === 1){
      infoPanel.textContent = player2.firstName + ' won!';
      player2.incGamesWon();
    }else if (gameState === TIE){
      infoPanel.textContent = ' Tie! ';
    }
    if(round < 9 ){
      disableAllButtons();
    }
    
    console.log(player1.firstName + ' ' + player1.getGamesWon());
    console.log(player2.firstName + ' ' + player2.getGamesWon());
  } 
}));

// ********** Start Game **********
startButton.addEventListener('click', () => {
  boardContainer.style.display = ''
  formContainer.style.display = 'none';
  startButton.style.display = 'none';
  
  player1 = createPlayer(player1Name.value,'',66);
  player2 = createPlayer(player2Name.value,'',66);
  infoPanel.textContent = infoPanel.textContent + ' ' +player1.firstName;
});


// ********** Restart game **********
restartButton.addEventListener('click', () => {
  restartButton.style.display = 'none';
  boardSpaces.forEach(e => {
    e.disabled = false;
    e.textContent = '';
  });
  boardModel = boardModel.map(() => {
    return [null,null,null];
  });
  round = 0;
  infoPanel.textContent = "It is your turn "+player1.firstName;
});

function disableAllButtons(){
  boardSpaces.forEach(e => {
    e.disabled = true;
  })
}

function drawBoardState(){
  let i =0;
  for (let arrow of boardModel){
    for (let elem of arrow) {
        if(elem === 0 ) {
          boardSpaces[i].textContent = O;
        }else if (elem === 1){
          boardSpaces[i].textContent = X;
        }
        i++;
    }
  }
}


function drawModel(i, content){

 if( i >= 0 && i <= 2){
  boardModel[0][i] = associateObjToModel(content);
 }else if( i >= 3 && i <= 5){
  i -= 3;
  boardModel[1][i] = associateObjToModel(content);
 }else if( i >= 6 && i <= 8){
  i -= 6;
  boardModel[2][i] = associateObjToModel(content);
 }

}

function associateObjToModel(content){
  if(content === X){
    return 1;
  }else{
    return 0;
  }
}

function printBoardModel(){
  boardModel.forEach((el,i) => {
    console.log('index: ' + i + ' '+el);
  });
}




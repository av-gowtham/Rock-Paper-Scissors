let score= JSON.parse(localStorage.getItem('score')) || {
  wins : 0,
  losses : 0, 
  ties : 0
} 

updateScoreElement();

let isAutoPlaying = false;
let intervalId;

function autoPlay(){
  if(!isAutoPlaying){
    intervalId = setInterval(function(){
      playGame(computerMove());
    }, 1000);
    isAutoPlaying = true;
    document.querySelector('.js-autoplay')
      .innerHTML = 'Stop playing';
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.js-autoplay')
      .innerHTML = 'Auto play';
  }
}

document.body.addEventListener('keydown', (event) =>{
  if(event.key === 'a' || event.key === 'A'){
    autoPlay();
   }
   else if (event.key === 'r' || event.key === 'R'){
    playGame('Rock');
   }
   else if (event.key === 'p' || event.key === 'P'){
    playGame('Paper');
   }
   else if (event.key === 's' || event.key === 'S'){
    playGame('Scissors');
   }
   else if (event.key === 'Backspace'){
    resetScore(); 
   }
   else if (event.key === 'n' || event.key === 'N'){
    hideResetMessage();
   }
   else if (event.key === 'Enter'){
    reset();
    hideResetMessage();
   }
});

document.querySelector('.js-rock')
  .addEventListener('click', () =>{
    playGame('Rock');
  });
  
document.querySelector('.js-paper')
.addEventListener('click', () =>{
  playGame('Paper');
});

document.querySelector('.js-scissors')
  .addEventListener('click', () =>{
    playGame('Scissors');
  });

document.querySelector('.js-autoplay')
  .addEventListener('click', () => {
    autoPlay();
  });

function resetScore(){
      document.querySelector('.js-confirmation')
        .innerHTML = `<p class="reset-para">Are you sure you want to reset the score?</p><div><button class="js-confirm">YES</button><button class="js-not-confirm">NO</button></div>`;

    document.querySelector('.js-confirm')
      .addEventListener('click', () => {
        reset();
        hideResetMessage();
      });

    document.querySelector('.js-not-confirm')
      .addEventListener('click', () => {
        hideResetMessage();
      })

}

document.querySelector('.js-reset')
.addEventListener('click', () => {
  resetScore();
});

function hideResetMessage(){
  document.querySelector('.js-confirmation')
    .innerHTML = '';
}

function reset(){
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score')
  updateScoreElement();
}


function playGame(yourMove){

  let handElement = document.querySelector('.Rock');
  handElement.classList.remove('is-selected')
  handElement = document.querySelector('.Paper');
  handElement.classList.remove('is-selected')
  handElement = document.querySelector('.Scissors');
  handElement.classList.remove('is-selected')

  computerMove();
  let computermove = computerMove();

  let result='';

  if(yourMove === 'Rock'){
    if(computermove === 'Rock'){
      result = 'Tie.';
    } else if(computermove === 'Paper'){
      result = 'You loss.';
    } else if(computermove === 'Scissors'){
      result = 'You win.';
    }
    // handElement = document.querySelector(`.${yourMove}`);
    // handElement.classList.add('is-selected')

  } else if(yourMove === 'Paper'){
    if(computermove === 'Rock'){
      result = 'You win.';
    } else if(computermove === 'Paper'){
      result = 'Tie.';
    } else if(computermove === 'Scissors'){
      result = 'You loss.';
    }
    // handElement = document.querySelector(`.${yourMove}`);
    // handElement.classList.add('is-selected')

  } else if(yourMove === 'Scissors'){
    if(computermove === 'Rock'){
      result = 'You loss.';
    } else if(computermove === 'Paper'){
      result = 'You win.';
    } else if(computermove === 'Scissors'){
      result = 'Tie.';
    }
    // handElement = document.querySelector(`.${yourMove}`);
    // handElement.classList.add('is-selected')
    
  }

  document.querySelector('.result')
    .innerHTML = result;

  document.querySelector('.moves')
    .innerHTML = `You <img src="./image/${yourMove}-emoji.png" alt="${yourMove} symbol" class="hand-symbol"> 
    <img src="./image/${computermove}-emoji.png" alt="${computermove} symbol" 
    class="hand-symbol">
    Computer`;

  if(result === 'You win.'){
    score.wins += 1;
  } else if (result === 'You loss.'){
    score.losses += 1;
  } else if (result === 'Tie.'){
    score.ties += 1;
  }

  localStorage.setItem('score' , JSON.stringify(score));

  updateScoreElement();
}

function computerMove(){
  const randomNumber= Math.random();
  
  let computerMove='';
  if(randomNumber >= 0 && randomNumber < 0.33){
    computerMove= 'Rock';
  } else if(randomNumber >= 0.33 && randomNumber < 0.66){
    computerMove = 'Paper';
  } else if(randomNumber >= 0.66 && randomNumber <= 1){
    computerMove = 'Scissors';
  }
  // handElement = document.querySelector(`.${computerMove}`);
  // handElement.classList.add('is-selected')
 
  return computerMove;
}

function updateScoreElement(){
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties},<p>Total Games Played: ${score.wins + score.losses + score.ties}</p>`;
}


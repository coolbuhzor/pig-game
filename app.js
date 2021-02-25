/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//FIRST I CREATED A LIST OF VARIABLES.
/*
l(et scores , roundScores, activePlayer

scores = [0,0]
roundScore = 0
activePlayer = 0;


document.querySelector('.dice').style.display = 'none'
//we are goung to set all scores on the board to '0' i.e zero
document.getElementById('score-0').textContent = 0
document.getElementById('score-1').textContent = 0
document.getElementById('current-0').textContent = 0
document.getElementById('current-1').textContent = 0)

the above code was moved to function below to respect the DRY principle (don't repeat yourself principle)
*/
let scores, roundScores, activePlayer, gamePlaying;
init();

document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gamePlaying) {
    // 1 we need the dice to roll, i.e generate random numbers
    let dice;
    dice = Math.floor(Math.random() * 6) + 1;
    console.log(dice);

    // 2. try manipulating the dice image, and sisplaying result
    let diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = `/img/dice-${dice}.png`;

    //3. update the score if the rolled number is not 1
    if (dice !== 1) {
      //add to score
      roundScore += dice; // roundScore += dice is the same thing as roundScore = roundScore + dice
      document.querySelector(
        `#current-${activePlayer}`
      ).textContent = roundScore;
    } else {
      // move to the next player
      nextPlayer();
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gamePlaying) {
    //add Current score to Global score
    scores[activePlayer] += roundScore;

    //update UI
    document.querySelector(`#score-${activePlayer}`).textContent =
      scores[activePlayer];
    // check if player won
    if (scores[activePlayer] >= 20) {
      document.querySelector(`#name-${activePlayer}`).textContent =
        ' winner!!!';
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.add('winner');
      document.querySelector('.dice').style.display = 'none';
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.remove('active');
      gamePlaying = false;
    } else {
      //next player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0; // if active player = 0 then active player = 1 else active player = 0 and roundscore = 0
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  //document.querySelector('.player-0-panel').classList.remove('active')
  //document.querySelector('.player-1-panel').classList.add('active')

  document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

// we need to create a function that would reset everything when the game loads and also when the new game button is pressed.
//we can say this is a refresher function
function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector('.dice').style.display = 'none';
  //we are goung to set all scores on the board to '0' i.e zero
  document.getElementById('score-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;
  //the code below is to ,ake sure the names of players are set whenever the gameis refreshed
  document.querySelector(`#name-0`).textContent = 'player 1';
  document.querySelector(`#name-1`).textContent = 'player 2';
  //since the init functioin is also used to refresh the game.. we need to remove the reset the active class and the winner class hence the code below.
  document.querySelector(`.player-0-panel`).classList.remove('winner');
  document.querySelector(`.player-1-panel`).classList.remove('winner');
  document.querySelector(`.player-0-panel`).classList.remove('active');
  document.querySelector(`.player-1-panel`).classList.remove('active');
  document.querySelector(`.player-0-panel`).classList.add('active');
}

// side note
// a state variable tells us the condition of a system

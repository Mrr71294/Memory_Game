function initializeVariables(){
score = 0;
pairsCorrect = 0;
incorrectGuesses = 0;
startingStars = 3;
endingStarBonus = 0;
selectedCards = [];
ungessedCards = [];
canSelectCard = true;
cards = [
      { name:"cpp",        img:"cpp-logo.png",        instance:"1" },
      { name:"cpp",        img:"cpp-logo.png",        instance:"2" },
      { name:"css",        img:"css-logo.png",        instance:"1" },
      { name:"css",        img:"css-logo.png",        instance:"2" },
      { name:"html5",      img:"html5-logo.svg",      instance:"1" },
      { name:"html5",      img:"html5-logo.svg",      instance:"2" },
      { name:"java",       img:"java-logo.png",       instance:"1" },
      { name:"java",       img:"java-logo.png",       instance:"2" },
      { name:"javascript", img:"javascript-logo.jpg", instance:"1" },
      { name:"javascript", img:"javascript-logo.jpg", instance:"2" },
      { name:"mongodb",    img:"mongodb-logo.jpg",    instance:"1" },
      { name:"mongodb",    img:"mongodb-logo.jpg",    instance:"2" },
      { name:"node",       img:"node-logo.png",       instance:"1" },
      { name:"node",       img:"node-logo.png",       instance:"2" },
      { name:"php",        img:"php-logo.png",        instance:"1" },
      { name:"php",        img:"php-logo.png",        instance:"2" },
      { name:"python",     img:"python-logo.jpg",     instance:"1" },
      { name:"python",     img:"python-logo.jpg",     instance:"2" },
      { name:"ruby",       img:"ruby-logo.png",       instance:"1" },
      { name:"ruby",       img:"ruby-logo.png",       instance:"2" },
      { name:"angular2",   img:"angular2-logo.png",   instance:"1" },
      { name:"angular2",   img:"angular2-logo.png",   instance:"2" },
      { name:"react",      img:"react-logo.png",      instance:"1" },
      { name:"react",      img:"react-logo.png",      instance:"2" },
    ];
}

//Function that takes in an array of cards and turns it into html to be injected/
function displayCards(cardsArray){
  let html = '';
  cardsArray.forEach(function(card){
    html += '<div class="flip-container ' + card.name + '" id="' + card.name + card.instance + '">';
    html += '<div class="flipper">';
    html += '<div class="front">';
    html += '<img class="card-front active" src="images/card-back.png" alt="Front of card">';
    html += '</div>';
    html += '<div class="back">';
    html += '<img src="images/' + card.img + '" alt="' + card.name + '">';
    html += '</div>';
    html += '</div>';
    html += '</div>';
  });
  $("#cards-container").html(html);
}

//A function to shuffle an array///////////////////////////////////////////////
function shuffle(array) {
  var i = 0 , j = 0 , temp = null;

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
//shuffles the array of cards///////////////////////////////////////////////////
function shuffleCards(cardsArray){
  shuffle(cards);
}


//Event Listner to turn cards when clicked.//
function listenForCardFlip(){
  $(".flip-container").click(function(){
    //if you cant select card, end function.
    if (canSelectCard === false) {
      return;
    }
    //checks if the selected card has the same ID as the first selected card so you cant choose the same card twice.
    //clears the selection queue if its the same and flips it back down.
    if ($(selectedCards[0]).attr('id') === $(this).attr('id')) {
        selectedCards = [];
        $(this).toggleClass("flip");
        return;
    }
    //flip selected card and push it into the selected cards array.
    $(this).toggleClass("flip");
    selectedCards.push(this);
    checkSelectedCards();
  });
}

//Change correct pairs "front" card to "complete" img, disable its event listner so it cant be flipped, remove its active class so it cant be choosen for a power up, and flip them back down.
function disableCorrectCards(){
  $(selectedCards[0]).find('.card-front').attr('src','images/done-card-back.png');
  $(selectedCards[1]).find('.card-front').attr('src','images/done-card-back.png');
  $(selectedCards[0]).find('.card-front').removeClass('active');
  $(selectedCards[1]).find('.card-front').removeClass('active');
  $(selectedCards[0]).off('click');
  $(selectedCards[1]).off('click');
  flipCardsBackDown();
}

//Checks if all 12 pairs have been flipped and resets all cards if true.
function checkIfAllCardsCorrect(){
  //Avoids 0 % 12 === 0(avoids all flipping when no pairs have been made).
  if(pairsCorrect === 0){
    return;
  }
  else if(pairsCorrect % 12 === 0){
    setTimeout(function(){
      resetCards();
    }, 900);
  }
}

//Flips selected pair back down and empties selection queue after a moment to view them.
function flipCardsBackDown(){
  setTimeout(function(){
    $(selectedCards[0]).toggleClass("flip");
    $(selectedCards[1]).toggleClass("flip");
    selectedCards = [];
    canSelectCard = true;
  }, 550);
}

//If selected pair is correct, update the score, empty queue, & disable pair. If they dont match, flip them back down.
function checkSelectedCards(){
  if (selectedCards.length === 2) {
    canSelectCard = false;
    if ($(selectedCards[0]).attr('class') === $(selectedCards[1]).attr('class')) {
      score += 1234;
      pairsCorrect += 1;
      CheckIfCardsAreFrozenAndFreeze();
      $('.odometer').html(score);
      disableCorrectCards();
      checkIfAllCardsCorrect();
    }
    else {
      flipCardsBackDown();
      incorrectGuesses +=1;
      $('#incorrect-flips').html(incorrectGuesses);
      updateStars();
    }
  }
}

//Checks if incorrect flips match star value and if true, changes star img and removes one star point from the bonus calculator.
function updateStars(){
  if (incorrectGuesses === 10) {
    $('#star-10').attr('src','images/black-star.png');
    startingStars -= 1;
  }
  else if (incorrectGuesses === 20) {
    $('#star-20').attr('src','images/black-star.png');
    startingStars -= 1;
  }
  else if (incorrectGuesses === 30) {
    $('#star-30').attr('src','images/black-star.png');
    startingStars -= 1;
  }
}

//resets star images and starting stars queue back to 3. adds current star bonus to total star bonus.
function resetStars(){
  $('#star-10').attr('src','images/star.png');
  $('#star-20').attr('src','images/star.png');
  $('#star-30').attr('src','images/star.png');
  endingStarBonus += startingStars;
  startingStars = 3;
  incorrectGuesses = 0;
}

//calculates the star bonus based on how many stars are left in the ending star bonus array.
function addStarBonusToScore(){
  let starBonus = endingStarBonus * 1000;
  $('#star-bonus').html(starBonus);
  score += starBonus;
}

//Inject score and pairs results into "Results popup".
function displayScore(){
  $("#memory-score").html(score);
  $("#correct-pairs").html(pairsCorrect);
}


//When timer reaches zero, add star bonus, display "results popup" & enable overlay to focus results.
function countdownComplete(unit, value, total){
	if(total<=0){
    addStarBonusToScore();
    displayScore();
    showResults();
    $('#overlay').css('display', 'block');
	}
}

//Initiate first "Timer" and allow cards to be flipped .
function startTimer(){
  $("#timer").TimeCircles().start();
  $('#start-column').hide();
  $('#refresh-column').show();
  listenForCardFlip();
}

//unhide the results PopUp and hide placeholder divs.(using placeholders for css grids.)
function showResults(){
  $('.resultsPopUp').fadeIn('slow');
  $('.placeholder').hide();

}
//hide the results PopUp and unhide placeholder divs.(using placeholders for css grids.)
function hideResults(){
  $('.resultsPopUp').hide();
  $('.placeholder').show();
}

//finds the cards that havent been matched with class active and returns them in a single array.
function returnUnguessedCards(){
  ungessedCards.splice(0,ungessedCards.length, $('.active'));
  //concats the return into a single array of elements.
  ungessedCards = [].concat.apply([], ungessedCards);
  console.log(ungessedCards);
}

//randomly selects an active cards and gives it class frozen and changes its card back to "frozen"
//after 10 seconds, unfreezes the card by removing class frozen and changing card back to normal.
function freezeRandomCard(){
  returnUnguessedCards();
  let randomValue = ungessedCards[0][Math.floor(Math.random() * ungessedCards[0].length)];
  $(randomValue).attr('src','images/frozen-card-back.png');
  $(randomValue).toggleClass('frozen');
  setTimeout(function(){
    if ($(randomValue).hasClass('frozen')) {
      $(randomValue).attr('src','images/card-back.png');
      $(randomValue).toggleClass('frozen');
    }
  }, 10000);
}


//activate the freeze power up every 10 seconds.
function activateFreezePowerUp(unit, value, total){
  if(total % 10 === 0){
    freezeRandomCard();
  }
}

//checks if ethier of the selected cards have the frozen power up class when its paired, if it does, it will freeze the timer and remove the frozen class.
function CheckIfCardsAreFrozenAndFreeze(){
  if ($(selectedCards[0]).find('.card-front').hasClass('frozen') || $(selectedCards[1]).find('.card-front').hasClass('frozen')) {
    $("#timer").TimeCircles().stop();
    $("#timer").css({"background-image": "url(images/frozen-background.jpg)"});
    $('#frozen-header').show();
    $(selectedCards[0]).find('.card-front').removeClass('frozen');
    $(selectedCards[1]).find('.card-front').removeClass('frozen');
    unactivateFreezePowerUpr();
  }
}

//unfreezes the timer and resets its background after 15 seconds.
function unactivateFreezePowerUpr(){
  setTimeout(function(){
    $("#timer").TimeCircles().start();
    $("#timer").css({"background-image": "none"});
    $('#frozen-header').hide();
  }, 15000);
}

//Shuffles & resets all cards & stars without effecting score and current timer.
function resetCards(){
  resetStars();
  selectedCards = [];
  canSelectCard = true;
  shuffleCards(cards);
  displayCards(cards);
  listenForCardFlip();
}

//Resets the whole game(timer, cards, scores, stars, ect).
function restartGame(){
  resetStars();
  initializeVariables();
  shuffleCards(cards);
  displayCards(cards);
  listenForCardFlip();
  $('.odometer').html(score);
  $('.resultsPopUp').hide();
  $('.placeholder').show();
  $("#timer").TimeCircles().restart();
  $('#overlay').css('display', 'none');
  $("#try-again").click(function(){
    restartGame();
  });
}

//Set evrything up and start event listners.
function startGame(){
  initializeVariables();
  shuffleCards(cards);
  displayCards(cards);
  hideResults();
  $('.odometer').html(score);
  $('#refresh-column').hide();
  $("#timer").TimeCircles({count_past_zero: false}).addListener(countdownComplete).addListener(activateFreezePowerUp);
  $("#timer").TimeCircles().stop();
  $('#overlay').css('display', 'none');
  $("#try-again").click(function(){
    restartGame();
  });
  $('#start-button').click(function(){
    startTimer();
  });
  $('#refresh-button').click(function(){
    restartGame();
  });
}

//Start the game! :D
startGame();

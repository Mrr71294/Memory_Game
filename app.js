var score = 0;
var pairsCorrect = 0;
var selectedCardsClass = [];
var selectedCardsID = [];
var canSelectCard = true;
var cards = [
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

//Function that takes in an array of cards and turns it into html to be injected/
function displayCards(cardsArray){
  let html = '';
  cardsArray.forEach(function(card){
    html += '<div class="flip-container ' + card.name + '" id="' + card.name + card.instance + '">';
    html += '<div class="flipper">';
    html += '<div class="front">';
    html += '<img class="img" src="images/card-back.png" alt="Front of card">';
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
    //if the selected card ID is already in the selected" queue, empty the queues & flip back over.
    if (selectedCardsID[0] === $(this).attr('id')) {
        selectedCardsClass = [];
        selectedCardsID =[];
        $(this).toggleClass("flip");
        return;
    }
    //flip selected card and push its Id and Class to respective queue.
    $(this).toggleClass("flip");
    selectedCardsClass.push($(this).attr('class').split(' ')[1]);
    selectedCardsID.push($(this).attr('id'));
    checkSelectedCards();
  });
}

//Change correct pairs "front" card to "complete" img, disable its event listner, and flip them back down.
function disableCorrectCards(){
  $("#" + selectedCardsID[0] + " > .flipper > .front > .img").attr('src','images/done-card-back.png');
  $("#" + selectedCardsID[1] + " > .flipper > .front > .img").attr('src','images/done-card-back.png');
  $("#" + selectedCardsID[0] + "").off('click');
  $("#" + selectedCardsID[1] + "").off('click');
  flipCardsBackDown();
}

//Checks if all 12 pairs have been flipped and resets cards if true.
function checkIfAllCardsCorrect(){
  //Avoids 0 % 12 === 0.
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
    $("#" + selectedCardsID[0] + "").toggleClass("flip");
    $("#" + selectedCardsID[1] + "").toggleClass("flip");
    selectedCardsID = [];
    selectedCardsClass = [];
    canSelectCard = true;
  }, 550);
}

//If selected pair is correct, update the score, empty queue, & disable pair. If they dont match, flip them back down.
function checkSelectedCards(){
  if (selectedCardsClass.length === 2) {
    canSelectCard = false;
    if (selectedCardsClass[0] === selectedCardsClass[1]) {
      score += 1234;
      pairsCorrect += 1;
      $('.odometer').html(score);
      disableCorrectCards();
      checkIfAllCardsCorrect();
    }
    else {
      flipCardsBackDown();
    }
  }
}

//Inject score and pairs results into "Results popup".
function displayScore(){
  $("#score").html(score);
  $("#correct-pairs").html(pairsCorrect);
}

//When timer reaches zero, display "results popup" & enable overlay to focus results.
function countdownComplete(unit, value, total){
	if(total<=0){
    displayScore();
    $('#popUp').fadeIn('slow');
    $('#overlay').css('display', 'block');
	}
}

//Shuffles & resets all cards without effect score and current timer.
function resetCards(){
  selectedCardsClass = [];
  selectedCardsID = [];
  canSelectCard = true;
  shuffleCards(cards);
  displayCards(cards);
  listenForCardFlip();
}

//Resets the whole game(timer, cards, scores).
function restartGame(){
  score = 0;
  pairsCorrect = 0;
  selectedCardsClass = [];
  selectedCardsID = [];
  canSelectCard = true;
  shuffleCards(cards);
  displayCards(cards);
  listenForCardFlip();
  $('.odometer').html(score);
  $('#popUp').hide();
  $("#timer").TimeCircles().restart();
  $('#overlay').css('display', 'none');
  $("#try-again").click(function(){
    restartGame();
  });
}

//Initiate first "Timer" and allow cards to be flipped .
function startTimer(){
  $("#timer").TimeCircles().start();
  listenForCardFlip();
}


//Set evrything up and start event listners.
function startGame(){
  shuffleCards(cards);
  displayCards(cards);
  $('.odometer').html(score);
  $('#popUp').hide();
  $("#timer").TimeCircles({count_past_zero: false}).addListener(countdownComplete);
  $("#timer").TimeCircles().stop();
  $('#overlay').css('display', 'none');
  $("#try-again").click(function(){
    restartGame();
  });
  $('#start-button').click(function(){
    startTimer();
  });
}

//Start the game! :D
startGame();

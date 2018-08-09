var score = 0;
var pairsCorrect = 0;
var selectedCards = [];
var faceUpCards = [];
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

//A function for to shuffle an array////////////////////////////////////////////
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

//Function that takes in an array of cards and turns it into html to be injected/
function displayCards(cardsArray){
  let html = '';
  cardsArray.forEach(function(card){
    html += '<div class="flip-container ' + card.name + '" id="' + card.name + card.instance + '">';
    html += '<div class="flipper">';
    html += '<div class="front">';
    html += '<img src="images/' + card.img + '" alt="' + card.name + '">';
    html += '</div>';
    html += '<div class="back">';
    html += '<img src="images/card-back.png" alt="Back of card">';
    html += '</div>';
    html += '</div>';
    html += '</div>';
  });
  $("#cards-container").html(html);
}

//Event Listner to turn cards when clicked.//
function listenForCardFlip(){
  $(".flip-container").click(function(){
    if (canSelectCard === false) {
      return;
    }

    $(this).toggleClass("flip");
    if (faceUpCards[0] === $(this).attr('id')) {
        selectedCards = [];
        faceUpCards =[];
        return;
    }
    selectedCards.push($(this).attr('class').split(' ')[1]);
    faceUpCards.push($(this).attr('id'));
    checkSelectedCards();
  });
}

//Function that filps the cards in the cardsUp array back down after a time out.//
function flipCardsBackDown(){
  setTimeout(function(){
    $("#" + faceUpCards[0] + "").toggleClass("flip");
    $("#" + faceUpCards[1] + "").toggleClass("flip");
    faceUpCards = [];
    selectedCards = [];
    canSelectCard = true;
  }, 750);
}

//Function that checks if both selected cards are correct or not, calls flipCardsBackDown when done.//
function checkSelectedCards(){
  if (selectedCards.length === 2) {
    canSelectCard = false;
    if (selectedCards[0] === selectedCards[1]) {
      pairsCorrect += 1;
      console.log("Pairs Correct:" + pairsCorrect);
      flipCardsBackDown();
    }
    else {
      flipCardsBackDown();
    }
  }
}

//Event Listner to turn ALL cards when clicked.//
$(".header").click(function(){
    console.log("hello!!!!");
    $(".flip-container").toggleClass("flip");
});



// shuffleCards(cards);
displayCards(cards);
listenForCardFlip();

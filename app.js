var cards = [
    { name:"c++",        img:"cpp-logo.png" },
    { name:"c++",        img:"cpp-logo.png" },
    { name:"css",        img:"css-logo.png" },
    { name:"css",        img:"css-logo.png" },
    { name:"html5",      img:"html5-logo.png" },
    { name:"html5",      img:"html5-logo.png" },
    { name:"java",       img:"java-logo.png" },
    { name:"java",       img:"java-logo.png" },
    { name:"javascript", img:"javascript-logo.jpg" },
    { name:"javascript", img:"javascript-logo.jpg" },
    { name:"mongodb",    img:"mongodb-logo.jpg" },
    { name:"mongodb",    img:"mongodb-logo.jpg" },
    { name:"node",       img:"node-logo.png" },
    { name:"node",       img:"node-logo.png" },
    { name:"php",        img:"php-logo.png" },
    { name:"php",        img:"php-logo.png" },
    { name:"python",     img:"python-logo.jpg" },
    { name:"python",     img:"python-logo.jpg" },
    { name:"ruby",      img:"ruby-logo.jpg" },
    { name:"ruby",      img:"ruby-logo.jpg" },
    { name:"ruby",      img:"ruby-logo.jpg" },
    { name:"ruby",      img:"ruby-logo.jpg" },
    { name:"ruby",      img:"ruby-logo.jpg" },
    { name:"ruby",      img:"ruby-logo.jpg" },
  ];

  function shuffle(array) {
    var i = 0 , j = 0 , temp = null;

    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

function shuffleCards(cardsArray){
  shuffle(cards);

}


function displayCards(cardsArray){
  let html = '';
  cardsArray.forEach(function(card){
    html += '<div class="flip-container">';
    html += '<div class="flipper">';
    html += '<div class="front">';
    html += '<img src="images/' + card.img + '" alt="' + card.name + '">';
    html += '</div>';
    html += '<div class="back">';
    html += 'The cat is very small and thin.';
    html += '</div>';
    html += '</div>';
    html += '</div>';
  });
  $("#cards-container").html(html);
}

displayCards(cards);








$(".flip-container").click(function(){
    $(this).toggleClass("flip");
});

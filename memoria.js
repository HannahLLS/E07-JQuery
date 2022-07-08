const cardBoard = document.querySelector("#cardboard");
let imgs = [
  "vue.svg",
  "angular.svg",
  "react.svg",
  "ember.svg",
  "php elefantinho.png",
  "aurelia.svg",
  "lua.png",
  "python.png"
];

let cardHTML = "";

imgs = randomImgs(imgs);

imgs.forEach(img => {
  cardHTML += `<div class="memory-card" data-card="${img}">
    <img class="front-face" src="img/${img}"/>
    <img class="back-face" src="img/js-badge.svg">
  </div>`;
});

cardBoard.innerHTML = cardHTML + cardHTML;

/** Fim da renderização HTML */

const cards = document.querySelectorAll(".memory-card");
let firstCard, secondCard;
let lockCards = false;

function randomImgs(imgsinOrder){

  let imgsRandom = [];

  while(imgsinOrder.length() != imgsRandom.length()){

    let index = Math.floor(Math.random() * imgsinOrder.length());

    if (imgsRandom.indexOf(imgsinOrder[index]) < 0){

      imgsRandom.push(imgsinOrder[index]);

    }

  }

  return imgsRandom;

}

function flipCard() {

     console.log(this);
     
  if (lockCards) return false;
  this.classList.add("flip");

  if (!firstCard) {
    firstCard = this;
    return false;
  }

  secondCard = this;

  checkForMatch();
}


function checkForMatch() {
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;

  !isMatch ? unFlipCards() : resetCards(isMatch);
}

function unFlipCards() {
  lockCards = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetCards();
  }, 1000);
}

function resetCards(isMatch = false) {
  if (isMatch) {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
  }

  [firstCard, secondCard, lockCards] = [null, null, false];
}

cards.forEach(card => card.addEventListener("click", flipCard));
const $cardsContainer = document.querySelectorAll(".card");
const $fragment = document.createDocumentFragment();

const cardsSelected = [];
let hasFlippedCard = false;
let card1, card2;
let lockBoard = false;

const UnflipCards = () => {
  lockBoard = true;
  console.log(`${card1.dataset.card} y ${card2.dataset.card} no son iguales`);
  setTimeout(() => {
    card1.classList.remove("flip");
    card2.classList.remove("flip");

    resetBoard();
  }, 500);
};

const disableCards = (e) => {
  card1.removeEventListener("click", flipCard);
  card2.removeEventListener("click", flipCard);
  cardsSelected.push(card1, card2);
  console.log(cardsSelected[0].dataset.card, cardsSelected[1].dataset.card);
  resetBoard();
};

const resetBoard = () => {
  [hasFlippedCard, lockBoard] = [false, false];
  [card1, card2] = [null, null];
};

const suffleCards = () => {
  $cardsContainer.forEach((el) => {
    let randomPos = Math.floor(Math.random() * 12);
    el.style.order = randomPos;
  });
};

const checkForMatch = () => {
  if (card1.dataset.card === card2.dataset.card) {
    disableCards();
  } else {
    UnflipCards();
  }
};

const flipCard = (e) => {
  if (lockBoard) return;
  if (e.currentTarget === card1) return;
  e.currentTarget.classList.add("flip");
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    card1 = e.currentTarget;
    return;
  }
  card2 = e.currentTarget;

  checkForMatch();
};
suffleCards();
$cardsContainer.forEach((element) => {
  element.addEventListener("click", (e) => {
    flipCard(e);
  });
  //element.addEventListener("click", toggleCard);
});
//https://marina-ferreira.github.io/tutorials/js/memory-game/
//Card positioning animation

const $cardsContainer = document.querySelectorAll(".card");
const $fragment = document.createDocumentFragment();
const $info = document.querySelector(".info h2");
const $resetGame = document.querySelector(".reset-game");
const $startGame = document.querySelector(".start");
const $countdown = document.querySelector(".countdown h3 span");

const cardsSelected = [];
let hasFlippedCard = false;
let card1, card2;
let lockBoard = false;

let timeEasing = 1000 * 20; // 20 segundos
let isWin = true;
let counter = timeEasing;

const UnflipCards = () => {
  lockBoard = true;
  //console.log(`${card1.dataset.card} y ${card2.dataset.card} no son iguales`);
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

const timeOut = () => {
  const intervalId = setInterval(() => {
    counter -= 1000;
    $countdown.innerHTML = `${counter / 1000}`;

    if (counter === 0) {
      clearInterval(intervalId); // Detener el intervalo

      $cardsContainer.forEach((el) => {
        el.removeEventListener("click", flipCard),
          (el.style.pointerEvents = "none");
      });

      for (let i = 0; i < $cardsContainer.length; i++) {
        console.log(
          `${$cardsContainer[i].dataset.card} no tiene la clase flip`
        );

        if (!$cardsContainer[i].classList.contains("flip")) {
          isWin = false;
          console.log(isWin);
        }
      }

      if (isWin) {
        $info.innerHTML = "Has ganado";
      } else {
        $info.innerHTML = "Se te acabo el tiempo";
        setTimeout(() => {
          location.reload();
        }, 3000);
      }

      //location.reload(); // Recargar la página solo una vez
    }
  }, 1000); // Intervalo de 1 segundo
};

//timeOut(); // Llamar a la función para iniciar el temporizador

const isShow = (e) => {};

//suffleCards();
//timeOut();

document.addEventListener("click", (e) => {
  if (e.target == $startGame) {
    suffleCards();
    $info.innerHTML = "Encuentra las parejas";
    $cardsContainer.forEach((element) => {
      element.addEventListener("click", (e) => {
        flipCard(e);
      });
      //element.addEventListener("click", toggleCard);
    });
    e.target.style.display = "none";

    timeOut();
  }
  if (e.target == $resetGame) {
    location.reload();
  }
});
//https://marina-ferreira.github.io/tutorials/js/memory-game/
//Card positioning animation

let numberOfCard = 12;
let cards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
let container = document.querySelector(".wrapper__cards");
let listOfCards = document.querySelectorAll(".card");
let listOfCardsToArray = [...listOfCards];
let trials = document.querySelector(".trials");
let congratulation = document.querySelector(".congratulation");
let time = document.querySelector(".time");
let startTime = moment().minutes();
let elapsedTime = 0;

let firstChoice = null;
let secondChoice = null;
let numberOfTrials = 0;
let tap = 1;

// Colors
let red = document.getElementById("red");
let green = document.getElementById("green");
let blue = document.getElementById("blue");

green.addEventListener("click", () => {
  listOfCards.forEach((el) => {
    el.classList.add("card__green");
  });
});

red.addEventListener("click", () => {
  listOfCards.forEach((el) => {
    el.classList.add("card__red");
  });
});

blue.addEventListener("click", () => {
  listOfCards.forEach((el) => {
    el.classList.add("card__blue");
  });
});

// Update number of trials in template HTML
const updateTrials = () => {
  trials.innerHTML = numberOfTrials;
};

// Mix the numbers
const shuffleCard = (cards) => {
  cards.sort(() => 0.5 - Math.random());
};

// Initialize the DOM elements
const initElements = () => {
  listOfCardsToArray.forEach((el, index) => {
    el.setAttribute("value", cards[index]);
    el.setAttribute("class", "card card-" + cards[index]);
    el.setAttribute("id", index);
    //el.innerHTML = cards[index];
    el.innerHTML = "?";
  });
};

// Management of the user's choice
const onChoice = (choice) => {
  if (tap === 1) {
    firstChoice = choice.value;
    listOfCardsToArray[choice.id].innerHTML = choice.value;
    tap++;
  } else if (tap === 2) {
    secondChoice = choice.value;
    listOfCardsToArray[choice.id].innerHTML = choice.value;
    numberOfTrials++;
    updateTrials();
    setTimeout(() => {
      checkResult();
    }, 500);
  }
};

// Check the result
const checkResult = () => {
  if (firstChoice === secondChoice) {
    listOfCardsToArray.forEach((el) => {
      el.getAttribute("class").includes(firstChoice)
        ? el.setAttribute("class", "exit")
        : "";
    });
    numberOfCard = numberOfCard - 2;
    tap = 1;
    if (numberOfCard == 0) {
      elapsedTime = moment().minutes() - startTime;
      time.innerHTML = elapsedTime;
      setTimeout(() => {
        congratulation.classList.add("view-congratulation");
      }, 1000);
    }
  } else {
    listOfCardsToArray.forEach((el) => {
      el.innerHTML = "?";
    });
    tap = 1;
  }
  firstChoice = null;
  secondChoice = null;
};

shuffleCard(cards);
initElements();

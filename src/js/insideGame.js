import { numbers4x4, numbers6x6, svgs4x4, svgs6x6 } from "./config.js";
const gameSettings = JSON.parse(localStorage.getItem("gameSettings"));
// All variables that track the game state
let activePlayer = 1;
let tileCounter = 0;
let movesCounter = 0;
let timer;

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  for (let curIndex = array.length - 1; curIndex > 0; curIndex--) {
    const rndIndex = Math.floor(Math.random() * (curIndex + 1));
    [array[curIndex], array[rndIndex]] = [array[rndIndex], array[curIndex]];
  }
  return array;
}

function createTileElement(parentElement) {
  const tileElement = document.createElement("div");
  tileElement.classList.add("tile");
  tileElement.dataset.state = "empty";
  parentElement.insertAdjacentElement("beforeend", tileElement);
}

function createGameGrid(gridSize) {
  // const gridElement = document.createElement("div");
  // gridElement.dataset.grid = gridSize;
  // if (gridSize === "4x4") {
  //   for (let i = 0; i <= 16; i++) createBoxElement(gridElement);
  // }
  // if (gridSize === "6x6") {
  //   for (let i = 0; i <= 36; i++) createBoxElement(gridElement);
  // }
  // document.body.insertAdjacentElement("beforeend", gridElement);
  const gridElement = document.createElement("div");
  gridElement.dataset.grid = gridSize;

  const [rows, columns] = gridSize.split("x").map(Number);
  const totalTiles = rows * columns;

  for (let i = 0; i < totalTiles; i++) createTileElement(gridElement);

  document.body.insertAdjacentElement("beforeend", gridElement);
}

function createGameDetails(numbersOfPlayers) {
  let gameDetailsElement;
  switch (numbersOfPlayers) {
    case 1:
      gameDetailsElement = `
      <div class="flex w-105 mx-auto justify-between items-center mrg-t-40">
       <div class="bg-main-3 rounded-md w-28">
         <h3 class="-mb-2 text-center text-lg text-main-2">Time</h3>
         <span class="block text-center text-2xl text-main-2" data-time
           >00:00</span
         >
       </div>
       <div class="bg-main-3 rounded-md w-28">
         <h3 class="-mb-2 text-center text-lg text-main-2">Moves</h3>
         <span class="block text-center text-2xl text-main-2" data-moves>0</span>
       </div>
      </div>
     `;
      break;
    case 2:
      gameDetailsElement = `
     <div class="flex w-1/2 mx-auto justify-between items-center mrg-t-25">
      <div
        class="w-40 p-4 bg-main-3 rounded-md relative"
        data-player="1"
        data-state="active"
      >
        <h3 class=" text-xl">Player 1</h3>
        <span class="text-3xl ">0</span>
      </div>
      <div
        class="w-40 p-4 bg-main-3 rounded-md relative"
        data-player="2"
        data-state="disabled"
      >
        <h3 class=" text-xl">Player 2</h3>
        <span class="text-3xl ">0</span>
      </div>
    </div>
     `;
      break;
    case 3:
      gameDetailsElement = `
      <div class="flex w-1/2 mx-auto justify-between items-center mrg-t-25">
       <div
         class="w-40 p-4 bg-main-3 rounded-md relative"
         data-player="1"
         data-state="active"
       >
         <h3 class=" text-xl">Player 1</h3>
         <span class="text-3xl ">0</span>
       </div>
       <div
         class="w-40 p-4 bg-main-3 rounded-md relative"
         data-player="2"
         data-state="disabled"
       >
         <h3 class=" text-xl">Player 2</h3>
         <span class="text-3xl ">0</span>
       </div>
       <div
         class="w-40 p-4 bg-main-3 rounded-md relative"
         data-player="3"
         data-state="disabled"
       >
         <h3 class=" text-xl">Player 3</h3>
         <span class="text-3xl ">0</span>
       </div>
     </div>
       `;
      break;
    case 4:
      gameDetailsElement = `
      <div class="flex w-1/2 mx-auto justify-between items-center mrg-t-25">
       <div
         class="w-40 p-4 bg-main-3 rounded-md relative"
         data-player="1"
         data-state="active"
       >
         <h3 class=" text-xl">Player 1</h3>
         <span class="text-3xl ">0</span>
       </div>
       <div
         class="w-40 p-4 bg-main-3 rounded-md relative"
         data-player="2"
         data-state="disabled"
       >
         <h3 class=" text-xl">Player 2</h3>
         <span class="text-3xl ">0</span>
       </div>
       <div
         class="w-40 p-4 bg-main-3 rounded-md relative"
         data-player="3"
         data-state="disabled"
       >
         <h3 class=" text-xl">Player 3</h3>
         <span class="text-3xl ">0</span>
       </div>
       <div
         class="w-40 p-4 bg-main-3 rounded-md relative"
         data-player="4"
         data-state="disabled"
       >
         <h3 class=" text-xl">Player 4</h3>
         <span class="text-3xl ">0</span>
       </div>
     </div>
      `;
      break;
    default:
      break;
  }
  document.body.insertAdjacentHTML("beforeend", gameDetailsElement);
}

function startEndTimer(startOrEnd) {
  let minutes = 0;
  let seconds = 0;
  if (startOrEnd === "start") {
    timer = setInterval(() => {
      seconds++;
      if (seconds === 60) {
        minutes++;
        seconds = 0;
      }
      document.querySelector("[data-time]").textContent = `${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }, 1000);
  }
  if (startOrEnd === "end") {
    clearInterval(timer);
  }
}

createGameGrid(gameSettings.gridSize);
createGameDetails(gameSettings.numOfPlayers);
if (gameSettings.numOfPlayers === 1) startEndTimer("start");

const allTiles = Array.from(document.querySelectorAll(".tile"));
const shuffledSVGs4x4Array = shuffleArray(svgs4x4);
const shuffledSVGs6x6Array = shuffleArray(svgs6x6);
const shuffledNumbers4x4Array = shuffleArray(numbers4x4);
const shuffledNumbers6x6Array = shuffleArray(numbers6x6);

function insertItemInsideTile({
  targetTile,
  targetTileIndex,
  gridSize,
  gridTheme,
}) {
  if (gridSize === "4x4" && gridTheme === "icons")
    targetTile.insertAdjacentHTML(
      "beforeend",
      shuffledSVGs4x4Array[targetTileIndex]
    );
  if (gridSize === "4x4" && gridTheme === "numbers")
    targetTile.insertAdjacentHTML(
      "beforeend",
      `<span data-item="${shuffledNumbers4x4Array[targetTileIndex]}">${shuffledNumbers4x4Array[targetTileIndex]}</span>`
    );
  if (gridSize === "6x6" && gridTheme === "icons")
    targetTile.insertAdjacentHTML(
      "beforeend",
      shuffledSVGs6x6Array[targetTileIndex]
    );
  if (gridSize === "6x6" && gridTheme === "numbers")
    targetTile.insertAdjacentHTML(
      "beforeend",
      `<span data-item="${shuffledNumbers6x6Array[targetTileIndex]}">${shuffledNumbers6x6Array[targetTileIndex]}</span>`
    );
}

function moveToNextPlayer() {
  const allPlayers = document.querySelectorAll("[data-player]");
  document.querySelector(`[data-player="${activePlayer}"]`).dataset.state =
    "disabled";
  activePlayer++;
  if (activePlayer === allPlayers.length + 1) activePlayer = 1;
  document.querySelector(`[data-player="${activePlayer}"]`).dataset.state =
    "active";
}

function sortPairs() {
  const allPairsDivs = Array.from(document.querySelectorAll("[data-pairs]"));
  allPairsDivs.sort((currentPairDiv, nextPairDiv) => {
    const currentPair = +currentPairDiv.dataset.pairs;
    const nextPair = +nextPairDiv.dataset.pairs;
    return nextPair - currentPair;
  });
  const parent = allPairsDivs[0].parentNode;
  allPairsDivs.forEach((pairDiv) => parent.appendChild(pairDiv));
}

function checkGridState() {
  const allTilesPaired = allTiles.every(
    (tile) => tile.dataset.state === "paired"
  );
  if (!allTilesPaired) return;

  let windowElement;
  if (gameSettings.numOfPlayers === 1) {
    windowElement = `
   <div
   class="bg-main-1 fixed p-20 rounded-xl top-2/4 left-2/4"
   data-window
   data-state="hidden"
 >
   <div>
     <h2 class="text-main-2 text-5xl text-center mb-1">You did it!</h2>
     <p class="text-xl text-center text-secondary-1">
       Game over! Here's how you got on...
     </p>
   </div>
   <div>
     <div
       class="flex justify-between items-center w-3/4 mx-auto mb-4 bg-main-3 rounded-md py-2 px-4"
     >
       <h3 class="text-secondary-1">Time elapsed</h3>
       <span class="text-main-2 text-xl">${
         document.querySelector("[data-time]").textContent
       }</span>
     </div>
     <div
       class="flex justify-between items-center w-3/4 mx-auto bg-main-3 rounded-md py-2 px-4"
     >
       <h3 class="text-secondary-1">Moves taken</h3>
       <span class="text-main-2 text-xl">${
         document.querySelector("[data-moves]").textContent
       } moves</span>
     </div>
   </div>
   <div class="flex">
     <button
       class="w-1/2 text-main-1 bg-secondary-2-normal text-xl rounded-2xl h-11 mr-3 hover:bg-secondary-2-hov duration-200"
       data-btn-restart
     >
       Restart
     </button>
     <button
       class="w-1/2 h-11 rounded-2xl text-xl text-main-2 bg-main-3 hover:bg-secondary-1 hover:text-main-1 duration-200"
       data-btn-new-game
     >
       Setup new game
     </button>
   </div>
 </div>
   `;
    startEndTimer("end");
  }

  let playerOneScore;
  let playerTwoScore;
  let playerThreeScore;
  let playerFourScore;

  if (gameSettings.numOfPlayers === 2) {
    playerOneScore = document.querySelector(
      `[data-player="1"] span`
    ).textContent;
    playerTwoScore = document.querySelector(
      `[data-player="2"] span`
    ).textContent;
    windowElement = `
  <div
  class="bg-main-1 fixed px-16 py-10 rounded-xl top-2/4 left-2/4"
  data-window
  data-state="hidden"
>
  <div>
    <h2 class="text-main-2 text-5xl text-center mb-2">${
      +playerOneScore > +playerTwoScore
        ? `Player 1 wins!`
        : +playerOneScore < +playerTwoScore
        ? `Player 2 wins!`
        : "It's a draw!"
    }</h2>
    <p class="text-xl text-center text-secondary-1 mb-2">
      Game over! Here are the results...
    </p>
  </div>
  <div>
    <div
      class="flex justify-between items-center mb-4 rounded-md py-3 px-6 bg-main-2 text-main-1 text-2xl"
      data-pairs="${playerOneScore}"
    >
      <p>Player 1 ${+playerOneScore > +playerTwoScore ? "(winner!)" : ""}</p>
      <span>${playerOneScore} pairs</span>
    </div>
    <div
      class="flex justify-between items-center mb-4 rounded-md py-3 px-6 bg-main-2 text-main-1 text-2xl"
      data-pairs="${playerTwoScore}"
    >
      <p>Player 2 ${+playerTwoScore > +playerOneScore ? "(winner!)" : ""}</p>
      <span>${playerTwoScore} pairs</span>
    </div>
  </div>
  <div class="flex">
    <button
      class="w-1/2 text-main-1 bg-secondary-2-normal text-xl rounded-2xl h-11 mr-3 hover:bg-secondary-2-hov duration-200"
      data-btn-restart
    >
      Restart
    </button>
    <button
      class="w-1/2 h-11 rounded-2xl text-xl text-main-2 bg-main-3 hover:bg-secondary-1 hover:text-main-1 duration-200"
      data-btn-new-game
    >
      Setup new game
    </button>
  </div>
</div>
  `;
  }
  if (gameSettings.numOfPlayers === 3) {
    playerOneScore = document.querySelector(
      `[data-player="1"] span`
    ).textContent;
    playerTwoScore = document.querySelector(
      `[data-player="2"] span`
    ).textContent;
    playerThreeScore = document.querySelector(
      `[data-player="3"] span`
    ).textContent;
    windowElement = `
    <div
    class="bg-main-1 fixed px-16 py-10 rounded-xl top-2/4 left-2/4"
    data-window
    data-state="hidden"
  >
    <div>
      <h2 class="text-main-2 text-5xl text-center mb-2">${
        +playerOneScore > +playerTwoScore && +playerOneScore > +playerThreeScore
          ? `Player 1 wins!`
          : +playerTwoScore > +playerOneScore &&
            +playerTwoScore > +playerThreeScore
          ? `Player 2 wins!`
          : +playerThreeScore > +playerOneScore &&
            +playerThreeScore > +playerTwoScore
          ? "Player 3 wins!"
          : "It's a tie!"
      }</h2>
      <p class="text-xl text-center text-secondary-1 mb-2">
        Game over! Here are the results...
      </p>
    </div>
    <div>
      <div
        class="flex justify-between items-center mb-4 rounded-md py-3 px-6 bg-main-2 text-main-1 text-2xl"
        data-pairs="${playerOneScore}"
      >
        <p>Player 1 ${
          +playerOneScore > +playerTwoScore &&
          +playerOneScore > +playerThreeScore
            ? "(winner!)"
            : ""
        }</p>
        <span>${playerOneScore} pairs</span>
      </div>
      <div
        class="flex justify-between items-center mb-4 rounded-md py-3 px-6 bg-main-2 text-main-1 text-2xl"
        data-pairs="${playerTwoScore}"
      >
        <p>Player 2 ${
          +playerTwoScore > +playerOneScore &&
          +playerTwoScore > +playerThreeScore
            ? "(winner!)"
            : ""
        }</p>
        <span>${playerTwoScore} pairs</span>
      </div>
      <div
      class="flex justify-between items-center mb-4 rounded-md py-3 px-6 bg-main-2 text-main-1 text-2xl"
      data-pairs="${playerThreeScore}"
    >
      <p>Player 3 ${
        +playerThreeScore > +playerOneScore &&
        +playerThreeScore > +playerTwoScore
          ? "(winner!)"
          : ""
      }</p>
      <span>${playerThreeScore} pairs</span>
    </div>
    </div>
    <div class="flex">
      <button
        class="w-1/2 text-main-1 bg-secondary-2-normal text-xl rounded-2xl h-11 mr-3 hover:bg-secondary-2-hov duration-200"
        data-btn-restart
      >
        Restart
      </button>
      <button
        class="w-1/2 h-11 rounded-2xl text-xl text-main-2 bg-main-3 hover:bg-secondary-1 hover:text-main-1 duration-200"
        data-btn-new-game
      >
        Setup new game
      </button>
    </div>
  </div>
    `;
  }

  if (gameSettings.numOfPlayers === 4) {
    playerOneScore = document.querySelector(
      `[data-player="1"] span`
    ).textContent;
    playerTwoScore = document.querySelector(
      `[data-player="2"] span`
    ).textContent;
    playerThreeScore = document.querySelector(
      `[data-player="3"] span`
    ).textContent;
    playerFourScore = document.querySelector(
      `[data-player="4"] span`
    ).textContent;
    windowElement = `
    <div
    class="bg-main-1 fixed px-16 py-10 rounded-xl top-2/4 left-2/4"
    data-window
    data-state="hidden"
  >
    <div>
      <h2 class="text-main-2 text-5xl text-center mb-2">${
        +playerOneScore > +playerTwoScore &&
        +playerOneScore > +playerThreeScore &&
        +playerOneScore > +playerFourScore
          ? `Player 1 wins!`
          : +playerTwoScore > +playerOneScore &&
            +playerTwoScore > +playerThreeScore &&
            +playerTwoScore > +playerFourScore
          ? `Player 2 wins!`
          : +playerThreeScore > +playerOneScore &&
            +playerThreeScore > +playerTwoScore &&
            +playerThreeScore > +playerFourScore
          ? "Player 3 wins!"
          : playerFourScore > +playerOneScore &&
            +playerFourScore > +playerTwoScore &&
            +playerFourScore > +playerThreeScore
          ? "Player 4 wins!"
          : "It's a tie!"
      }</h2>
      <p class="text-xl text-center text-secondary-1 mb-2">
        Game over! Here are the results...
      </p>
    </div>
    <div>
      <div
        class="flex justify-between items-center mb-4 rounded-md py-3 px-6 bg-main-2 text-main-1 text-2xl"
        data-pairs="${playerOneScore}"
      >
        <p>Player 1 ${
          +playerOneScore > +playerTwoScore &&
          +playerOneScore > +playerThreeScore &&
          +playerOneScore > +playerFourScore
            ? "(winner!)"
            : ""
        }</p>
        <span>${playerOneScore} pairs</span>
      </div>
      <div
        class="flex justify-between items-center mb-4 rounded-md py-3 px-6 bg-main-2 text-main-1 text-2xl"
        data-pairs="${playerTwoScore}"
      >
        <p>Player 2 ${
          +playerTwoScore > +playerOneScore &&
          +playerTwoScore > +playerThreeScore &&
          +playerTwoScore > +playerFourScore
            ? "(winner!)"
            : ""
        }</p>
        <span>${playerTwoScore} pairs</span>
      </div>
      <div
      class="flex justify-between items-center mb-4 rounded-md py-3 px-6 bg-main-2 text-main-1 text-2xl"
      data-pairs="${playerThreeScore}"
    >
      <p>Player 3 ${
        +playerThreeScore > +playerOneScore &&
        +playerThreeScore > +playerTwoScore &&
        +playerThreeScore > +playerFourScore
          ? "(winner!)"
          : ""
      }</p>
      <span>${playerThreeScore} pairs</span>
    </div>
      <div
      class="flex justify-between items-center mb-4 rounded-md py-3 px-6 bg-main-2 text-main-1 text-2xl"
      data-pairs="${playerFourScore}"
    >
      <p>Player 4 ${
        +playerFourScore > +playerOneScore &&
        +playerFourScore > +playerTwoScore &&
        +playerFourScore > +playerThreeScore
          ? "(winner!)"
          : ""
      }</p>
      <span>${playerFourScore} pairs</span>
    </div>
    </div>
    <div class="flex">
      <button
        class="w-1/2 text-main-1 bg-secondary-2-normal text-xl rounded-2xl h-11 mr-3 hover:bg-secondary-2-hov duration-200"
        data-btn-restart
      >
        Restart
      </button>
      <button
        class="w-1/2 h-11 rounded-2xl text-xl text-main-2 bg-main-3 hover:bg-secondary-1 hover:text-main-1 duration-200"
        data-btn-new-game
      >
        Setup new game
      </button>
    </div>
  </div>
    `;
  }

  document.body.insertAdjacentHTML("beforeend", windowElement);
  if (gameSettings.numOfPlayers !== 1) sortPairs();
  setTimeout(() => {
    document.querySelector("[data-window]").dataset.state = "visible";
    document.querySelector("[data-overlay]").dataset.state = "visible";
  }, 100);
}

function checkDuplicate(clickedTile) {
  const sameTile = allTiles.find(
    (tile) => tile !== clickedTile && tile.dataset.state === "filled"
  );
  if (!sameTile) return;

  const clickedTileChildren = clickedTile.querySelector("[data-item]");
  const sameTileChildren = sameTile.querySelector("[data-item]");

  if (clickedTileChildren.dataset.item !== sameTileChildren.dataset.item) {
    setTimeout(() => {
      clickedTile.dataset.state = "empty";
      sameTile.dataset.state = "empty";
      clickedTileChildren.remove();
      sameTileChildren.remove();
      tileCounter = 0;
      if (gameSettings.numOfPlayers === 1) return;
      moveToNextPlayer();
    }, 700);
  }
  if (clickedTileChildren.dataset.item === sameTileChildren.dataset.item) {
    setTimeout(() => {
      clickedTile.dataset.state = "paired";
      sameTile.dataset.state = "paired";
      tileCounter = 0;
      if (gameSettings.numOfPlayers !== 1) {
        const currentPlayerScore = document
          .querySelector(`[data-player="${activePlayer}"]`)
          .querySelector("span");
        currentPlayerScore.textContent = +currentPlayerScore.textContent + 1;
      }
      checkGridState();
    }, 400);
  }
}

function resetGame() {
  switch (gameSettings.numOfPlayers) {
    case 1:
      startEndTimer("end");
      document.querySelector("[data-time]").textContent = "00:00";
      startEndTimer("start");
      movesCounter = 0;
      document.querySelector("[data-moves]").textContent = movesCounter;
      break;
    case 2:
    case 3:
    case 4:
      const allPlayers = document.querySelectorAll("[data-player]");
      allPlayers.forEach((ply) => {
        ply.querySelector("span").textContent = 0;
        ply.dataset.state = "disabled";
      });
      activePlayer = 1;
      document.querySelector(`[data-player="${activePlayer}"]`).dataset.state =
        "active";
      break;
    default:
      break;
  }

  allTiles.forEach((tile) => {
    tile.dataset.state = "empty";
    tile.querySelector("[data-item]")?.remove();
  });

  tileCounter = 0;

  gameSettings.theme === "icons" && gameSettings.gridSize === "4x4"
    ? shuffleArray(svgs4x4)
    : gameSettings.theme === "numbers" && gameSettings.gridSize === "4x4"
    ? shuffleArray(numbers4x4)
    : gameSettings.theme === "icons" && gameSettings.gridSize === "6x6"
    ? shuffleArray(svgs6x6)
    : shuffleArray(numbers6x6);
}

allTiles.forEach((tile, index) => {
  tile.addEventListener("click", () => {
    if (tileCounter === 2) return;
    tile.dataset.state = "filled";
    insertItemInsideTile({
      targetTile: tile,
      targetTileIndex: index,
      gridSize: gameSettings.gridSize,
      gridTheme: gameSettings.theme,
    });
    checkDuplicate(tile);
    tileCounter++;
    if (gameSettings.numOfPlayers === 1) {
      movesCounter++;
      document.querySelector("[data-moves]").textContent = movesCounter;
    }
  });
});

document
  .querySelector("[data-btn-restart]")
  .addEventListener("click", resetGame);

document
  .querySelector("[data-btn-new-game]")
  .addEventListener("click", () => (window.location.href = "index.html"));

function observeMutationOnTheBody() {
  const mutationObserver = new MutationObserver((entries) => {
    // entries is an array of all different mutations that occurred
    entries.forEach((entry) => {
      if (entry.type === "childList" && entry.addedNodes.length) {
        const gameOverWindow = document.querySelector("[data-window]");
        const restartBtn = gameOverWindow?.querySelector("[data-btn-restart]");
        const newGameBtn = gameOverWindow?.querySelector("[data-btn-new-game]");
        if (restartBtn == null || newGameBtn == null) return;
        restartBtn.addEventListener("click", () => {
          resetGame();
          gameOverWindow.dataset.state = "hidden";
          document.querySelector("[data-overlay]").dataset.state = "hidden";
          setTimeout(() => {
            gameOverWindow.remove();
          }, 1000);
        });
        newGameBtn.addEventListener(
          "click",
          () => (window.location.href = "index.html")
        );
      }
    });
  });

  mutationObserver.observe(document.body, {
    // I need to tell it what I want to exactly observe on that something (body)

    // So here I told it that I need to observe the child list of the body which is a list of all the childs of the thing that I need to observe (body)
    childList: true,
    // subtree: true,
  });
}

observeMutationOnTheBody();

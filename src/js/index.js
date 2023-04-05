const gameOptionsSpots = document.querySelectorAll("[data-options]");
const startGameBtn = document.querySelector("[data-start-game-btn]");

let gameSettings = {};

function handleOptionsClick(clickedSpot) {
  const targetOptionBtn = clickedSpot.closest("[data-option]");
  if (targetOptionBtn == null) return;
  const choosenOption = targetOptionBtn.dataset.option;
  const targetOptionsSpot = targetOptionBtn.parentElement;
  targetOptionsSpot.querySelectorAll("[data-option]").forEach((optionBtn) => {
    optionBtn.dataset.state =
      optionBtn === targetOptionBtn ? "selected" : "ignored";
  });
  switch (targetOptionsSpot.dataset.options) {
    case "themes":
      gameSettings.theme = choosenOption;
      break;
    case "number-of-players":
      gameSettings.numOfPlayers = +choosenOption;
      break;
    case "grid-size":
      gameSettings.gridSize = choosenOption;
      break;
    default:
      break;
  }
  targetOptionsSpot.dataset.state = "done";
}

function checkAllOptions() {
  const allOptionsSpotsDone = Array.from(
    document.querySelectorAll("[data-options]")
  ).every((optionsSpot) => optionsSpot.dataset.state === "done");

  if (!allOptionsSpotsDone) startGameBtn.dataset.state = "disabled";
  if (allOptionsSpotsDone) {
    startGameBtn.dataset.state = "enabled";
    localStorage.setItem("gameSettings", JSON.stringify(gameSettings));
  }
}

gameOptionsSpots.forEach((gameOptionsSpot) =>
  gameOptionsSpot.addEventListener("click", ({ target }) => {
    handleOptionsClick(target);
    checkAllOptions();
  })
);

function initSettingsFromLocalStorage() {
  const gameSettingsFromLocalStorage = JSON.parse(
    localStorage.getItem("gameSettings")
  );

  if (gameSettingsFromLocalStorage == null) return;

  gameSettings = gameSettingsFromLocalStorage;

  const themeOptionSpot = document.querySelector(
    `[data-option="${gameSettings.theme}"]`
  );
  const gridSizeOptionSpot = document.querySelector(
    `[data-option="${gameSettings.gridSize}"]`
  );
  const numOfPlayersOptionSpot = document.querySelector(
    `[data-option="${gameSettings.numOfPlayers}"]`
  );

  const themeOptionSpotParent = themeOptionSpot.parentNode;
  const gridSizeOptionSpotParent = gridSizeOptionSpot.parentNode;
  const numOfPlayersOptionSpotParent = numOfPlayersOptionSpot.parentNode;

  themeOptionSpot.dataset.state = "selected";
  gridSizeOptionSpot.dataset.state = "selected";
  numOfPlayersOptionSpot.dataset.state = "selected";

  themeOptionSpotParent.dataset.state = "done";
  gridSizeOptionSpotParent.dataset.state = "done";
  numOfPlayersOptionSpotParent.dataset.state = "done";

  checkAllOptions();
}

initSettingsFromLocalStorage();

startGameBtn?.addEventListener("click", () => {
  window.location.href = "insideGame.html";
});

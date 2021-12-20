const Game = (function () {
  let gameCubeArray = [];
  let gameDiv = document.querySelector(".game-container");

  function createContainer() {
     if (gameDiv.innerHTML === '') {
       for (let i = 0; i < 9; i++) {
         let gameCube = document.createElement("div");
         gameCube.classList = "game-cube";
         gameCube.dataset.cube = i;
         gameDiv.appendChild(gameCube);
         gameCubeArray.push(gameCube);
       }
     }
  }

  function updateContainer() {
    if (!gameDiv.innerHTML === '') {
      gameDiv.innerHTML = '';
      for (i in gameCubeArray) {
        let gameCube = document.createElement("div");
        gameCube.classList = "game-cube";
        gameCube.dataset.cube = i;
        gameDiv.appendChild(gameCube);
      }
    }
  }
  return {gameCubeArray, createContainer, updateContainer};
})();

Game.createContainer();

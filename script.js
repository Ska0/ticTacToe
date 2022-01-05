const restartButton = document.querySelector(".restart-cube");
const playerObjectFactory = (name, mark) => {
   const getName = () => name;
   const getMark = () => mark;
   const scoreCard = ["", "", "", "", "", "", "", "", ""];
   let isActive = false;

  return { getName, getMark, scoreCard, isActive };
};

const startupUI = (() => {
   const startBtn = document.querySelector("#start");
   startBtn.addEventListener("click", startup);
   
   const startupModal = document.querySelector("#modal");
   
   const startupCloseBtn = document.querySelector("#close");
   startupCloseBtn.addEventListener("click", closeModal);
   
   const winModal = document.querySelector(".win-modal");
   
   restartButton.addEventListener("click", closeModal);

  const markBoxPlayerOne = document.querySelector(".choice-one");
  const markBoxPlayerTwo = document.querySelector(".choice-two");

  const player1NameInput = document.forms[0];
  const player2NameInput = document.forms[1];

  const getPlayer1NameInput = () => player1NameInput[0].value;
  const getPlayer2NameInput = () => player2NameInput[0].value;

  const marksArray = Array.from(markBoxPlayerOne.children);
  const marksArrayTwo = Array.from(markBoxPlayerTwo.children);

  const gameArea = document.querySelector(".game-container");

  let player1MarkInput = "X";

  let player2MarkInput = "O";

  marksArray.forEach((mark) => {
    mark.addEventListener("click", (e) => {
      const eventMark = e.target.dataset.mark;

      console.log(eventMark);

      eventMark === "X" ? chooseX(e) : chooseO(e);
    });
  });

  marksArrayTwo.forEach((mark) => {
    mark.addEventListener("click", (e) => {
      const eventMark = e.target.dataset.mark;

      console.log(eventMark);

      eventMark === "X" ? chooseX(e) : chooseO(e);
    });
  });

  function startup() {
    startupModal.style.display = "flex";
    marksArray[0].classList.add("select");
    marksArrayTwo[1].classList.add("select");
  }

  const chooseX = (e) => {
     if (e.target.dataset.player === '1'){
        if (!marksArray[0].classList.contains("select")) {
           marksArray[0].classList.add("select")
           marksArray[1].classList.remove("select")
           marksArrayTwo[1].classList.add("select")
           marksArrayTwo[0].classList.remove("select")
           
           player1MarkInput = "X";
           player2MarkInput = "O";
         } 
         
      } else if (e.target.dataset.player === '2') {

       if (!marksArrayTwo[0].classList.contains("select")) {
         marksArray[1].classList.add("select")
         marksArray[0].classList.remove("select")
         marksArrayTwo[0].classList.add("select")
         marksArrayTwo[1].classList.remove("select")
   
         player1MarkInput = "O";
         player2MarkInput = "X";
      }
   }
   
};
const chooseO = (e) => {
   if (e.target.dataset.player === '1'){
      if (!marksArray[1].classList.contains("select")) {
         marksArray[1].classList.add("select")
         marksArray[0].classList.remove("select")
         marksArrayTwo[0].classList.add("select")
         marksArrayTwo[1].classList.remove("select")
         
         player1MarkInput = "O";
         player2MarkInput = "X";
       } 
       
    } else if (e.target.dataset.player === '2') {
   
     if (!marksArrayTwo[1].classList.contains("select")) {
       marksArray[0].classList.add("select")
       marksArray[1].classList.remove("select")
       marksArrayTwo[1].classList.add("select")
       marksArrayTwo[0].classList.remove("select")
   
       player1MarkInput = "X";
       player2MarkInput = "O";
    }
   }
  
  };

  function closeModal() {
    startupModal.style.display = "none";
    winModal.style.display = "none";
  }
  function showWinModal() {
    const winnerNameDisplay = document.querySelector(".winner-name-display");
    winModal.style.display = "flex";
    winnerNameDisplay.textContent = `${Game.getActivePlayer().getName()} Wins!`;
  }

  const getPlayer1MarkInput = () => player1MarkInput;
  const getPlayer2MarkInput = () => player2MarkInput;

  return {
    getPlayer1NameInput,
    getPlayer2NameInput,
    getPlayer1MarkInput,
    getPlayer2MarkInput,
    showWinModal,
    startupCloseBtn,
  };
})();

const Game = (() => {
   let winner = false;
   let active;
   let cubesPlayed = ["", "", "", "", "", "", "", "", ""];
   let count = 0;
   let players = [];
   const gameArea = document.querySelector(".game-container");
   const isWinner = () => winner;
   const getCount = () => count;
  
   function setActive() {
      players.forEach((player) => {
        if (getCount() % 2 === 0) {
           player.getMark() === "X"
           ? (player.isActive = true)
           : (player.isActive = false);
         } else {
            player.getMark() === "X"
            ? (player.isActive = false)
            : (player.isActive = true);
         }
         if (player.isActive === true) return (active = player);
      });
   }
   
   let getActivePlayer = () => active;
   
   const winningArrays = [
      ["0", "1", "2"],
      ["0", "3", "6"],
      ["0", "4", "8"],
      ["1", "4", "7"],
      ["2", "5", "8"],
      ["3", "4", "5"],
      ["6", "7", "8"],
      ["2", "4", "6"],
   ];
   const startupCloseBtn = document.querySelector("#close");
   startupCloseBtn.addEventListener("click", createPlayers);

  function createPlayers() {
     let player1Name = startupUI.getPlayer1NameInput();
     let player1Mark = startupUI.getPlayer1MarkInput();
    let player2Name = startupUI.getPlayer2NameInput();
    let player2Mark = startupUI.getPlayer2MarkInput();
    const player1 = playerObjectFactory(player1Name, player1Mark);
    const player2 = playerObjectFactory(player2Name, player2Mark);
    players.push(player1);
    players.push(player2);
   }
   function checkWinner(scoreCard) {
      const winCase = winningArrays.values();
      let tally = 0;
      
      for (let i = 0; i <= 7; i++) {
         const winCaseValue = winCase.next().value;
         
         console.log(winCaseValue[0], winCaseValue[1], winCaseValue[2]);
         
         if (scoreCard.includes(winCaseValue[0])) {
            tally++;
            console.log(tally);
         }
         
         if (scoreCard.includes(winCaseValue[1])) {
            tally++;
            console.log(tally);
         }
         
         if (scoreCard.includes(winCaseValue[2])) {
            tally++;
            console.log(tally);
         }
         
         if (tally < 3) tally = 0;
         
         if (tally === 3) {
            winner = true;
            break;
         }
      }
      
      isWinner() === true ? startupUI.showWinModal() : "";
   }
   
   const markX = (cube) => {
      Board.Cubes[cube].classList.add("X");
      cubesPlayed[cube] = "Marked";
   };
   const markO = (cube) => {
      Board.Cubes[cube].classList.add("O");
      cubesPlayed[cube] = "Marked";
   };
   
   function turn() {
      count++;
      setActive();
   }
   const Board = (() => {
      restartButton.addEventListener('click', restart)
      //Events
      let Cubes = [];
      function restart() {
         location.reload()
      }

      
    startupUI.startupCloseBtn.addEventListener("click", createGameCubes);

    function createGameCubes() {
      gameArea.innerHTML = "";
      gameArea.addEventListener("click", placeMark);
      setActive();
      for (i = 0; i < 9; i++) {
        let gameCube = document.createElement("div");
        gameCube.classList.add("game-cube");
        gameCube.dataset.cube = i;
        gameArea.appendChild(gameCube);
        Cubes.push(gameCube);
      }
    }

    function placeMark(e) {
      const cubeClicked = e.target.dataset.cube;
      if (
        getActivePlayer().getMark() === "X" &&
        cubesPlayed[cubeClicked] != "Marked"
      ) {
        markX(cubeClicked);
        getActivePlayer().scoreCard.splice(cubeClicked, 1, cubeClicked);
        checkWinner(getActivePlayer().scoreCard);
        turn();
      } else if (
        getActivePlayer().getMark() === "O" &&
        cubesPlayed[cubeClicked] != "Marked"
      ) {
        markO(cubeClicked);
        getActivePlayer().scoreCard.splice(cubeClicked, 1, cubeClicked);
        checkWinner(getActivePlayer().scoreCard);
        turn();
      }
    }

    return { Cubes, restart} ;
  })();
  const getCubesPlayedArr = () => cubesPlayed;

  return {
    getCubesPlayedArr,
    getCount,
    getActivePlayer,
  };
})();

const PlayerUI = (() => {
  const gridCont = document.querySelector(".grid-container");
  const gameArea = document.querySelector(".game-container");

  const playerUI = document.createElement("div");
  const playerNameDisplay = document.createElement("div");
  const playerMarkDisplay = document.createElement("div");
  const turnDisplay = document.createElement("div");

  const closeButton = document.querySelector("#close");
  closeButton.addEventListener("click", createPlayerUI);

  restartButton.addEventListener("click", updateDisplay)

  function createPlayerUI() {
     gameArea.addEventListener("click", updateDisplay);
     
     playerNameDisplay.classList.add("player-name-display");
        playerNameDisplay.innerText = Game.getActivePlayer().getName();
     playerUI.appendChild(playerNameDisplay);
     
     playerMarkDisplay.classList.add("X");
        playerMarkDisplay.classList.add("player-mark-display");
     playerUI.appendChild(playerMarkDisplay);
     
     turnDisplay.classList.add("turn-display");
        turnDisplay.innerText = Game.getCount();
     playerUI.appendChild(turnDisplay);
     
     playerUI.classList.add("player-ui");
     gridCont.appendChild(playerUI);

  }

  function updateDisplay() {
  
    if (Game.getActivePlayer().getMark() === "X") {
      playerNameDisplay.innerText = Game.getActivePlayer().getName();
         playerMarkDisplay.classList.remove("O");
            playerMarkDisplay.classList.add("X");
               turnDisplay.innerText = Game.getCount();
    } else if (Game.getActivePlayer().getMark() === "O") {
      playerNameDisplay.innerText = Game.getActivePlayer().getName();
         playerMarkDisplay.classList.remove("X");
            playerMarkDisplay.classList.add("O");
               turnDisplay.innerText = Game.getCount();
    }
  }
})();

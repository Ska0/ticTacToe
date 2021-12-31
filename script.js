const players = (function() {
   const playerMaker = (name, mark) => {
      const getName = () => name;
      const getMark = () => mark;

      return {getName, getMark}
   }

   return {playerMaker}
})();

const game = (function() {
   let name;
   let player;
   const startupNameForm = document.forms[0]
   const startBtn = document.querySelector('#start')
   const startupModal = document.querySelector('#modal')
   const startupCloseBtn = document.querySelector('#close')
   startBtn.addEventListener('click', startup)
   startupNameForm.addEventListener('submit', (e) =>{
      e.preventDefault();

   })
   startupCloseBtn.addEventListener('click', closeStartup)
   function startup() {
      startupModal.style.display = 'flex'

   }

   function closeStartup() {
      startupModal.style.display = 'none'
      name = startupNameForm[0].value
      console.log(name)
       player = players.playerMaker(name, 'O');
   }

   function createGameBoard() {
      const gameArea = document.querySelector('.game-container')
      for (i = 0; i < 9; i++) {
         let gameCube = document.createElement('div');
         gameCube.classList.add('game-cube');
         gameCube.dataset.cube = i;
         gameArea.appendChild(gameCube)

      }
   }

   return {player}

})();


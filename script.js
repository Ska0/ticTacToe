const gameBoard = (function() {
   //create divs, and store them in an array
   const gameCubeArray = [];

   return {gameCubeArray}
})()


const game = (function() {
//Game Logic, turn function, startup, playerUI, GameBoard Factory,
    
})();

const players = (function() {
   //Player Factory, Player Objects[name, mark, getNameFunction, getMarkFunction, scoreCardArray]
   const playerMaker = (name, mark) => {
      let scoreCardArray = ['','','','','','','','','']
      const getName = () => name;
      const getMark = () => mark;

         return {scoreCardArray, getName, getMark}
   }  

   const Computer = playerMaker('Computer', 'X')

      return {Computer}
})();






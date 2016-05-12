var x = " X ";
var o  = " O ";
var blank = "[ ]";
// var Board = require('./board');

function Game (){
  this.lastMove = {player : null, position : null};
  this.currentPlayer = null;
  this.status = "inActive";
  this.board = new Board();
  //this.startButton = document.getElementById('start-button');
  this.showStartButton = true;
  this.message = false;
}

Game.prototype.start = function(){
  this.showStartButton = false;
  // this.startButton.style.display = "none";
  this.currentPlayer = o;
  this.status = "active";
  this.message = false;
  // this.clearMessage();
  this.board = new Board();
  // this.updateBoard(); 
}

Game.prototype.message = function(message){
  console.log(message);
  document.getElementById('message').style.display = "block";
  document.getElementById('message').innerHTML = message;
  document.getElementById('board-container').style.opacity = .15;
}

Game.prototype.clearMessage = function(){
  document.getElementById('message').style.display = "none";
  document.getElementById('message').innerHTML = "";
  document.getElementById('board-container').style.opacity = 1.0;
}

Game.prototype.availablePositions = function(){
  var availablePositions = [];
  var board = this.board;
  for (position in board.positions){
    if(board.positions[position].marker == blank){availablePositions.push(position)}
  };
  return availablePositions;

}

Game.prototype.checkForWinner = function(){
  var winner = false;
  var board = this.board;

  var check = function(marker){
    var mkr = marker;
    for (position in board.positions){
      var objCount = {}; 
      for (direction in board.positions[position].neighbors){
        objCount[direction] = {};
        objCount[direction].same = 0;
        objCount[direction].blank = 0;

      }

      if(board.positions[position].marker == mkr){
            //check for neighbors
        var checkNeighbors = function(position, direction){
          if(board.positions[position].neighbors[direction]){
            // console.log(board.positions[board.positions[position].neighbors[direction]])
            if(board.positions[board.positions[position].neighbors[direction]].marker == mkr){
              objCount[direction].same++;
              checkNeighbors(board.positions[position].neighbors[direction], direction);
            }
            if(board.positions[board.positions[position].neighbors[direction]].marker == mkr){
              objCount[direction].blank++;
              checkNeighbors(board.positions[position].neighbors[direction], direction);
            }
          }
        }
        for(direction in objCount){
          checkNeighbors(position, direction);
        }

        if(objCount.left.same + objCount.right.same == 2){
          winner = mkr;
        }
        if(objCount.upLeft.same + objCount.downRight.same == 2){
          winner = mkr;
        }
        if(objCount.downLeft.same + objCount.upRight.same == 2){
          winner = mkr;
        }
        if(objCount.up.same + objCount.down.same == 2){
          winner = mkr;
        }
      } 
    }
  }
  check(x);
  check(o);
  return winner;
}

Game.prototype.moveIsValid = function(player, position){
  return this.status == "inActive" || this.availablePositions(this.board).indexOf(position) == -1  || this.currentPlayer != player ? false : true;
}
Game.prototype.setMove = function(player, position){
  if(this.moveIsValid(player, position)){
    this.board.positions[position].marker = player;
    this.lastMove = {player : player, position : position};
  }
  this.updateGame();
}

// Game.prototype.updateBoard = function(){
//   for(position in this.board.positions){
//     var element = document.getElementById(position);
//     if(this.board.positions[position].marker !== blank){
//       element.innerHTML = this.board.positions[position].marker;
//     }
//     else{
//       element.innerHTML = "";
//     }
//   }
// }

Game.prototype.updateGame = function(){
  // this.updateBoard()
  if(this.checkForWinner()){
    var winner = this.checkForWinner();
    // this.message("Winner is " + winner + "!!");
    this.status = "inActive";
    // this.startButton.style.display = "inline-block";
    this.showStartButton = true;
    this.message = "Winner is " + winner + "!!";
  }
  else if(this.availablePositions(this.board).length == 0){
    // this.message("Tie.");
    this.status = "inActive";
    // this.startButton.style.display = "inline-block";
    this.showStartButton = true;
    this.message = "Tie.";
  }
  else{
    this.nextPlayerGo();
  }
}

Game.prototype.nextPlayerGo = function(){
  this.lastMove.player == o ? this.currentPlayer = x : this.currentPlayer = o;
}

// module.exports = Game;
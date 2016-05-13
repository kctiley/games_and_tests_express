if(typeof require !== 'undefined'){
  var requiredObjBoard = require('./board');
  var Board = requiredObjBoard.board;
  var requiredObjComputer = require('./computer');
  var Computer = requiredObjComputer.computer;
  var requiredObjMarkers = require('./markers');
  var markers = requiredObjMarkers.markers;
  var computerMarker = markers.computerMarker;
  var userMarker  = markers.userMarker;
  var blank = markers.blank;
}
else{
  var computerMarker = markers.computerMarker;
  var userMarker  = markers.userMarker;
  var blank = markers.blank;
}

function Game (){
  this.lastMove = {player : null, position : null};
  this.currentPlayer = null;
  this.status = "inActive";
  this.board = new Board();
  this.showStartButton = true;
  this.message = false;
}

Game.prototype.start = function(){
  this.showStartButton = false;
  this.currentPlayer = userMarker;
  this.status = "active";
  this.message = false;
  this.board = new Board();
}

Game.prototype.availablePositions = function(){
  var availablePositions = [];
  var board = this.board;
  for (position in board.positions){
    if(board.positions[position].marker == blank){availablePositions.push(position)}
  };
  return availablePositions;

}

Game.prototype.winner = function(){
  var winner = false;
  var board = this.board;

  var checkForWin = function(playerMarker){
    var mkr = playerMarker;
    for (position in board.positions){
      var neighborCount = {}; 
      var currentPosition = board.positions[position];
      for (direction in currentPosition.neighbors){
        neighborCount[direction] = {};
        neighborCount[direction].same = 0;
        neighborCount[direction].blank = 0;
      }
      if(currentPosition.marker == mkr){
        var countSame = function(pstn){
          var neighborPosition = board.positions[pstn]
          if(neighborPosition.neighbors[direction]){
            if(board.positions[neighborPosition.neighbors[direction]].marker == mkr){
              neighborCount[direction].same++;
              countSame(neighborPosition.neighbors[direction], direction);
            }
          }
        }
        for(direction in neighborCount){
          countSame(position);
        }
        if(neighborCount.left.same + neighborCount.right.same == 2 || neighborCount.upLeft.same + neighborCount.downRight.same == 2 || neighborCount.downLeft.same + neighborCount.upRight.same == 2 || neighborCount.up.same + neighborCount.down.same == 2){
          winner = mkr;
        }
      } 
    }
  }
  checkForWin(computerMarker);
  checkForWin(userMarker);
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

Game.prototype.updateGame = function(){
  if(this.winner()){
    var winner = this.winner();
    this.status = "inActive";
    this.showStartButton = true;
    this.message = "Winner is " + winner + "!!";
  }
  else if(this.availablePositions(this.board).length == 0){
    this.status = "inActive";
    this.showStartButton = true;
    this.message = "Tie.";
  }
  else{
    this.nextPlayerGo();
  }
}

Game.prototype.nextPlayerGo = function(){
  this.lastMove.player == userMarker ? this.currentPlayer = computerMarker : this.currentPlayer = userMarker;
}

if(typeof exports !== 'undefined'){ exports['game'] = Game}
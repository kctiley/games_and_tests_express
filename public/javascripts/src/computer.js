if(typeof require !== 'undefined'){
  var requiredObjBoard = require('./board');
  var Board = requiredObjBoard.board;
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

function Computer (){
  this.selection = null;
}

Computer.prototype.findAvailable = function(board, positionsToCheck){
  var board = board;
  var positionsToCheck = positionsToCheck;
  var availablePositions = [];
  positionsToCheck.forEach(function(position){
    if(board.positions[position].marker == blank){availablePositions.push(position)}
  })
  return availablePositions;
}

Computer.prototype.markerCount = function(board, position, marker, direction){
  var result = 0;
  var checkNeighbor = function(pstn){
    if(board.positions[pstn].neighbors[direction]){
      var neighborPosition = board.positions[pstn].neighbors[direction];
      if(board.positions[neighborPosition].marker == marker){
        result++;
      }
      checkNeighbor(neighborPosition)
    }
  }
  checkNeighbor(position);
  return result;
}

Computer.prototype.winMoves = function(board, playerMarker){
  var result = [];
  for (position in board.positions){
    if(board.positions[position].marker == blank){
      if(this.markerCount(board, position, playerMarker, 'left') + this.markerCount(board, position, playerMarker, 'right') == 2){
        result.push(position);
      }
      if(this.markerCount(board, position, playerMarker, 'up') + this.markerCount(board, position, playerMarker, 'down') == 2){
        result.push(position);
      }
      if(this.markerCount(board, position, playerMarker, 'upLeft') + this.markerCount(board, position, playerMarker, 'downRight') == 2){
        result.push(position);;
      }
      if(this.markerCount(board, position, playerMarker, 'upRight') + this.markerCount(board, position, playerMarker, 'downLeft') == 2){
        result.push(position);;
      }
    }
  }
  return result;
}

Computer.prototype.computerWinMoves = function(board){
  return this.winMoves(board, computerMarker);
}

Computer.prototype.userWinMoves = function(board){
  return this.winMoves(board, userMarker);
}

Computer.prototype.computerForkMoves = function(board){
  var moves = this.twoInRowMoves(board, computerMarker)
  var result = [];
  var movesCount = {};
  for (position in moves){
    movesCount[moves[position]] == undefined? movesCount[moves[position]] = 1  : movesCount[moves[position]]++;
  }
  for (position in movesCount){
    if(movesCount[position] > 1){result.push(position)} 
  }
  return result;
}

Computer.prototype.userForkMoves = function(board){
  var moves = this.twoInRowMoves(board, userMarker)
  var result = [];
  var movesCount = {};
  for (position in moves){
    movesCount[moves[position]] == undefined? movesCount[moves[position]] = 1  : movesCount[moves[position]]++;
  }
  for (position in movesCount){
    if(movesCount[position] > 1){result.push(position)} 
  }
  return result;
}

Computer.prototype.twoInRowMoves = function(board, playerMarker){
  var result = [];
  for (position in board.positions){
    if(board.positions[position].marker == blank){
      if(this.markerCount(board, position, playerMarker, 'left') + this.markerCount(board, position, playerMarker, 'right') == 1 && this.markerCount(board, position, blank, 'left') + this.markerCount(board, position, blank, 'right') == 1 ){
        result.push(position);
      }
      if(this.markerCount(board, position, playerMarker, 'up') + this.markerCount(board, position, playerMarker, 'down') == 1 && this.markerCount(board, position, blank, 'up') + this.markerCount(board, position, blank, 'down') == 1 ){
        result.push(position);
      }
      if(this.markerCount(board, position, playerMarker, 'upLeft') + this.markerCount(board, position, playerMarker, 'downRight') == 1 && this.markerCount(board, position, blank, 'upLeft') + this.markerCount(board, position, blank, 'downRight') == 1 ){
        result.push(position);
      }
      if(this.markerCount(board, position, playerMarker, 'upRight') + this.markerCount(board, position, playerMarker, 'downLeft') == 1 && this.markerCount(board, position, blank, 'upRight') + this.markerCount(board, position, blank, 'downLeft') == 1 ){
        result.push(position);
      }      
    }
  }

  return result;
}

Computer.prototype.centerMove = function(board){
  return this.findAvailable(board, ['center']);
}



Computer.prototype.oppositeCorner = function(board){
  var result = [];
  var availablePositions = [];
  for (position in board.positions){
    if(board.positions[position].marker == blank){
      availablePositions.push(position);
    }
  }
  if(availablePositions.length == 7 && board.positions.center.marker == userMarker){
    if(board.positions.topLeft.marker == computerMarker){ result.push('bottomRight')}
    if(board.positions.topRight.marker == computerMarker){ result.push('bottomLeft')}
    if(board.positions.bottomRight.marker == computerMarker){ result.push('topLeft')}
    if(board.positions.bottomLeft.marker == computerMarker){ result.push('topRight')}
  }

  return result;
}



Computer.prototype.cornerMoves = function(board){
  var cornerPositions = ['topLeft', 'topRight', 'bottomRight', 'bottomLeft'];
  return this.findAvailable(board, cornerPositions);
}

Computer.prototype.availableSides = function(board){
  var sidePositions = ['topCenter', 'middleRight', 'bottomCenter', 'middleLeft'];
  return this.findAvailable(board, sidePositions);
}

Computer.prototype.doesNotForceFork = function(filterPositions, board){
  var computer1 = this;
  var result = [];
  var board = board;
  filterPositions.forEach(function(filterPosition){
    var tempBoard = new Board(board.positions);
    tempBoard.setMarker(filterPosition, computerMarker);
    var winMoves = computer1.computerWinMoves(tempBoard);
    var userForkMoves = computer1.userForkMoves(tempBoard);
    if(winMoves.length > 0){ 
      winMoves.forEach(function(winMovePosition){
        if(userForkMoves.indexOf(winMovePosition) == -1){
          result.push(filterPosition);
        }
      })
    }else{
      result.push(filterPosition);
    }

  })
  return result;
}

Computer.prototype.selectMove = function(board){
  var result;
  if(this.computerWinMoves(board).length > 0){
    result = this.computerWinMoves(board)[0];
  }
  else if(this.userWinMoves(board).length > 0){
    result = this.userWinMoves(board)[0];
  }
  else if(this.doesNotForceFork(this.twoInRowMoves(board), board).length > 0){
    result = this.doesNotForceFork(this.availableTwoInRowMoves(board), board)[0];
  }
  else if(this.doesNotForceFork(this.userForkMoves(board), board).length > 0){
    result = this.doesNotForceFork(this.userForkMoves(board), board)[0];
  }
  else if(this.centerMove(board).length > 0){
    result = this.centerMove(board)[0];
  }
  else if(this.doesNotForceFork(this.cornerMoves(board), board).length > 0){
    result = this.doesNotForceFork(this.cornerMoves(board), board)[0];
  }
  else if(this.doesNotForceFork(this.availableSides(board), board).length > 0){result = this.doesNotForceFork(this.availableSides(board), board)[0];
  }
  else {console.log("not coded")}
  return result;
}

if(typeof exports !== 'undefined'){ exports['computer'] = Computer}
var x = " X ";
var o  = " O ";
var blank = "[ ]";
// var Board = require('./board');


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



Computer.prototype.neighborDirectionData = function(board, playerMarker){
  var checkDirection = function(position, direction){
    var directionCounts = {};
    directionCounts[direction] = {same : 0, blank : 0};
    var homePosition = position;
    var checkNeighbor = function(pstn, direction){
      if(board.positions[pstn].neighbors[direction]){
        var neighborPosition = board.positions[pstn].neighbors[direction];
        if(board.positions[neighborPosition].marker == playerMarker){
          directionCounts[direction].same++;
        }
        if(board.positions[neighborPosition].marker == blank){
          directionCounts[direction].blank++;
        }
        checkNeighbor(neighborPosition, direction)
      }
    }
    checkNeighbor(homePosition, direction);
    return (directionCounts)
  }
  var data = {};
  for (position in board.positions){
    if(board.positions[position].marker == blank){
      data[position] = {};
      for (direction in board.positions[position].neighbors){
        data[position][direction] = checkDirection(position, direction)[direction]
      }
    }
  }
  return data;
}

Computer.prototype.computerWinMoves = function(board){
  var result = [];
  var availablePositions = this.neighborDirectionData(board, x);
  for (position in availablePositions){
    var pstn = availablePositions[position]
    if(pstn){
      if(pstn.left.same + pstn.right.same == 2){
        result.push(position)
      }
      if(pstn.up.same + pstn.down.same == 2){
        result.push(position)
      }
      if(pstn.upLeft.same + pstn.downRight.same == 2){
        result.push(position)
      }
      if(pstn.upRight.same + pstn.downLeft.same == 2){
        result.push(position)
      }
    }
  }
  return result;
}

Computer.prototype.userWinMoves = function(board){
  var result = [];
  var availablePositions = this.neighborDirectionData(board, o);
  for (position in availablePositions){
    var pstn = availablePositions[position]
    if(pstn){
      if(pstn.left.same + pstn.right.same == 2){
        result.push(position)
      }
      if(pstn.up.same + pstn.down.same == 2){
        result.push(position)
      }
      if(pstn.upLeft.same + pstn.downRight.same == 2){
        result.push(position)
      }
      if(pstn.upRight.same + pstn.downLeft.same == 2){
        result.push(position)
      }
    }
  }
  return result;
}

Computer.prototype.computerForkMoves = function(board){
  var moves = this.availableTwoInRowMoves(board, x)
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
  var moves = this.availableTwoInRowMoves(board, o)
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

Computer.prototype.availableTwoInRowMoves = function(board, playerMarker){
  var result = [];
  var neighborsData = this. neighborDirectionData(board, playerMarker);
  for(position in neighborsData){
    var pstn = neighborsData[position];
    if(pstn.left.same + pstn.right.same == 1 && pstn.left.blank + pstn.right.blank == 1){
      result.push(position)
    }
    if(pstn.up.same + pstn.down.same == 1 && pstn.up.blank + pstn.down.blank == 1){
      result.push(position)
    }
    if(pstn.upLeft.same + pstn.downRight.same == 1 && pstn.upLeft.blank + pstn.downRight.blank == 1){
      result.push(position)
    }
  }
  return result;
}

Computer.prototype.availableCenter = function(board){
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
  if(availablePositions.length == 7 && board.positions.center.marker == o){
    if(board.positions.topLeft.marker == x){ result.push('bottomRight')}
    if(board.positions.topRight.marker == x){ result.push('bottomLeft')}
    if(board.positions.bottomRight.marker == x){ result.push('topLeft')}
    if(board.positions.bottomLeft.marker == x){ result.push('topRight')}
  }

  return result;
}



Computer.prototype.availableCorners = function(board){
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
    tempBoard.setMarker(filterPosition, x);
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
  console.log("in selectMove")
  var result;
  if(this.computerWinMoves(board).length > 0){
    result = this.computerWinMoves(board)[0];
  }
  else if(this.userWinMoves(board).length > 0){
    result = this.userWinMoves(board)[0];
  }
  else if(this.doesNotForceFork(this.availableTwoInRowMoves(board), board).length > 0){
    result = this.doesNotForceFork(this.availableTwoInRowMoves(board), board)[0];
  }
  else if(this.doesNotForceFork(this.userForkMoves(board), board).length > 0){
    result = this.doesNotForceFork(this.userForkMoves(board), board)[0];
  }
  else if(this.availableCenter(board).length > 0){
    result = this.availableCenter(board)[0];
  }
  else if(this.doesNotForceFork(this.availableCorners(board), board).length > 0){
    result = this.doesNotForceFork(this.availableCorners(board), board)[0];
  }
  else if(this.doesNotForceFork(this.availableSides(board), board).length > 0){result = this.doesNotForceFork(this.availableSides(board), board)[0];
  }
  else {console.log("not coded")}
    console.log(result)
  return result;
}



// module.exports = Computer;
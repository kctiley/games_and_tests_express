var x = " X ";
var o  = " O ";
var blank = "[ ]";

// var Board = require('./board');
// var Game = require('./game');
// var Computer = require('./computer');

var game = new Game();
var computerPlayer = new Computer();
var startButton = document.getElementById('start-button');
var messageWindow = document.getElementById('message');
var boardDisplay = document.getElementById('board-container');
var updateStartButtonDisplay = function(){
  game.showStartButton? startButton.style.display = "inline-block" : startButton.style.display = "none";
}
var updateMarkers = function(){
  for(position in game.board.positions){
    var element = document.getElementById(position);
    if(game.board.positions[position].marker !== blank){
      element.innerHTML = game.board.positions[position].marker;
    }
    else{
      element.innerHTML = "";
    }
  }
}
var updateMessage = function(){
  if(game.message){
    messageWindow.style.display = "block";
    messageWindow.innerHTML = game.message;
    boardDisplay.style.opacity = .15;
  }
  else{
    messageWindow.style.display = "none";
    boardDisplay.style.opacity = 1;
  } 
}

setInterval(function(){ 
  updateMarkers();
  updateStartButtonDisplay();
  updateMessage();

}, 100);

setInterval(function(){ 
  if(game.status != "inActive" && game.currentPlayer == x){
  game.setMove(x, computerPlayer.selectMove(game.board))};
}, 1000);

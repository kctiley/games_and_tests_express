var computerMarker = " X ";
var userMarker  = " O ";
var blank = "[ ]";

var requiredObjBoard = require('../src/board');
var Board = requiredObjBoard.board;
var requiredObjComputer = require('../src/computer');
var Computer = requiredObjComputer.computer;
var requiredObjGame = require('../src/game');
var Game = requiredObjGame.game;

  describe('Game', function () {
    
    describe('constructor', function () {
      var game; 
      beforeEach(function(){
        game = new Game();
      })
      
      it('should initially have null for last move data', function () {
        expect(game.lastMove).toEqual({player : null, position : null});
      });

    });

    describe('methods', function () {

      var game; 
      // var board; 
      beforeEach(function(){
        game = new Game();
        // board = new Board();
      })
      
      it('should have all board positions listed as available when a new game is created with no existing positions as arguments', function () {
        var allPositions = [];
        for (position in game.board.positions){
          allPositions.push(position);
        }
        expect(game.availablePositions()).toEqual(allPositions);
      });

      it('should have all board positions listed as available when a new game is created with no existing positions as arguments', function () {
        var allPositions = [];
        for (position in game.board.positions){
          allPositions.push(position);
        }
        expect(game.availablePositions()).toEqual(allPositions);
      });

      it('should check for a win for computerMarker', function () {
        var allPositions = [];
        game.board.positions.topLeft.marker = computerMarker;
        game.board.positions.center.marker = computerMarker;
        game.board.positions.bottomRight.marker = computerMarker;

        expect(game.checkForWinner()).toEqual(computerMarker);
      });

      it('should check for a win for userMarker', function () {
        var allPositions = [];
        game.board.positions.topCenter.marker = userMarker;
        game.board.positions.center.marker = userMarker;
        game.board.positions.bottomCenter.marker = userMarker;

        expect(game.checkForWinner(game.board)).toEqual(userMarker);
      });

      it('should set last move data', function () {
        game.start();
        game.setMove(userMarker, "topLeft");
        game.setMove(computerMarker, "center");

        expect(game.lastMove).toEqual({player : computerMarker, position : "center"});
      });

      it('should set current player to userMarker if last player was computerMarker', function () {
        game.start();
        game.setMove(computerMarker, "center");

        expect(game.currentPlayer).toEqual(userMarker);
      })
      
      it('should set current player to computerMarker if last player was userMarker', function () {
        game.start();
        game.setMove(userMarker, "bottomCenter");

        expect(game.currentPlayer).toEqual(computerMarker);
      })

      it('should determine if move is valid', function () {
        game.start();
        game.setMove(userMarker, "bottomCenter");

        expect(game.moveIsValid(userMarker,'bottomCenter')).toEqual(false);
      })

      it('should determine if move is valid', function () {
        game.start();
        game.setMove(userMarker, "bottomCenter");

        expect(game.moveIsValid(computerMarker, 'center')).toEqual(true);
      })

      it('should not proceed to next player if move selected was not valid', function () {
        game.start();

        game.setMove(userMarker, 'middleRight');
        game.setMove(computerMarker,"bottomCenter");
        game.setMove(userMarker, "bottomCenter");

        expect(game.currentPlayer).toEqual(userMarker);
      })


    });

  });
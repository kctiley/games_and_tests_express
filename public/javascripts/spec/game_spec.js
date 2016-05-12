var Game = require('../src/game');
var Board = require('../src/board');
// var User = require('../src/user');
// var Computer = require('../src/computer');
var x = " X ";
var o  = " O ";
var blank = "[ ]";

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

      it('should check for a win for x', function () {
        var allPositions = [];
        game.board.positions.topLeft.marker = x;
        game.board.positions.center.marker = x;
        game.board.positions.bottomRight.marker = x;

        expect(game.checkForWinner()).toEqual(x);
      });

      it('should check for a win for o', function () {
        var allPositions = [];
        game.board.positions.topCenter.marker = o;
        game.board.positions.center.marker = o;
        game.board.positions.bottomCenter.marker = o;

        expect(game.checkForWinner(game.board)).toEqual(o);
      });

      it('should set last move data', function () {
        game.setMove(o, "topLeft");
        game.setMove(x, "center");

        expect(game.lastMove).toEqual({player : x, position : "center"});
      });

      it('should set current player to o if last player was x', function () {
        game.setMove(x, "center");
        // spyOn(game, 'promptUser');

        // expect(game.promptUser).toHaveBeenCalled();
        expect(game.currentPlayer).toEqual(o);
      })
      
      it('should set current player to x if last player was o', function () {
        game.setMove(o, "bottomCenter");

        expect(game.currentPlayer).toEqual(x);
      })

      it('should determine if move is valid', function () {
        game.setMove(o, "bottomCenter");

        expect(game.moveIsValid(o,'bottomCenter')).toEqual(false);
      })

      it('should determine if move is valid', function () {
        game.setMove(o, "bottomCenter");

        expect(game.moveIsValid(x, 'center')).toEqual(true);
      })

      it('should not proceed to next player if move selected was not valid', function () {
        game.setMove(o, 'middleRight');
        game.setMove(x,"bottomCenter");
        game.setMove(o, "bottomCenter");

        expect(game.currentPlayer).toEqual(o);
      })


    });

  });
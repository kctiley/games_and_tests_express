var x = " X ";
var o  = " O ";
var blank = "[ ]";

var Computer = require('../src/computer');
var Board = require('../src/board');

describe('Computer', function () {
  var computer;
  beforeEach(function(){
    computer = new Computer();
  })
    
  describe('methods', function () {
    describe('finds available side moves', function () {
      it('all sides are available initially', function () {
        var board = new Board();
        computer.selectMove(board);
        expect(computer.availableSides(board)).toEqual(['topCenter', 'middleRight', 'bottomCenter', 'middleLeft']);
      });

      it('determines only available side moves', function () {
        var board = new Board();
        computer.selectMove(board);
        board.setMarker('topCenter', x);
        expect(computer.availableSides(board)).toEqual(['middleRight', 'bottomCenter', 'middleLeft']);
      });

    });

    describe('finds available corner move', function () {
      it('all corners are available initially', function () {
        var board = new Board();
        computer.selectMove(board);
        expect(computer.availableCorners(board)).toEqual(['topLeft', 'topRight', 'bottomRight', 'bottomLeft']);
      });

      it('finds only available corner moves', function () {
        var board = new Board();
        computer.selectMove(board);
        board.setMarker('topLeft', x);
        expect(computer.availableCorners(board)).toEqual(['topRight', 'bottomRight', 'bottomLeft']);
      });

    });

    describe('finds available center move', function () {
      it('center available initially', function () {
        var board = new Board();
        computer.selectMove(board);
        expect(computer.availableCenter(board)).toEqual(['center']);
      });

      it('finds only available center move', function () {
        var board = new Board();
        computer.selectMove(board);
        board.setMarker('center', x);
        expect(computer.availableCenter(board)).toEqual([]);
      });

    });

    describe('finds available moves that make two in a row', function () {
      it('initially has no moves that make two in a row', function () {
        var board = new Board();
        expect(computer.availableTwoInRowMoves(board, x)).toEqual([]);
      });

      it('finds horizontal moves that make two in a row', function () {
        var board = new Board();
        board.setMarker('middleLeft', x);
        expect(computer.availableTwoInRowMoves(board, x)).toContain('middleRight');
      });

      it('finds horizontal moves that make two in a row', function () {
        var board = new Board();
        board.setMarker('topLeft', x);
        expect(computer.availableTwoInRowMoves(board, x)).toContain('topRight');
        expect(computer.availableTwoInRowMoves(board, x)).toContain('topCenter');
      });

      it('finds vertical moves that make two in a row', function () {
        var board = new Board();
        board.setMarker('topLeft', x);
        expect(computer.availableTwoInRowMoves(board, x)).toContain('middleLeft');
        expect(computer.availableTwoInRowMoves(board, x)).toContain('bottomLeft');
      });

      it('finds diagonal moves that make two in a row', function () {
        var board = new Board();
        board.setMarker('topLeft', x);
        expect(computer.availableTwoInRowMoves(board, x)).toContain('center');
        expect(computer.availableTwoInRowMoves(board, x)).toContain('bottomLeft');
      });
      
    });

    describe('finds available moves that block user forks', function () {

      it('finds moves that block a fork', function () {
        var board = new Board();
        board.setMarker('topLeft', o);
        board.setMarker('bottomRight', o);

        expect(computer.userForkMoves(board)).toContain('bottomLeft');
        expect(computer.userForkMoves(board)).toContain('topRight');
      });

      it('finds moves that block user fork', function () {
        var board = new Board();
        board.setMarker('topCenter', o);
        board.setMarker('bottomRight', o);

        expect(computer.userForkMoves(board)).toContain('bottomCenter');
        expect(computer.userForkMoves(board)).toContain('topRight');
        expect(computer.userForkMoves(board)).toContain('topLeft');
        expect(computer.userForkMoves(board)).toContain('center');
      });

    });

    describe('finds available moves that create computer fork', function () {

      it('finds available moves that create computer fork', function () {
        var board = new Board();
        board.setMarker('topLeft', x);
        board.setMarker('bottomRight', x);

        expect(computer.computerForkMoves(board)).toContain('bottomLeft');
        expect(computer.computerForkMoves(board)).toContain('topRight');
      });

      it('finds available moves that create computer fork', function () {
        var board = new Board();
        board.setMarker('bottomLeft', x);
        board.setMarker('topRight', x);

        expect(computer.computerForkMoves(board)).toContain('bottomRight');
        expect(computer.computerForkMoves(board)).toContain('topLeft');
      });

      it('finds available moves that create computer fork', function () {
        var board = new Board();
        board.setMarker('topCenter', x);
        board.setMarker('bottomRight', x);

        expect(computer.computerForkMoves(board)).toContain('bottomCenter');
        expect(computer.computerForkMoves(board)).toContain('topRight');
        expect(computer.computerForkMoves(board)).toContain('topLeft');
        expect(computer.computerForkMoves(board)).toContain('center');
      });

    });

    describe('finds available moves that block user win moves', function () {

        it('finds user win moves in middle of diagonal', function () {
          var board = new Board();
          board.setMarker('topLeft', o);
          board.setMarker('bottomRight', o);

          expect(computer.userWinMoves(board)).toContain('center');
        });

      it('finds user win moves middle of horizontal', function () {
        var board = new Board();
        board.setMarker('middleLeft', o);
        board.setMarker('middleRight', o);

        expect(computer.userWinMoves(board)).toContain('center');
      });

      it('finds user win moves left side of horizontal', function () {
        var board = new Board();
        board.setMarker('center', o);
        board.setMarker('middleRight', o);

        expect(computer.userWinMoves(board)).toContain('middleLeft');
      });

    });

    describe('finds available computer win moves', function () {

      it('finds computer win moves in middle of diagonal row', function () {
        var board = new Board();
        board.setMarker('topLeft', x);
        board.setMarker('bottomRight', x);

        expect(computer.computerWinMoves(board)).toContain('center');
      });

      it('finds computer win moves middle of horizontal row', function () {
        var board = new Board();
        board.setMarker('middleLeft', x);
        board.setMarker('middleRight', x);

        expect(computer.computerWinMoves(board)).toContain('center');
      });

      it('finds computer win moves left side of horizontal row', function () {
        var board = new Board();
        board.setMarker('center', x);
        board.setMarker('middleRight', x);

        expect(computer.computerWinMoves(board)).toContain('middleLeft');
      });

      it('finds computer win moves top of vertical row', function () {
        var board = new Board();
        board.setMarker('center', x);
        board.setMarker('bottomCenter', x);

        expect(computer.computerWinMoves(board)).toContain('topCenter');
      });

    });


    describe('filters out moves that would force a user fork move', function () {

      it('finds corner moves and filters out moves that force user fork move', function () {
        var board = new Board();
        board.setMarker('center', x);
        board.setMarker('bottomCenter', o);
        board.setMarker('topRight', o);

        expect(computer.doesNotForceFork(computer.availableCorners(board), board)).toContain('bottomLeft');
        expect(computer.doesNotForceFork(computer.availableCorners(board), board)).toContain('bottomRight');
      });

      it('finds side moves and filters out moves that force user fork move', function () {
        var board = new Board();
        board.setMarker('topRight', x);
        board.setMarker('bottomRight', o);
        board.setMarker('bottomLeft', o);

        expect(computer.doesNotForceFork(computer.availableSides(board), board)).toContain('middleLeft');
        expect(computer.doesNotForceFork(computer.availableSides(board), board)).toContain('middleRight');
        expect(computer.doesNotForceFork(computer.availableSides(board), board)).toContain('bottomCenter');
      });
    });

    describe('finds opposite corner move if user marked center on second move', function () {

      it('finds bottomRight corner if topLeft was first move by computer and user move center second move', function () {
        var board = new Board();
        board.setMarker('topLeft', x);
        board.setMarker('center', o);

        expect(computer.oppositeCorner(board)).toContain('bottomRight');
      });

      it('finds topRight corner if bottomLeft was first move by computer and user move center second move', function () {
        var board = new Board();
        board.setMarker('bottomLeft', x);
        board.setMarker('center', o);

        expect(computer.oppositeCorner(board)).toContain('topRight');
      });
    });

  });

});
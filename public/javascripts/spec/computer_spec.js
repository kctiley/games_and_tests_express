var computerMarker = " X ";
var userMarker  = " O ";
var blank = "[ ]";

var Computer = require('../src/computer');
var Board = require('../src/board');

var requiredObjComputer = require('../src/computer');
var Computer = requiredObjComputer.computer;
var requiredObjBoard = require('../src/board');
var Board = requiredObjBoard.board;

describe('Computer', function () {
  var computer;
  beforeEach(function(){
    computer = new Computer();
    board = new Board();
  })
    
  describe('methods', function () {
    describe('finds available side moves', function () {
      it('all sides are available initially', function () {
        computer.selectMove(board);
        expect(computer.availableSides(board)).toEqual(['topCenter', 'middleRight', 'bottomCenter', 'middleLeft']);
      });

      it('determines only available side moves', function () {
        computer.selectMove(board);
        board.setMarker('topCenter', computerMarker);
        expect(computer.availableSides(board)).toEqual(['middleRight', 'bottomCenter', 'middleLeft']);
      });

    });

    describe('finds available corner move', function () {
      it('all corners are available initially', function () {
        computer.selectMove(board);
        expect(computer.availableCorners(board)).toEqual(['topLeft', 'topRight', 'bottomRight', 'bottomLeft']);
      });

      it('finds only available corner moves', function () {
        computer.selectMove(board);
        board.setMarker('topLeft', computerMarker);
        expect(computer.availableCorners(board)).toEqual(['topRight', 'bottomRight', 'bottomLeft']);
      });

    });

    describe('finds available center move', function () {
      it('center available initially', function () {
        computer.selectMove(board);
        expect(computer.availableCenter(board)).toEqual(['center']);
      });

      it('finds only available center move', function () {
        computer.selectMove(board);
        board.setMarker('center', computerMarker);
        expect(computer.availableCenter(board)).toEqual([]);
      });

    });

    describe('finds available moves that make two in a row', function () {
      it('initially has no moves that make two in a row', function () {
        expect(computer.availableTwoInRowMoves(board, computerMarker)).toEqual([]);
      });

      it('finds horizontal moves that make two in a row', function () {
        board.setMarker('middleLeft', computerMarker);
        expect(computer.availableTwoInRowMoves(board, computerMarker)).toContain('middleRight');
      });

      it('finds horizontal moves that make two in a row', function () {
        board.setMarker('topLeft', computerMarker);
        expect(computer.availableTwoInRowMoves(board, computerMarker)).toContain('topRight');
        expect(computer.availableTwoInRowMoves(board, computerMarker)).toContain('topCenter');
      });

      it('finds vertical moves that make two in a row', function () {
        board.setMarker('topLeft', computerMarker);
        expect(computer.availableTwoInRowMoves(board, computerMarker)).toContain('middleLeft');
        expect(computer.availableTwoInRowMoves(board, computerMarker)).toContain('bottomLeft');
      });

      it('finds diagonal moves that make two in a row', function () {
        board.setMarker('topLeft', computerMarker);
        expect(computer.availableTwoInRowMoves(board, computerMarker)).toContain('center');
        expect(computer.availableTwoInRowMoves(board, computerMarker)).toContain('bottomLeft');
      });
      
    });

    describe('finds available moves that block user forks', function () {

      it('finds moves that block a fork', function () {
        board.setMarker('topLeft', userMarker);
        board.setMarker('bottomRight', userMarker);

        expect(computer.userForkMoves(board)).toContain('bottomLeft');
        expect(computer.userForkMoves(board)).toContain('topRight');
      });

      it('finds moves that block user fork', function () {
        board.setMarker('topCenter', userMarker);
        board.setMarker('bottomRight', userMarker);

        expect(computer.userForkMoves(board)).toContain('bottomCenter');
        expect(computer.userForkMoves(board)).toContain('topRight');
        expect(computer.userForkMoves(board)).toContain('topLeft');
        expect(computer.userForkMoves(board)).toContain('center');
      });

    });

    describe('finds available moves that create computer fork', function () {

      it('finds available moves that create computer fork', function () {
        board.setMarker('topLeft', computerMarker);
        board.setMarker('bottomRight', computerMarker);

        expect(computer.computerForkMoves(board)).toContain('bottomLeft');
        expect(computer.computerForkMoves(board)).toContain('topRight');
      });

      it('finds available moves that create computer fork', function () {
        board.setMarker('bottomLeft', computerMarker);
        board.setMarker('topRight',computerMarker);

        expect(computer.computerForkMoves(board)).toContain('bottomRight');
        expect(computer.computerForkMoves(board)).toContain('topLeft');
      });

      it('finds available moves that create computer fork', function () {
        board.setMarker('topCenter', computerMarker);
        board.setMarker('bottomRight',computerMarker);

        expect(computer.computerForkMoves(board)).toContain('bottomCenter');
        expect(computer.computerForkMoves(board)).toContain('topRight');
        expect(computer.computerForkMoves(board)).toContain('topLeft');
        expect(computer.computerForkMoves(board)).toContain('center');
      });

    });

    describe('finds available moves that block user win moves', function () {

        it('finds user win moves in middle of diagonal', function () {
          board.setMarker('topLeft', userMarker);
          board.setMarker('bottomRight', userMarker);

          expect(computer.userWinMoves(board)).toContain('center');
        });

      it('finds user win moves middle of horizontal', function () {
        board.setMarker('middleLeft', userMarker);
        board.setMarker('middleRight', userMarker);

        expect(computer.userWinMoves(board)).toContain('center');
      });

      it('finds user win moves left side of horizontal', function () {
        board.setMarker('center', userMarker);
        board.setMarker('middleRight', userMarker);

        expect(computer.userWinMoves(board)).toContain('middleLeft');
      });

    });

    describe('finds available computer win moves', function () {

      it('finds computer win moves in middle of diagonal row', function () {
        board.setMarker('topLeft', computerMarker);
        board.setMarker('bottomRight', computerMarker);

        expect(computer.computerWinMoves(board)).toContain('center');
      });

      it('finds computer win moves middle of horizontal row', function () {
        board.setMarker('middleLeft', computerMarker);
        board.setMarker('middleRight', computerMarker);

        expect(computer.computerWinMoves(board)).toContain('center');
      });

      it('finds computer win moves left side of horizontal row', function () {
        board.setMarker('center', computerMarker);
        board.setMarker('middleRight', computerMarker);

        expect(computer.computerWinMoves(board)).toContain('middleLeft');
      });

      it('finds computer win moves top of vertical row', function () {
        board.setMarker('center', computerMarker);
        board.setMarker('bottomCenter', computerMarker);

        expect(computer.computerWinMoves(board)).toContain('topCenter');
      });

    });


    describe('filters out moves that would force a user fork move', function () {

      it('finds corner moves and filters out moves that force user fork move', function () {
        board.setMarker('center', computerMarker);
        board.setMarker('bottomCenter', userMarker);
        board.setMarker('topRight', userMarker);

        expect(computer.doesNotForceFork(computer.availableCorners(board), board)).toContain('bottomLeft');
        expect(computer.doesNotForceFork(computer.availableCorners(board), board)).toContain('bottomRight');
      });

      it('finds side moves and filters out moves that force user fork move', function () {
        board.setMarker('topRight', computerMarker);
        board.setMarker('bottomRight', userMarker);
        board.setMarker('bottomLeft', userMarker);

        expect(computer.doesNotForceFork(computer.availableSides(board), board)).toContain('middleLeft');
        expect(computer.doesNotForceFork(computer.availableSides(board), board)).toContain('middleRight');
        expect(computer.doesNotForceFork(computer.availableSides(board), board)).toContain('bottomCenter');
      });
    });

    describe('finds opposite corner move if user marked center on second move', function () {

      it('finds bottomRight corner if topLeft was first move by computer and user move center second move', function () {
        board.setMarker('topLeft', computerMarker);
        board.setMarker('center', userMarker);

        expect(computer.oppositeCorner(board)).toContain('bottomRight');
      });

      it('finds topRight corner if bottomLeft was first move by computer and user move center second move', function () {
        board.setMarker('bottomLeft', computerMarker);
        board.setMarker('center', userMarker);

        expect(computer.oppositeCorner(board)).toContain('topRight');
      });
    });

  });

});
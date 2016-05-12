var x = " X ";
var o = " O ";
var blank = "[ ]";

var requiredObj = require('../src/board');
var Board = requiredObj.board;

var board;
beforeEach(function(){
  board = new Board();
})

describe('Board', function () {
  
  describe('constructor', function () {
    
    it('has specific positions with no neighbor in some directions', function () {
      // var board = new Board();
      expect(board.positions.topLeft.neighbors.left).toEqual(null);
    });

    it('has specific positions with specific neighbors', function () {
      expect(board.positions.center.neighbors.left).toEqual("middleLeft");
    });

    it('has specific positions with specific neighbors', function () {
      expect(board.positions.bottomRight.neighbors.up).toEqual("middleRight");
    });

    it('has positions with initial markers that are blank if no positions are provided', function () {
      expect(board.positions.bottomRight.marker).toEqual(blank);
    });

    it('has positions with initial markers that reflect markers of positions are provided when positions argument is used to create an instance of the board', function () {
      var board1 = new Board();
      board1.positions.topLeft.marker = x;
      var board2 = new Board(board1.positions);

      expect(board2.positions.topLeft.marker).toEqual(x);
    });
  });

  describe('methods', function () {
    
    describe('setMarker', function () {
      it('sets marker', function () {
        board.setMarker("center", x);
        expect(board.positions.center.marker).toEqual(' X ');
      });

    });
  });

});
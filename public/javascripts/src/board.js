if(typeof require !== 'undefined'){
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

function Board(existingBoardPositions) {
  this.positions = {
                topLeft : {marker:blank},
                topCenter : {marker:blank},
                topRight : {marker:blank},
                middleRight : {marker:blank},
                bottomRight : {marker:blank},
                bottomCenter: {marker:blank},
                bottomLeft : {marker:blank},
                middleLeft : {marker:blank},
                center : {marker:blank},
  };
  this.positions.topLeft.neighbors = {right : "topCenter", 
                                  down : "middleLeft", 
                                  downRight : "center" 
                                };
  this.positions.topCenter.neighbors = {
                                left : "topLeft", 
                                right : "topRight", 
                                downRight : "middleRight",
                                down : "center",
                                downLeft : "middleLeft"
                              };
  this.positions.topRight.neighbors = {
                                left : "topCenter", 
                                down : "middleRight",
                                downLeft : "center",
                              };
  this.positions.middleLeft.neighbors = {
                                up : "topLeft", 
                                upRight : "topCenter",
                                right : "center",
                                downRight : "bottomCenter",
                                down : "bottomLeft",
                              };
  this.positions.center.neighbors = {
                                left : "middleLeft",
                                upLeft : "topLeft",
                                up : "topCenter", 
                                upRight : "topRight",
                                right : "middleRight",
                                downRight : "bottomRight",
                                down : "bottomCenter",
                                downLeft : "bottomLeft",
                              }; 
  this.positions.middleRight.neighbors = {
                                left : "center",
                                upLeft : "topCenter",
                                up : "topRight", 
                                down : "bottomRight",
                                downLeft : "bottomCenter",
                              };
  this.positions.bottomLeft.neighbors = {
                                up : "middleLeft", 
                                upRight : "center",
                                right : "bottomCenter",
                              };
  this.positions.bottomCenter.neighbors = {
                                left : "bottomLeft", 
                                upLeft : "middleLeft",
                                up : "center",
                                upRight : "middleRight",
                                right : "bottomRight",
                              };
  this.positions.bottomRight.neighbors = {
                                left : "bottomCenter", 
                                upLeft : "center",
                                up : "middleRight",
                              };
  var pstns = this.positions                            
  for (pstn in pstns){
    var directions = ["left", "upLeft", "up", "upRight", "right", "downRight", "down", "downLeft" ]
    directions.forEach(function(direction){
      if(!pstns[pstn].neighbors[direction]){
        pstns[pstn].neighbors[direction] = null;
      }
    })
  }                               
  if(existingBoardPositions){
    for (position in existingBoardPositions){
      if(position.marker != blank){
        this.positions[position].marker = existingBoardPositions[position].marker;
      }
    }
  }

}

Board.prototype.setMarker = function(position, playerMarker){
  this.positions[position].marker = playerMarker;
};



if(typeof exports !== 'undefined'){ exports['board'] = Board}
  
var app=angular.module('myapp', ['ngMap']);
app.controller('MarkerRemoveCtrl', function($scope) {
  $scope.positions = [{lat:37.7699298,lng:-122.4469157},{lat:37.7699298,lng:-120.4469157}];
  $scope.addMarker = function(event) {
    var ll = event.latLng;
    $scope.positions.push({lat:ll.lat(), lng: ll.lng()});
  }
  $scope.deleteMarkers = function() {
    $scope.positions = [];
  };
  $scope.showMarkers = function() {
    for (var key in $scope.map.markers) {
      $scope.map.markers[key].setMap($scope.map);
    };
  };
  $scope.hideMarkers = function() {
    for (var key in $scope.map.markers) {
      $scope.map.markers[key].setMap(null);
    };
  };
});

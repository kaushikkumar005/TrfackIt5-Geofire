angular.module('myapp', ['ngMap','firebase'])


.controller('MarkerRemoveCtrl', function($scope,$firebaseArray) {

//start of geo fire
$scope.positions=[];

// Set the center as Firebase HQ
var locations = {
  "FirebaseHQ": [37.785326, -122.405696]
  
};
var center = locations["FirebaseHQ"];

// Query radius
var radiusInKm = 0.5;

// Get a reference to the Firebase public transit open data set
var transitFirebaseRef = new Firebase("https://publicdata-transit.firebaseio.com/")

// Create a new GeoFire instance, pulling data from the public transit data
var geoFire = new GeoFire(transitFirebaseRef.child("_geofire"));
var vehiclesInQuery = {};

var geoQuery = geoFire.query({
  center: center,
  radius: radiusInKm
});

/* Adds new vehicle markers to the map when they enter the query */
geoQuery.on("key_entered", function(vehicleId, vehicleLocation,$rootscope) {
  // Specify that the vehicle has entered this query
 var kauV="kauhsik";
  vehicleId = vehicleId.split(":")[1];
  vehiclesInQuery[vehicleId] = true;
 //alert(vehicleLocation);
 $scope.positions.push({vehicleLocation});
  // Look up the vehicle's data in the Transit Open Data Set
  transitFirebaseRef.child("sf-muni/vehicles").child(vehicleId).once("value", function(dataSnapshot) {
    // Get the vehicle data from the Open Data Set
    vehicle = dataSnapshot.val();
//$scope.positions=$firebaseArray( transitFirebaseRef.child("sf-muni/vehicles").child(vehicleId));
 //alert(JSON.stringify(vehicle.lat));
//$scope.positions = vehicle;
    // If the vehicle has not already exited this query in the time it took to look up its data in the Open Data
    // Set, add it to the map
    if (vehicle !== null && vehiclesInQuery[vehicleId] === true) {
      // Add the vehicle to the list of vehicles in the query
      vehiclesInQuery[vehicleId] = vehicle;

      // Create a new marker for the vehicle
      //vehicle.marker = createVehicleMarker(vehicle);
	  $scope.marker = new google.maps.Marker({
             
             position : new google.maps.LatLng(vehicle.lat,vehicle.lon)
            
         });
         vehicle.marker =  $scope.marker;
		 
		  //alert(JSON.stringify(vehicle.marker));
    }
	
  });
  
  //$scope.positions=[{lat:37.7699298,lng:-122.4469157},{lat:37.7833,lng:-122.4167},{lat:35.7833,lng:-122.4167}];
  alert(JSON.stringify($rootscope.position));
  //alert(JSON.stringify($scope.positions));
});


function home(key_entered){
var kauhom="ashihs";
alert("kk");
console.log("KaushikVarei"+ key_entered.kauV);
 
};
 
 //console.log("vechile"+ k.vehicleId);
  $scope.positions=[{lat:37.7699298,lon:-122.4469157},{lat:37.7699388,lon:-122.4167},{lat:37.7833,lon:-122.4167}];
  //var kn=home();
// console.log("KaushikVarei" +kn);
 //doesnot work with lon 
//alert(JSON.stringify($scope.positions));



  
  
  
  
  
  
});

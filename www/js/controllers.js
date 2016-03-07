app.controller('main', function ($scope, $ionicModal, localStorageService, $cordovaGeolocation) { //store the entities name in a variable var taskData = 'task';
    var avansLat = 51.688511;
    var avansLong = 5.286630;

    var homeLat = 51.312763;
    var homeLong = 5.613872;

    var posOptions = {timeout: 30000, maximumAge: 2000, enableHighAccuracy: true};
    $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
            $scope.lat  = position.coords.latitude
            $scope.long = position.coords.longitude
        }, function(err) {
            // error
        });

    var watchOptions = {
        timeout : 3000,
        enableHighAccuracy: true // may cause errors if true
    };

    var watch = $cordovaGeolocation.watchPosition(watchOptions);
    watch.then(
        null,
        function(err) {
            // error
            alert(err);
        },
        function(position) {
            $scope.lat  = position.coords.latitude
            $scope.long = position.coords.longitude

            alert(position.coords.latitude);

        });


    watch.clearWatch();

    function distance(lat1, lon1, lat2, lon2) {
        var p = 0.017453292519943295;    // Math.PI / 180
        var c = Math.cos;
        var a = 0.5 - c((lat2 - lat1) * p)/2 +
            c(lat1 * p) * c(lat2 * p) *
            (1 - c((lon2 - lon1) * p))/2;

        return 12742000 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
    }

    $scope.onSchool = function(){
        return distance($scope.lat, $scope.long, avansLat, avansLong) < 200;
    }

    $scope.atHome = function(){
        return distance($scope.lat, $scope.long, homeLat, homeLong) < 200;
    }

})
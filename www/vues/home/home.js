app.controller('HomeCtrl', function($scope) {

$scope.s = {};

$scope.s.pays;

$http.get("https://restcountries.eu/rest/v2/all")
    .success(function(data){
        $scope.s.pays = data;    
    })
    .error(function(){
      console.log('ERREUR REQUETE HTTP');
    })
}); 
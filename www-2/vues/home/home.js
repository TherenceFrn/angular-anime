app.controller ('HomeCtrl', function($scope,$http,$cookies, test123)
{
$scope.s = {};
$scope.s.chargement = 0;
$scope.s.rechercheDone = false;
$scope.s.data = [];
$scope.s.comeCommune;
$scope.s.dataCookie = [];


var requeteCookieEx = $cookies.get('cookieNom');
if(requeteCookieEx == null){

}else{
  $scope.s.dataCookieNom = $cookies.get('cookieNom');
  $scope.s.dataCookieCode = $cookies.get('cookieCode');
}

  $scope.Recherche = function(codeCommune){
    var urlrequete = "https://geo.api.gouv.fr/communes?codePostal="+codeCommune+"&fields=nom,code,codesPostaux,codeDepartement,codeRegion,population&format=json&geometry=centre";
    $scope.s.comeCommune = codeCommune;


    $http.get(urlrequete).success(function(data){

      $scope.s.data = data;
      $scope.s.rechercheDone = true;

    });
  }

  $scope.saveCookie = function(nomdelaCommune){

    var urlRequet = "https://geo.api.gouv.fr/communes?codePostal="+$scope.s.comeCommune+"&nom="+nomdelaCommune+"&fields=nom,code,codesPostaux,codeDepartement,codeRegion,population&format=json&geometry=centre";
    $http.get(urlRequet).success(function(data){

      $cookies.put('cookieCode', data[0]['nom']);
      $cookies.put('cookieNom', data[0]['code']);
      $scope.s.dataCookieNom = $cookies.get('cookieNom');
      $scope.s.dataCookieCode = $cookies.get('cookieCode');


      });
  }

  $scope.s.supprfav = function(){
    test123.get();
  }
  
});

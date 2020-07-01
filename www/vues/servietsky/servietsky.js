app.controller('ServietskyCtrl', function($scope, $http) {
    $scope.s = {};

    $scope.s.pays;
    $scope.s.paysF;
    $scope.s.yatilrecherche = false;
    $scope.s.apicharge = false;
    $scope.s.nombrePays = 250;

    $http.get("https://restcountries.eu/rest/v2/all")
    .success(function (data) {
        $scope.s.pays = data;
    $scope.s.apicharge = true;

    })
    .error(function () {
        console.log('ERREUR REQUETE HTTP');
    })


    $scope.faireRecherche = function(oui){

        if(oui != ''){
            var urlreq = "https://restcountries.eu/rest/v2/name/" + oui;
            $http.get(urlreq)
            .success(function (data) {
                $scope.s.paysF = data;
                $scope.s.yatilrecherche = true;
                $scope.s.nombrePays = $scope.s.paysF.length;
            })
            .error(function () {
                console.log('ERREUR REQUETE HTTP');
            })
        }else{
                $scope.s.yatilrecherche = false;
        }
    }

});
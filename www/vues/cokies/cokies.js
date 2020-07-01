app.controller('CokieCtrl', function($scope,random,$cookies) {

    $scope.s = {};
    $scope.s.majoration = 10;
    $scope.s.nbAlea;
    $scope.s.reussi = false;
    $scope.s.infosNb = false;
    $scope.s.moinsPlus = "";

    var leCookie = $cookies.get('valNombre2');
    // var leCookie = $cookies.get('valNombre');
    console.log('Valeur cookie : ' + leCookie);

    $scope.s.initialisation = function(){
        console.log('Execution fonction initialisation');
        if(leCookie === undefined){
            console.log('Le Cookie n\'a pas de valeur');
            random.get($scope.s.majoration);
            console.log('On appelle le servive [ '+ $cookies.get("valNombre2")+' ]')
            // $scope.s.nbAlea = Math.floor(Math.random() * $scope.s.majoration);
            // console.log('Nb alea : ' + $scope.s.nbAlea);
            // $cookies.put("valNombre", $scope.s.nbAlea);
        }else{
            $scope.s.nbAlea = $cookies.get("valNombre2");
            console.log('Le cookie a deja une valeur [ ' + $cookies.get("valNombre2") + ' ]')
            // $scope.s.nbAlea = $cookies.get("valNombre");
        }
    }

    console.log('On appelle l\'initialisation');
    $scope.s.initialisation();
    

    //fonction qui verifie si le joueur a gagné
    $scope.s.verification = function(guess){
        console.log('On appelle la verification');
        if(guess == $scope.s.nbAlea){
            console.log('Le joueur a trouvé le bon nombre [ ' + $cookies.get("valNombre2") + ' - ' + guess + ' ]')
            $scope.s.reussi = true;
        }
        else{
            console.log('Le joueur n\'a pas trouvé le bon nombre [ ' + $cookies.get("valNombre2") + ' - ' + guess + ' ]')
             $scope.s.infosNb = true;
            if(guess < $scope.s.nbAlea){
                $scope.s.moinsPlus = "plus";
            } else if (guess > $scope.s.nbAlea) {
              $scope.s.moinsPlus = "moins";
            }else{
                $scope.s.infosNb = false;
            }
        }
    }
    //fonction rejouer
    $scope.s.rejouer = function(){
        console.log('Le joueur veut rejouer');
        $scope.s.majoration ++;
        $cookies.remove('valNombre2');
        // $cookies.remove('valNombre');
        $scope.s.reussi = false;
        $scope.s.infosNb = false;
        var leCookie = $cookies.get('valNombre2');
        $scope.s.initialisation();
        console.log('NOUVELLE VALEUR ALEATOIRE : ' + $cookies.get("valNombre2"))
    }
}); 

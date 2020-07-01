app.controller('CalculatorCtrl', function($scope) {

    $scope.s = {};
    
    $scope.s.affichage = ''; //variable qui affiche le resultat
    $scope.s.dernierString = true; //variable qui determine si j'ai le droit de mettre un operateur
    $scope.s.nouvelleOpe = true; //variable qui determine si c'est un nouveau calcul

    // FONCTION QUI RESET LA VARIABLE QUI STOCK TOUTES LES DONNEES 
    $scope.reset = function(){

         $scope.s.affichage = '';
         $scope.s.dernierString = true;
    }

    // FONCTION QUI AJOUTE LES CHIFFRES ET LES OPERATEURS DANS UNE VARIABLE
    $scope.ajout = function(parametre){

        if ($scope.s.nouvelleOpe == true){
            $scope.s.affichage = '';
            $scope.s.nouvelleOpe = false;
        }

        if (typeof parametre == "string" && $scope.s.dernierString == false) {

            $scope.s.affichage = $scope.s.affichage + ' ' + parametre + ' ';
            $scope.s.dernierString = true;
        }else if (typeof parametre == "number") {

            $scope.s.affichage = $scope.s.affichage + parametre.toString();
            $scope.s.dernierString = false;
        }else{

            console.log('erreur type de parametre lors de l\' ajout a la syntaxe');
        }

    }

    // FONCTION QUI FAIT LE CALCUL
    $scope.calcul = function(){

        var listeOpe = $scope.s.affichage;
        var listeOpe = listeOpe.split(' ');
        var listeOpe_l = listeOpe.length;
        console.log('Nombre d\'elements : ' + listeOpe_l);
        console.log('Elements : ' + listeOpe);

        if(listeOpe[listeOpe_l-1] == ''){
            listeOpe.pop();
            listeOpe.pop();
        }

        console.log('APRES VERIF : ')

        var listeOpe_l = listeOpe.length;
        console.log('Nombre d\'elements : ' + listeOpe_l);
        console.log('Elements : ' + listeOpe);

        $scope.s.affichage = parseInt(listeOpe[0]);
                
        for (i = 2; i < listeOpe_l; i++) {
            console.log("FOR")

            if (listeOpe[i-1] == '+'){
                console.log($scope.s.affichage);
                console.log('PLUS ' + listeOpe[i]);
                $scope.s.affichage = $scope.s.affichage + parseInt(listeOpe[i]);
                console.log($scope.s.affichage);
            } else if (listeOpe[i - 1] == '-') {
                console.log($scope.s.affichage);
                console.log('MOINS ' + listeOpe[i]);
                $scope.s.affichage = $scope.s.affichage - parseInt(listeOpe[i]);
                console.log($scope.s.affichage);
            } else if (listeOpe[i - 1] == '*') {
              console.log($scope.s.affichage);
              console.log('MULT ' + listeOpe[i]);
              $scope.s.affichage = $scope.s.affichage*- parseInt(listeOpe[i]);
              console.log($scope.s.affichage);
            } else if (listeOpe[i - 1] == '/') {
              console.log($scope.s.affichage);
              console.log('DIV ' + listeOpe[i]);
              $scope.s.affichage = $scope.s.affichage / parseInt(listeOpe[i]);
              console.log($scope.s.affichage);
            }
            
        }
        $scope.s.nouvelleOpe = true;
        $scope.s.dernierString = true;
    }
});
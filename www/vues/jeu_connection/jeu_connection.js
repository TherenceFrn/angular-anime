app.controller('Jeu_connectionCtrl', function ($scope, $http, random, $cookies, $location) {
  
  $scope.s = {};
  $scope.s.userWon = false;
  $scope.s.alternRep = true;

  var testRecordCookie = $cookies.get('RecordName');

  if(testRecordCookie == null) {
    console.log('Le record n existe pas');
    $cookies.put('RecordName', 'Thérence');
    $cookies.put('RecordTime', '1:00');
  }

  //on va chercher dans les cookies si un utilisateur est enregistré
  var userExist = $cookies.get('UserName');
  //ensuite on va vérifier s'il existe vraiment
  if(userExist == null){
    //l'utilisateur n'existe pas
    console.log("l'utilisateur n'existe pas");
    $scope.s.userExist =  false;

  }else{
    //l'utilisateur existe
    console.log("l'utilisateur existe ( " + $cookies.get('UserName') + " | Score : " + $cookies.get('UserScore') + " ) ");
    $scope.s.userExist =  true;
    $scope.s.userName = $cookies.get('UserName');
    $scope.s.userScore = $cookies.get('UserScore');
    $location.path('/app/Jeu');

  }
  //fonction qui permet d'enregistrer un utilisateur
  $scope.s.saveUser = function (userPseudo) {
    ///on enregistre le nom du joueur dans un cookie
    $cookies.put('UserName', userPseudo);
    ///on enregistre le score du joueur dans un cookie
    $cookies.put('UserScore', 0);
    //on met dans le scope le nom de l'utilisateur
    $scope.s.userName = $cookies.get('UserName');
    $scope.s.userScore = $cookies.get('UserScore');

    $scope.s.userExist = true;
    $location.path('/app/Jeu');

  };

  
}); 




////////////////////////
//redirection:
//$location.path('/app/....');


// if ($scope.s.userExist == false) {
//   $location.path('/app/Jeu');
// }
////////////////////////
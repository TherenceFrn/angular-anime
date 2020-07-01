app.controller('JeuCtrl', function($scope, $http, random, $cookies, $location) {
  
  $scope.s = {};
  $scope.s.listAnimeArray = [47, 21, 30831, 11061, 1535, 23273, 1735, 34599, 5114, 223, 30, 32182, 32281, 38000, 1, 245, 30276, 37779, 33352, 16498, 523, 199, 10087, 11757, 19815, 22319, 31964, 6702, 22199, 31240, 269, 18679, 13601, 23755, 28223, 24833, 35120, 527, 918, 80, 235, 2116, 10701, 1887, 530, 350, 14719, 23277, 9756, 10165, 33731, 32379, 3455, 28825, 35062, 2000, 16732, 33206, 27775, 34618, 3312, 37999, 1016, 966, 38826];
  $scope.s.data = [, , , ];
  $scope.s.userWon = false;
  // quand c'est true c'est image
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
    $location.path('/app/Jeu_connection');

  }else{
    //l'utilisateur existe
    console.log("l'utilisateur existe ( " + $cookies.get('UserName') + " | Score : " + $cookies.get('UserScore') + " ) ");
    $scope.s.userExist =  true;
    $scope.s.userName = $cookies.get('UserName');
    $scope.s.userScore = $cookies.get('UserScore');
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

  };
  //on definit la fonction qui genere 4 anime
  var iGen = 0;
  $scope.genAnime = function () {
      
      //on genere un numero aleatoire du tableau
      var idArrayGen = random.getAnime($scope.s.listAnimeArray.length - 1);
      
      var idArrayAnime = $scope.s.listAnimeArray[idArrayGen];
      
      $scope.s.listAnimeArray.splice(idArrayGen, 1);
      
      var urlRequete = 'https://api.jikan.moe/v3/anime/' + idArrayAnime;
      
      $http.get(urlRequete)
      
      .success(function (data) {
        console.log('Recuperation infos anime n°'+iGen+' id MAl : '+idArrayAnime);
        $scope.s.data[iGen] = data;
        console.log($scope.s.data[iGen]['title'])
        iGen++;
        if(iGen < 4){
          $scope.genAnime();
        }else{
          var goodAnwserArrayId =  random.getAnime(3);
          console.log('Id de la bonne réponse : '+goodAnwserArrayId);
          $scope.s.goodAnswer = [,,];
          $scope.s.goodAnswer['title'] = $scope.s.data[goodAnwserArrayId]['title'];
          $scope.s.goodAnswer['mal_id'] = $scope.s.data[goodAnwserArrayId]['mal_id'];
          $scope.s.goodAnswer['image_url'] = $scope.s.data[goodAnwserArrayId]['image_url'];

          console.log($scope.s.goodAnswer['title'])
          console.log($scope.s.goodAnswer['mal_id'])
          console.log($scope.s.goodAnswer['image_url'])
        }
      })
      
      .error(function () {
        console.log('ERREUR REQUETE HTTP');
      })
  }

  //on appelle la fonction qui genere les 4 anime
  $scope.genAnime();

  $scope.verif = function(id_guess){
    if (id_guess == $scope.s.goodAnswer['mal_id']) {
      // alert('Bien joué !');
      console.log('L\'utilisateur a trouvé la bonne réponse');
      // $scope.s.listAnimeArray = [47, 21, 30831, 11061, 1535, 23273, 1735, 34599, 5114, 223, 30];
      // $scope.s.data = [, , , ];
      var score_user = $cookies.get('UserScore');
      score_user++;
      console.log('Score utilisateur : '+score_user);
      $cookies.put('UserScore', score_user);
      $scope.s.userScore = $cookies.get('UserScore');
      console.log('---------------ON RESET-----------')
      $scope.s.listAnimeArray = [47, 21, 30831, 11061, 1535, 23273, 1735, 34599, 5114, 223, 30, 32182, 32281, 38000, 1, 245, 30276, 37779, 33352, 16498, 523, 199, 10087, 11757, 19815, 22319, 31964, 6702, 22199, 31240, 269, 18679, 13601, 23755, 28223, 24833, 35120, 527, 918, 80, 235, 2116, 10701, 1887, 530, 350, 14719, 23277, 9756, 10165, 33731, 32379, 3455, 28825, 35062, 2000, 16732, 33206, 27775, 34618, 3312, 37999, 1016, 966, 38826];
      $scope.s.data = [, , , ];
      iGen = 0;
      if($scope.s.userScore >= 10){
        $scope.s.userWon = true;

        var tempsAlaFIn = $scope.s.chrono;
        console.log('Temps a la fin: '+tempsAlaFIn);

        var recordTime = $cookies.get('RecordTime');
        console.log('Record : '+recordTime)

        // COMPARER LE RECORD ET LE SCOPE EN SPLITANT
        // COMPARER LE RECORD ET LE SCOPE EN SPLITANT
        // COMPARER LE RECORD ET LE SCOPE EN SPLITANT
        // COMPARER LE RECORD ET LE SCOPE EN SPLITANT

        var splitedChronoFin = tempsAlaFIn.split(':');
        var splitedChronoRecord = recordTime.split(':');

        if (splitedChronoFin[0] < splitedChronoRecord[0]){
           // record battu, meme pas la meme minute
          console.log('Record Battu !');
          console.log('Ancien record : ' + recordTime);
          console.log('Nouveau record : ' + tempsAlaFIn);
          $cookies.put('RecordTime', tempsAlaFIn);
          $cookies.put('RecordName', $scope.s.userName);
          $scope.s.recordTime = $cookies.get('RecordTime');
          $scope.s.recordName = $cookies.get('RecordName');
        } else if (splitedChronoFin[0] == splitedChronoRecord[0] && splitedChronoFin[1] < splitedChronoRecord[1]) {
          console.log('Record Battu !');
          console.log('Ancien record : ' + recordTime);
          console.log('Nouveau record : ' + tempsAlaFIn);
          $cookies.put('RecordTime', tempsAlaFIn);
          $cookies.put('RecordName', $scope.s.userName);
          $scope.s.recordTime = $cookies.get('RecordTime');
          $scope.s.recordName = $cookies.get('RecordName');
        } else {
          console.log('Le record n\'a pas ete battu');
          $scope.s.recordTime = $cookies.get('RecordTime');
          $scope.s.recordName = $cookies.get('RecordName');
        }

        clearTimeout(ChronoTimeOut);
      
      }else{
        if ($scope.s.alternRep == true){
          $scope.s.alternRep = false;
        } else if ($scope.s.alternRep == false) {
          $scope.s.alternRep = true;
        }
        $scope.genAnime();
      }
    }else{
      console.log('Raté !');
      var score_user = $cookies.get('UserScore');
      if(score_user < 1){
        
      }else{
        score_user--;
      }
      console.log('Score utilisateur : ' + score_user);
      $cookies.put('UserScore', score_user);
      $scope.s.userScore = $cookies.get('UserScore');
    }
  }

  $scope.deleteCookie = function(){
    $cookies.remove('UserScore');
    $cookies.remove('UserName');
    $scope.s.userExist = false;
    $scope.s.userWon = false;
    $scope.s.chrono = '0:00';
    $location.path('/app/Jeu_connection');
  }

  $scope.reset = function(){
    $scope.s.listAnimeArray = [47, 21, 30831, 11061, 1535, 23273, 1735, 34599, 5114, 223, 30, 32182, 32281, 38000, 1, 245, 30276, 37779, 33352, 16498, 523, 199, 10087, 11757, 19815, 22319, 31964, 6702, 22199, 31240, 269, 18679, 13601, 23755, 28223, 24833, 35120, 527, 918, 80, 235, 2116, 10701, 1887, 530, 350, 14719, 23277, 9756, 10165, 33731, 32379, 3455, 28825, 35062, 2000, 16732, 33206, 27775, 34618, 3312, 37999, 1016, 966, 38826];
     $scope.s.data = [, , , ];
     iGen = 0;
     $scope.s.userWon = false;
     $cookies.put('UserScore', 0);
     $scope.s.userScore = $cookies.get('UserScore');
     $scope.s.chrono = '0:00';
     $scope.genAnime();

  }

  ////////////////// CHRONO
  $scope.s.chrono = '0:00';

  $scope.chronometre = function(){

    // console.log(' + 1 seconde');

    var chronoString = $scope.s.chrono;
    // console.log('STRING : '+chronoString)
    var splitedChrono = chronoString.split(':');  
    // console.log('SPLITED : ' + splitedChrono)
    splitedChrono[1]++;
    // console.log('SECONDES : ' + splitedChrono[1])

    if(splitedChrono[1] == 60){

      // console.log(' ca fait 10 s');

      splitedChrono[0]++;

      splitedChrono[1] = 0;

      $scope.s.chrono = splitedChrono[0] + ':' + splitedChrono[1];
      // console.log('SCOPE : ' + $scope.s.chrono)
    }else{

      $scope.s.chrono = splitedChrono[0] + ':' + splitedChrono[1];
      // console.log('SCOPE : ' + $scope.s.chrono)

    }
    // console.log('---------------------------------')

    var ChronoTimeOut = setTimeout($scope.chronometre, 1000);
  }
  
  $scope.chronometre(); 
}); 




////////////////////////
//redirection:
//$location.path('/app/....');


// if ($scope.s.userExist == false) {
//   $location.path('/app/Jeu');
// }
////////////////////////
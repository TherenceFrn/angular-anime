app.controller('MusicCtrl', function($scope, $http, random, $cookies) {
    
    
 
    // var request = require('request');

    // var options = {
    //   uri: 'https://anilist.co/api/v2/oauth/token',
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    //   },
    //   json: {
    //     'grant_type': 'authorization_code',
    //     'client_id': '2804',
    //     'client_secret': 'OCaBRAdpNb0bkAosBPYxbvUt94ZmSZT4mSN5zxlP',
    //     'redirect_uri': 'htt^p://localhost:8100', // http://example.com/callback
    //     'code': 'def502003c59166ca4c30ecaac079fde03296fc5fd6c253bc7bace07d5bca2ac6f057556f76c2d74526feea55ec97547a076ef0ab946ee0e35c58924b17a70894c33aaad72ec89d7c70f06aa3ff0fcc1a82379a09c19bef589d4cfcde952138b1bc8f56c9dc624cc2be7367a95638465455a4e9cca801ce27f835f945cf46b4b31e41e6bac72c1ca630b638307be4a34725024698a54cc12f1389d06f76607ea3ccf4116197ea0ea5234e8d99cb1ee2788471e5281e440eb315b3830045c46968bdb692039b21a2c586ebfac169746587f828fdab305d6065d0c6d3b5d596860ec1ff5eefa3a4621f6bdd4dfa97e2967921cf8b5386904826b968aff55416db1630268d01713423bfcf29ec17e396ddc68d724033012eaa93c2611aab783b3d2a8a66f50cbe1883a36403b87bbb19186e6e191f3935c9357faeca946ef3c500f9219886e1aec0b2d3c14755cf7521e2d30ff43527af68b6ac529713d0e37', // The Authorization Code received previously
    //   }
    // };

    // request(options, function (error, response, body) {
    //   if (!error && response.statusCode == 200) {
    //     console.log(body.access_token);
    //   }
    // });

    //ANILIST
    // $http({
    //     method: 'POST',
    //     url: 'https://anilist.co/api/v2/oauth/token',
    //     header: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json',
    //     },
    //     data: {
    //         'grant_type': 'authorization_code',
    //         'client_id': '2804',
    //         'client_secret': 'OCaBRAdpNb0bkAosBPYxbvUt94ZmSZT4mSN5zxlP',
    //         'redirect_uri': 'htt^p://localhost:8100', // http://example.com/callback
    //         'code': 'def502003c59166ca4c30ecaac079fde03296fc5fd6c253bc7bace07d5bca2ac6f057556f76c2d74526feea55ec97547a076ef0ab946ee0e35c58924b17a70894c33aaad72ec89d7c70f06aa3ff0fcc1a82379a09c19bef589d4cfcde952138b1bc8f56c9dc624cc2be7367a95638465455a4e9cca801ce27f835f945cf46b4b31e41e6bac72c1ca630b638307be4a34725024698a54cc12f1389d06f76607ea3ccf4116197ea0ea5234e8d99cb1ee2788471e5281e440eb315b3830045c46968bdb692039b21a2c586ebfac169746587f828fdab305d6065d0c6d3b5d596860ec1ff5eefa3a4621f6bdd4dfa97e2967921cf8b5386904826b968aff55416db1630268d01713423bfcf29ec17e396ddc68d724033012eaa93c2611aab783b3d2a8a66f50cbe1883a36403b87bbb19186e6e191f3935c9357faeca946ef3c500f9219886e1aec0b2d3c14755cf7521e2d30ff43527af68b6ac529713d0e37', // The Authorization Code received 
    //     }
    // }).success(function (data) {
    //   $scope.s.pays = data;
    //   $scope.s.apicharge = true;

    // })

  $scope.s = {};

  $scope.s.apicharge = false;
  $scope.s.userSaved = false;
  $scope.s.goodAnswerGenerated = false;
  var idAnimeArray = [47, 21, 30831, 11061, 1535, 23273, 1735, 34599, 5114, 223, 30];
  $scope.s.data = [,,,];
  // $http.get("https://api.jikan.moe/v3/search/anime?q=one%20piece")

  $scope.s.saveUser = function(userPseudo){

    
  };
  
  $scope.genAnime = function(indexArray){
      var ouioui = random.getAnime(idAnimeArray.length - 1);
      console.log('ID : ' + ouioui);
      console.log(idAnimeArray)
      var urlHttp = 'https://api.jikan.moe/v3/anime/' + idAnimeArray[ouioui];
      $http.get(urlHttp)
        //$http.get("https://api.jikan.moe/v3/anime/30")
        .success(function (data) {
          // $scope.s.data1 = data;
          $scope.s.data[indexArray] = data;
          $scope.s.apicharge = true;
          idAnimeArray.splice(ouioui, 1);
        })
        .error(function () {
          console.log('ERREUR REQUETE HTTP');
        })
    }

    $scope.genAnime(0);
    $scope.genAnime(1);
    $scope.genAnime(2);
    $scope.genAnime(3);

    $scope.genGoodAnswer = function(){ 
      // on recupere la valeur du cookie qui dit si tous les cookies ont été généré
      var valCookiesAnswer = $cookies.get('cookieGenerated');
      //ensuite on vérifie s'il existe
      //s'il n'existe pas on va crééer des valeurs
      if (valCookiesAnswer == null){
        console.log('Le cookie n existe pas');
        var goodAnswerId = random.getAnime(3);
        
        $cookies.put("goodAnswerCookieTitle", $scope.s.data[goodAnswerId]['title']);
        $scope.s.goodAnswerTitle = $cookies.get('goodAnswerCookieTitle');

        $cookies.put("goodAnswerCookieId", $scope.s.data[goodAnswerId]['mal_id']);
        $scope.s.goodAnswerId = $cookies.get('goodAnswerCookieId');

        $cookies.put("goodAnswerCookieImage", $scope.s.data[goodAnswerId]['image_url']);
        $scope.s.goodAnswerImage = $cookies.get('goodAnswerCookieImage');

        $cookies.put('cookieGenerated', true);
      }else{
  
        console.log('Un Cookie existe deja');
        $scope.s.goodAnswerTitle = $cookies.get('goodAnswerCookieTitle');
        console.log('Titre : ' + $scope.s.goodAnswerTitle);
        $scope.s.goodAnswerId = $cookies.get('goodAnswerCookieId');
        console.log('Id : ' + $scope.s.goodAnswerId);
        $scope.s.goodAnswerImage = $cookies.get('goodAnswerCookieImage');
        console.log('Url Image : ' + $scope.s.goodAnswerImage);

      }
    }
  
    $scope.deleteCookie = function(){
      console.log('Suppression de tous les cookies');
      $cookies.remove('cookieGenerated');
      $cookies.remove('goodAnswerCookieTitle');
      $cookies.remove('goodAnswerCookieId');
      $cookies.remove('goodAnswerCookieImage');
      $scope.s.goodAnswerTitle = $cookies.get('goodAnswerCookieTitle');
      $scope.s.goodAnswerId = $cookies.get('goodAnswerCookieId');
      $scope.s.goodAnswerImage = $cookies.get('goodAnswerCookieImage');

    }

}); 
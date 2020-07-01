app.factory("random", function($cookies){

    var get = function(max){
        console.log('RANDOM.GET');

        if(!$cookies.get("valNombre2")){
            console.log('Le cookie n\'existe pas encore ('+max+')');
            var nombreaAleatoire = Math.floor(Math.random() * (max - 0 + 1)) + 0;
            $cookies.put("valNombre2", nombreaAleatoire);
            console.log('NOUVELLE VALEUR ALEAOTOIRE DU RANDOM : ' + $cookies.get("valNombre2"))

        }
        return $cookies.get("valNombre2")
    };

    var getAnime = function(max){
        var nombreaAleatoire = Math.floor(Math.random() * (max - 0 + 1)) + 0;
        return nombreaAleatoire;
    }
    return {
        get: get,
        getAnime:getAnime,
    }
});
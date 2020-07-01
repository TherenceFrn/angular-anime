app.factory('test123', function($cookies){

    console.log('Integration du fichier factory');

    var get = function(){

        console.log('On supprime les cookies');
        $cookies.remove('cookieNom');
        $cookies.remove('cookieCode');
    };

    return{

    get:get,
    }
});

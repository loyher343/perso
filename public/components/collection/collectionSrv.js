angular.module('comicApp').service('collectionSrv', function($http) {

    this.authMe = () => { 
        return $http.get('/auth/me')
        .then(function(res){
        return res
        })
    }
})
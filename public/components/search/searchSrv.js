angular.module('comicApp').service('searchSrv', function($http){

    const key = 'api_key=dbe5258aa34625d379e5b78516f7364665038eb9';
    const api = 'https://api-comic-vine.herokuapp.com/search/?api_key=dbe5258aa34625d379e5b78516f7364665038eb9&format=json&query=name:'
    const comic= 'I Hate Fairyland'
    
    this.submit = (user) => {
        //console.log(user)
        //return $http.jsonp(api + user.firstname)
        return $http({
            method: 'GET',
            url: api + user.firstname,
        }).then(function successCallback(response){
            
            return response
        })
    }
    
})
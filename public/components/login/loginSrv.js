angular.module('comicApp').service('loginSrv',function($http){
    this.getUser = () => $http.get('/auth/me');

    this.createUser = (user) => {
        console.log(user)
        return $http.post('/api/user/create', user);
    } 
})
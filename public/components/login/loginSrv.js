angular.module('comicApp').service('loginSrv',function($http){
    this.getUser = () => {
       return $http.get('/auth/me').then(res => {
            console.log(res)
            return res
        });
    }
    

    this.test1 = () => {
       
        return $http.get('/api/test1',{authid:'auth0|59dcf72431193b64592aa664'}).then(res => {
            console.log(res)
            return res
        })
    }
  
})

angular.module('comicApp').service('profileSrv', function($http){
    this.updateUser = (user) => {
        return $http.put('/api/users').then(res => {
            return res
        })
    }

    this.userStuff = () => {
        return $http.get('/auth/session').then(res => {
            console.log(res)
            return res
        })
    }
})
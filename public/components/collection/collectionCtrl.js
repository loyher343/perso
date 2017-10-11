angular.module('comicApp').controller('collectionCtrl', function($scope, collectionSrv, $http) {
    
    $scope.test = 'Tis better to be vile than vile esteemed'
    $scope.sessiontest = () => {
        $http.get('/auth/session').then(function(res){
 
            console.log(res)
            console.log('++++++++', res.data.passport.user.nickname)
            $scope.data =  res.data.passport.user.nickname
        })
    }
    $scope.logout = () => {
        $http.get('/auth/logout').then(function(res){
            return res
        })
    }

    var promise = collectionSrv.authMe();
    promise.then(function(data){
        console.log(data)
        $scope.user=data
    })
})
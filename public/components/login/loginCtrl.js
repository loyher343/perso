angular.module('comicApp').controller('loginCtrl', function($scope,loginSrv,$http) {
    
    $scope.test = 'TIS BETTER TO BE VILE THAN VILE ESTEEM'
    
    $scope.test1 = () => {
        loginSrv.test1()
            .then((res) => {
                console.log(res)
              
            })
    }
    

    $scope.sessiontest = () => {
       $http.get('/auth/session').then(function(res){

           console.log(res)
           console.log('++++++++', res.data.passport.user.nickname)
           $scope.data =  res.data.passport.user.nickname
       })
    }
    
})
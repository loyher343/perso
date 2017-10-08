<<<<<<< HEAD
angular.module('comicApp').controller('searchCtrl', function($scope, searchSrv) {
    $scope.test = 'Tis better to vile than vile esteem'
   
    


    $scope.submit = function(user) {
        //console.log(user)
        searchSrv.submit(user)
            .then(function(data){
                console.log('Y0',data)
                $scope.comicbook = data.data.results;
            })
    }
    
    })
    
=======
angular.module('comicApp').controller('searchCtrl', function($scope) {
    $scope.test = 'Tis better to be vile than vile esteemed'
})
>>>>>>> 5cf2cf89bae93f54127d58dee31cb8afbda3e701

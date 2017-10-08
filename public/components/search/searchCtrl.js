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
    

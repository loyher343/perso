angular.module('comicApp').controller('collectionCtrl', function($scope, collectionSrv, $http, $state) {
    
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
            return $state.go('login')
        })
    }
   
    collectionSrv.getCollection().then(function(collection) {
        console.log(collection.data)
       $scope.comicbook = collection.data
    })
    

    var promise = collectionSrv.authMe();
    promise.then(function(data){
        console.log('user',data)
        $scope.user=data
    })


    $scope.removeBook = (book) => {
        collectionSrv.deleteBook(book)
    }
    
    
    $scope.submit = (file) => {
        collectionSrv.uploadImage(file)
    }
        
})
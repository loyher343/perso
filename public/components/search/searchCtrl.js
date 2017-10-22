 
angular.module('comicApp').controller('searchCtrl', function($scope, searchSrv, $http, $state ,$sce) {
    $scope.test = 'Tis better to vile than vile esteem'
   

    $scope.logout = () => {
        $http.get('/auth/logout').then(function(res){
            return $state.go('login')
        })
    }
    $scope.submit = function(searchBook) {
        console.log(searchBook)
        $scope.searchName = searchBook.name;
        $scope.searching = true;
        $scope.box = true
        console.log(':p',$scope.searchName)
        searchSrv.submit(searchBook)
            .then(function(data){
                console.log(data.data.number_of_total_results)
                $scope.searching = false
                $scope.results = data.data.number_of_total_results
                $scope.result = true
                const issueArr = []
                // console.log('Y0',data)
                // console.log(data.data)
                const book = data.data.results
                
                for(let i = 0; i< book.length; i++){
                    //console.log(book[i].resource_type)
                    const issue=book[i];
                    if(issue.resource_type==='issue'){
                        issueArr.push(book[i])
                    }
                }
                console.log(issueArr)
                

                


                $scope.comicbook = issueArr;
               
            })
    }


   
   


    $scope.undo = (book) => {
        console.log('removing:',book.id)
        searchSrv.removebook(book)
    }

    $scope.store = (book) => { 
        console.log(book)
        searchSrv.store(book)
        return  $scope.searchName = book.name

    }
   
    
    $scope.upload = (book) => {

        function getRandomIntInclusive(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
          }

        book.book_id = getRandomIntInclusive(1000000,10000000)
        console.log(book)
        searchSrv.upload(book)
    }

    $scope.showMe = function(){
        $scope.show=true;
    }
    $scope.hideMe = function(){
        $scope.show=false;
    }


            
    
})
    

$scope.hideMe = function(){
    console.log('hide the button');
    $scope.hide();
  }

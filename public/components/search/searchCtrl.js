 
angular.module('comicApp').controller('searchCtrl', function($scope, searchSrv, $http, $state ,$sce) {
    $scope.test = 'Tis better to vile than vile esteem'
   

    $scope.logout = () => {
        $http.get('/auth/logout').then(function(res){
            return $state.go('login')
        })
    }
    $scope.submit = function(searchBook) {
        console.log(searchBook)
        searchSrv.submit(searchBook)
            .then(function(data){
                const issueArr = []
                // console.log('Y0',data)
                // console.log(data.data)
                const book = data.data.results
                
                for(var i = 0; i< book.length; i++){
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


   
    $scope.pageChanged = (newPage) => {
        console.log(newPage)
    getResultsPage(newPage)

    }
    getResultsPage = (pageNumber) => {

        $scope.pagination = {
            current: 1
        };

       
       return $http({
           method: 'GET',
           url: 'https://api-comic-vine.herokuapp.com/search/?api_key=dbe5258aa34625d379e5b78516f7364665038eb9&format=json&limit=50&query=' + pageNumber.name + '&page=' + pageNumber.newPageNumber,
       }).then(function successCallback(data){
        const issueArr = []
        // console.log('Y0',data)
        // console.log(data.data)
        const book = data.data.results
        
        for(var i = 0; i< book.length; i++){
            //console.log(book[i].resource_type)
            const issue=book[i];
            if(issue.resource_type==='issue'){
                issueArr.push(book[i])
            }
        }
        console.log(issueArr)
           console.log('a',data.data)
        $scope.totalbooks = data.data.number_of_total_results
        $scope.booksPerPage = data.data.limit
        $scope.comicbook = issueArr
  

       })
    }



    $scope.undo = (book) => {
        console.log('removing:',book.id)
        searchSrv.removebook(book)
    }

    $scope.store = (book) => { 
        console.log(book)
        searchSrv.store(book)

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
    

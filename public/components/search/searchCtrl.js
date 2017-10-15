 
angular.module('comicApp').controller('searchCtrl', function($scope, searchSrv) {
    $scope.test = 'Tis better to vile than vile esteem'
   
    $scope.pageChanged = function(newPage) {
        getResultsPage(newPage);
    };
    
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
    $scope.store = (book) => { 
        console.log(book)
        searchSrv.store(book)



    }
        
    
})
    

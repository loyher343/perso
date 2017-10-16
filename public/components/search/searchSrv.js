angular.module('comicApp').service('searchSrv', function($http){

    const key = 'api_key=dbe5258aa34625d379e5b78516f7364665038eb9';
    const api = 'https://api-comic-vine.herokuapp.com/search/?api_key=dbe5258aa34625d379e5b78516f7364665038eb9&format=json&limit=50&query='
    
  
    this.submit = (searchBook) => {
        var url = api + 'name:' + searchBook.name + '&' + 'person_credits:' + searchBook.person_credits
        console.log(url)
        return $http({
            method: 'GET',
            url: api + searchBook.name ,
        }).then(function successCallback(response){
            
            return response
        })
    }

    this.store = (book) => {
        console.log(typeof(book))
        $http.post("/api/comicbooks", book)
    }
    this.removebook= (book) => {
        $http.delete('/api/comicbooks/' + book.id)
    }
})
angular.module('comicApp').service('collectionSrv', function($http) {

    this.authMe = () => { 
        return $http.get('/auth/me')
        .then(function(res){
        return res
        })
    }
    this.getCollection = () => {
        return $http.get('/api/comicbooks/:authid')
        .then( (collection) => {
            console.log(collection)
            return collection
        })
    }
    
    this.deleteBook = (book) => {
        console.log(book)
        $http.delete('/api/comicbooks/' + book.book_id)
    }
    // this.delmember = (dm) => {
    //     $http.delete('/api/member/' + dm);
    // };
})


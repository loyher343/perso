angular.module('comicApp').service('searchSrv', function($http){

    const key = 'api_key=dbe5258aa34625d379e5b78516f7364665038eb9';
    const api = 'https://api-comic-vine.herokuapp.com/search/?api_key=dbe5258aa34625d379e5b78516f7364665038eb9&format=json&limit=50&query='
    
  
    this.submit = (searchBook) => {
   // var url = api + 'name:' + searchBook.name + '&' + 'person_credits:' + searchBook.person_credits
        //console.log(url)
        return $http({
            method: 'GET',
            url: api + 'name:' + searchBook.name ,
        }).then(function successCallback(response){
            
            return response
        })
    }

    this.getResultsPage = (pageNumber) => {
        var url = api + 'name:' + pageNumber.name 
       return $http({
           method: 'GET',
           url: api + pageNumber.name + '&page=' + pageNumber.newPageNumber,
       }).then(function successCallback(response){
           console.log(response)
           return response
       })
    }
    this.upload = (book) => {
        const storageRef = firebase.storage().ref();
        const uploadTask = storageRef.child('images/' + book.image.name).put(book.image);

        //track progress
        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                        break;
                }
        }, function(error) {
    
        }, function() {
            let downloadURL = uploadTask.snapshot.downloadURL;
            let uploadParams = book
            console.log('up',uploadParams)
            console.log('imgUrl',downloadURL)
            book.image = downloadURL 
            console.log('postThis',uploadParams)

            return $http.post('/api/uploadComic', uploadParams);
            });
    
    
    }
    this.store = (book) => {
        console.log(typeof(book))
        $http.post("/api/comicbooks", book)
    }
    this.removebook= (book) => {
        $http.delete('/api/comicbooks/' + book.id)
    }
})
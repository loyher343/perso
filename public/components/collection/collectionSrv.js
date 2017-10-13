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


    this.uploadImage = (file) => {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child('images/' + file.name).put(file);
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
        let downloadURL = [uploadTask.snapshot.downloadURL];
        console.log(downloadURL)
        // return $http.post(`/api/image`, downloadURL);
        });

}

})


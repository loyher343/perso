angular.module('comicApp').controller('profileCtrl', function($scope, profileSrv){
    $scope.updateUser = (user) => {
        profileSrv.updateUser(user).then((res) => {
           console.log(res)
        })
    }

    profileSrv.userStuff().then((user) => {
        console.log('user:::::::',user.data.passport.user)
        const profile = user.data.passport.user
        $scope.email = profile.email
        $scope.userPic = profile.picture
        $scope.userName = profile.nickname
        
    })
})
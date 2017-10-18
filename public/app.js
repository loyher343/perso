angular.module('comicApp', ['ui.router','ngFileUpload','angularUtils.directives.dirPagination','ngSanitize'])
.config( function ($stateProvider, $urlRouterProvider, $sceDelegateProvider) {
    
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://api-comic-vine.herokuapp.com/**'
      ]);
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('login', {
            url: '/',
            templateUrl: './components/login/login.html',
            controller: 'loginCtrl',
            resolve: {
                user: loginSrv=> loginSrv.getUser()
                    .then(response => response.data)
                    .catch(err => err)
            } 
        })
        .state('search', {
            url: '/search',
            templateUrl: './components/search/search.html',
            controller: 'searchCtrl'
        })
        .state('collection', {
            url: '/collection',
            templateUrl: './components/collection/collection.html',
            controller: 'collectionCtrl'
            
        })
        .state('profile', {
            url: '/profile',
            templateUrl: "./components/profile/profile.html",
            controller: 'profileCtrl'
        })
        
})

angular.module('comicApp', ['ui.router'])
.config( function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('login', {
            url: '/',
            templateUrl: './components/login/login.html',
            controller: 'loginCtrl' 
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
        
})
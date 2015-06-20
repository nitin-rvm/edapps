var app = angular.module('edApps',[
     'ngRoute',
    'ngAnimate',
    'ngResource',
    'ui.bootstrap',
    'firebase',
    'toaster'     
	]).constant('FIREBASE_URL', 'https://edrivenlp.firebaseIO.com/')
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        //$locationProvider.html5Mode(true);
        $routeProvider.otherwise({
            templateUrl: 'templates/home.html',
            controller: 'HomeController'
        });
        $routeProvider.when('/page_new', {
            templateUrl: 'templates/page-new.html',
            controller: 'HomeController'
        }); 
         $routeProvider.when('/pages/:page/:page_id/edit', {
            templateUrl: 'templates/page-edit.html',
            controller: 'HomeController'
        });
         $routeProvider.when('/pages/:appName/delete', {
            templateUrl: 'templates/home.html',
            controller: 'HomeController'
        }); 
         $routeProvider.when('/pages/:page', {
            templateUrl: 'templates/page-show.html',
            controller: 'HomeController'
        });
    }]);

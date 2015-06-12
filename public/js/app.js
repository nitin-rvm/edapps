var app = angular.module('edApps',[
     'ngRoute',
    'ngAnimate',
    'ngResource',
    'ui.bootstrap',
    'firebase',
    'toaster'     
	]).constant('FIREBASE_URL', 'https://edapps.firebaseio.com/')
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        //$locationProvider.html5Mode(true);
        $routeProvider.otherwise({
            templateUrl: 'templates/home.html',
            controller: 'HomeController'
        });
        $routeProvider.when('/add_landingPage', {
            templateUrl: 'templates/addapp.html',
            controller: 'HomeController'
        }); 
         $routeProvider.when('/landing/:appName/:appID/edit', {
            templateUrl: 'templates/editapp.html',
            controller: 'HomeController'
        });
         $routeProvider.when('/landing/:appName/deleted', {
            templateUrl: 'templates/home.html',
            controller: 'HomeController'
        }); 
         $routeProvider.when('/landing/:appName', {
            templateUrl: 'templates/showapp.html',
            controller: 'HomeController'
        });
    }]);

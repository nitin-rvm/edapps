'use strict';

app.controller('HomeController', function ($scope, FIREBASE_URL, $firebase, toaster, $routeParams,$location) {
  var ref = new Firebase(FIREBASE_URL);
  var firebasePages = $firebase(ref.child('landing_pages'));
  $scope.page ={};
  
  if($routeParams.page){
    var pages = $firebase(ref.child('landing_pages').orderByChild("app_name").equalTo($routeParams.page)).$asArray();
    $scope.selectedPage = pages;
  }
  
  $scope.get_landing_pages = function(){
    var landing_pages = $firebase(ref.child('landing_pages'));
        landing_pages.$asArray().$loaded().then(function(data){
        $scope.pages = data;            
    });
  }
  
  $scope.add_page = function(app){
    if((!$scope.page.title) ||(!$scope.page.app_name) || (!$scope.page.google_link) || (!$scope.page.apple_link)||(!$scope.page.description)){
      return;
    }
    $scope.page.app_logo = $scope.image.resized.dataURL;
    firebasePages.$push($scope.page);
    toaster.pop('success', "Landing page has been successfully created");
    $location.path('home');
  }
  
  $scope.update_page = function(updatedApp){
    if((!$scope.selectedPage[0].title) ||(!$scope.selectedPage[0].app_name) || (!$scope.selectedPage[0].google_link) || (!$scope.selectedPage[0].apple_link)||(!$scope.selectedPage[0].description)){
      return;
    }
    var updateData = {
      app_name     : updatedApp.app_name,
      title        : updatedApp.title,
      apple_link   : updatedApp.apple_link,
      google_link  : updatedApp.google_link,
      app_logo     : $scope.image? $scope.image.resized.dataURL:updatedApp.app_logo,
      description  : updatedApp.description
    };
    $firebase(ref.child('landing_pages').child(updatedApp.$id)).$update(updateData);
    toaster.pop('success', "Update App Data successfully");	
    $location.path('home').replace();   
  }

  $scope.delete_page = function(id){
    var p = $firebase(ref.child('landing_pages').child(id));
    p.$remove();
    toaster.pop('success', "Page has been deleted successfully");
  }
});

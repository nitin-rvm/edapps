'use strict';

	app.controller('HomeController', function ($scope, FIREBASE_URL, $firebase, toaster, $routeParams) {
        var ref = new Firebase(FIREBASE_URL);
        var firebasePages = $firebase(ref.child('landing_pages'));
		$scope.addApp ={};
		//$scope.selectedLandingPage={};

		if($routeParams.appName){
			var appData = $firebase(ref.child('landing_pages').orderByChild("app_name").equalTo($routeParams.appName)).$asArray();		    
		      $scope.selectedLandingPage =appData; 
		      console.log($scope.selectedLandingPage);
		  
		}
		$scope.get_landing_pages = function(){
            var landing_pages = $firebase(ref.child('landing_pages'));
               landing_pages.$asArray().$loaded().then(function(data){
               $scope.pages = data;            
            });
           
        }
		$scope.add_app = function(app){
			if((!$scope.addApp.title) ||(!$scope.addApp.app_name) || (!$scope.addApp.google_link) || (!$scope.addApp.apple_link)||(!$scope.addApp.description)){
				return;
			}
			console.log($scope.addApp.title,$scope.addApp.app_name,$scope.addApp.google_link,$scope.addApp.apple_link,$scope.addApp.description);
            firebasePages.$push($scope.addApp);
			toaster.pop('success', "Thank You for Adding App.");
            //$location.path('/cleaner/'+authUser.uid+'/profile');
           
		}
		$scope.update_app = function(updatedApp){
			if((!$scope.selectedLandingPage[0].title) ||(!$scope.selectedLandingPage[0].app_name) || (!$scope.selectedLandingPage[0].google_link) || (!$scope.selectedLandingPage[0].apple_link)||(!$scope.selectedLandingPage[0].description)){
				return;
			}
			updateData = {
				app_name     : selectedLandingPage[0].app_name,
                title        : selectedLandingPage[0].title,
                apple_link   : selectedLandingPage[0].apple_link,
                google_link  : selectedLandingPage[0].google_link,
                app_logo     : $scope.image? $scope.image.resized.dataURL : $selectedLandingPage[0].app_logo,
                description  : selectedLandingPage[0].description
			};
			console.log(updateData);

	}
    });

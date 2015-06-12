'use strict';

	app.controller('HomeController', function ($scope, FIREBASE_URL, $firebase, toaster, $routeParams,$location) {
        var ref = new Firebase(FIREBASE_URL);
        var firebasePages = $firebase(ref.child('landing_pages'));
		$scope.addApp ={};
		     if($routeParams.appName && $routeParams.appID){
				 var appData = $firebase(ref.child('landing_pages').orderByChild("app_name").equalTo($routeParams.appName)).$asArray();
				 $scope.selectedLandingPage = appData;
		     }else if($routeParams.appName){	
		        var appData = $firebase(ref.child('landing_pages').orderByChild("app_name").equalTo($routeParams.appName)).$asArray();
				$scope.showLandingPage =appData;
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
			$scope.addApp.app_logo = $scope.image.resized.dataURL;
			firebasePages.$push($scope.addApp);
			toaster.pop('success', "Thank You for Adding App.");
            $location.path('#/home');           
		}
		$scope.update_app = function(updatedApp){
			if((!$scope.selectedLandingPage[0].title) ||(!$scope.selectedLandingPage[0].app_name) || (!$scope.selectedLandingPage[0].google_link) || (!$scope.selectedLandingPage[0].apple_link)||(!$scope.selectedLandingPage[0].description)){
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
			$location.path('#/home').replace();   
	}
	$scope.delete_landing_page = function(appId){
		if(confirm("Do You really Want to Delete App ?")){
		var p = getDataByID(appId);
                p.$remove();
                toaster.pop('success', "successfully Deleted App");
       }
    }
    function getDataByID(appID){
    	var app = $firebase(ref.child('landing_pages').child(appID));  
	    return app;
	}

    });

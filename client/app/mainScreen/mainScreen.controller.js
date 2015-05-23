'use strict';

angular.module('dexterhackHireMeApp')
  .controller('MainScreenCtrl', function ($scope, $location, $http) {
    $scope.message = 'Hello';
	$scope.enableLoginScreen = function() {
		$(".login").css("display","block");
	};
	$scope.navigateToProfile = function() {
		$http
		.get('api/userCredentials',{
    		params: { user_id: $scope.userName, password: $scope.userPassword, host:$scope.host }
		})
		.success(function(data, status, headers, config) {
			$location.url('/profile');
    		// this callback will be called asynchronously
    		// when the response is available
  		})
		.error(function(data, status, headers, config) {
    		// called asynchronously if an error occurs
    		// or server returns response with an error status.
  		});
	};
  });

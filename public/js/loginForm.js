
(function(){
	var loginForm = angular.module('loginForm', []);

	loginForm.directive('loginForm', function(){
		return {
			restrict: 'E',
			templateUrl: '/templates/login-form.html',
			controller: function($scope, $http){
				$scope.error = false;
				this.submit = function(){
					$scope.error = false;
					$http({
						method: 'POST',
						url: '/login',
						data: $.param({'username': $scope.username, 'password': $scope.password, 'json': 'true'}),
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}
					}).success(function (data){
						if (data.error === undefined) window.location = '/profile';
						$scope.error = data.error;
					});
				}
			},
			controllerAs: "form"
		};
	});

})();
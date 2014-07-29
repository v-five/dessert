(function(){
	var topMenu = angular.module('topMenu', ['modalDialog', 'loginForm']);

	topMenu.directive('topMenu', function(){
		return {
			restrict: 'E',
			templateUrl: '/templates/top-menu.html',
			controller: function($scope, $http){

				$http.get('/isLogged').success(function(data){
					$scope.user = {
						isLogged: data.isLogged
					};
				});
			},
			controllerAs: "menu"
		};
	});

})();
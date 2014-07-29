(function(){
	var leftMenu = angular.module('leftMenu', ['modalDialog']);

	leftMenu.directive('leftMenu', function(){
		return {
			restrict: 'E',
			templateUrl: '/templates/left-menu.html',
			controller: function($scope, $http){

			},
			controllerAs: "menu"
		};
	});

})();
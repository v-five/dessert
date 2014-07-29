
(function(){
	var workspace = angular.module('workspace', ['leftMenu', 'fileView']);

	workspace.directive('workspace', function(){
		return {
			restrict: 'E',
			templateUrl: '/templates/workspace.html',
			controller: function(){

			},
			controllerAs: "workspace"
		};
	});

})();

(function(){
	var modalDialog = angular.module('modalDialog', []);

	modalDialog.directive('modalDialog', function(){
		return {
			restrict: 'E',
			templateUrl: '/templates/modal-dialog.html',
			controller: function(){
				this.content = "";
			},
			controllerAs: "dialog"
		};
	});
})();

(function(){
	var fileView = angular.module('fileView', []);

	fileView.directive('fileView', function(){
		return {
			restrict: 'E',
			templateUrl: '/templates/file-view.html',
			controller: function($http, $scope, $location){

				var currentFile = new Object();
				$scope.files = [];

				var getFiles = function(owner, path){
					var fullPath = owner + path;
					$http({
						url: 'json/files/'+fullPath,
						method: "GET"
					}).success(function(data){
						currentFile = data;
						$scope.files = data.content;
						$scope.paths = getPaths(data.route, data.owner.username);
					});
				}

				var getPaths = function(route, owner){
					var parents = new Array();
					var parentsName = new Array();
					if(route == '/') parentsName.push('');
					else parentsName = route.split('/');
					parentsName.reverse();

					for(var i in parentsName){
						parents.push({name: parentsName[i], path: owner+route});
						route = route.replace("/"+parentsName[i], '')
					}
					parents.reverse();

					return parents;
				}

				$scope.newFolder = function(){
					var newFile = new Object();

					newFile.name = $scope.folderName;
					newFile.owner = currentFile.owner.username;
					newFile.parent = currentFile.route;
					newFile.type = 'dir';
					newFile.content = [];

					$('#newFolder').modal('hide');
					$('#newFolder input').val('');

					$http({
						url: 'json/files/create',
						method: "POST",
						data: newFile
					}).success(function(data){
						if(data) getFiles(currentFile.owner.username, currentFile.route);
					});

				}

				$scope.$on('$locationChangeStart', function(event) {
					var path = $location.path().replace('/files/', '');
					var t = path.split('/');
					var owner = t[0];
					var route = path.replace(owner, '');

					getFiles(owner, route);
				});
			},
			controllerAs: "fileView"
		};
	});

})();

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
						for(var i = 0; i < data.content.length; i++){
							if(data.content[i].type != 'dir'){
								var byteArray = new Uint8Array(data.content[i].binary);
								var file = new Blob([byteArray.buffer], {type: data.content[i].type});
								var URL = window.URL || window.webkitURL;
								data.content[i].downloadUrl = URL.createObjectURL(file);
								console.log(data.content[i]);
							}
						}
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
						route = route.split("/").slice(0, -1).join("/");
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
						method: "PUT",
						data: newFile
					}).success(function(res){
						if(res) getFiles(currentFile.owner.username, currentFile.route);
					});

				}

				$scope.uploadFile = function (input) {
					var file = input.files[0];
					var reader = new FileReader();

					reader.onload = function(e){
						var newFile = new Object();

						newFile.name = file.name;
						newFile.owner = currentFile.owner.username;
						newFile.parent = currentFile.route;
						newFile.type = file.type;
						newFile.binary = this.result;

						console.log(newFile)

						$http({
							url: 'json/files/create',
							method: "PUT",
							data: newFile
						}).success(function(res){
							if(res) getFiles(currentFile.owner.username, currentFile.route);
						});
					};
					reader.readAsText(file);
				}

				$scope.delete = function(){
					var id = this.file._id;
					$http({
						url: 'json/files/'+id,
						method: "DELETE"
					});

					var path = $location.path().replace('/files/', '');
					var t = path.split('/');
					var owner = t[0];
					var route = path.replace(owner, '');

					getFiles(owner, route);
				}

				$scope.rename = function(){
					var id = this.file._id;
					$http({
						url: 'json/files/'+id,
						method: "POST",
						data: {name: "test"}
					});

					var path = $location.path().replace('/files/', '');
					var t = path.split('/');
					var owner = t[0];
					var route = path.replace(owner, '');

					getFiles(owner, route);
				}

				$scope.$on('$locationChangeStart', function() {
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
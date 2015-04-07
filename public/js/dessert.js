(function(){
    var dessert = angular.module('dessert', ['topMenu', 'workspace', 'ng-context-menu'])
	    .config(function($compileProvider) {
		    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:image\//);
		    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/)
		});
})();
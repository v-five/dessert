(function(){
    var dessert = angular.module('dessert', ['topMenu', 'workspace', 'ng-context-menu'])
	    .config(function($compileProvider) {
		    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:image\//);
		    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/)
		});

		leftMenuToggle();
})();


function leftMenuToggle(){
	$(document).on('click','.toggle-side-menu', function(e){
		e.preventDefault();
		$('left-menu').toggleClass('show');
	}).on('click','left-menu a', function(){
		$(this).parents('left-menu').removeClass('show');
	})
}
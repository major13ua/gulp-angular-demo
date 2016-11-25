(function(){
	'use strict';
	var app = angular.module('todo');
	
	function categoryResource ($q){
	
		var categories = ['Pluralsight', 'Consulting', 'Scouts', 'Home'];

		function getCategories(){

			//return categories;
			return $q(function (fulfill, reject) {
				  fulfill(categories)
                });
		}
		
		return {
			//getCategories: getCategories
			//ES Style
            getCategories
		};
			
			
	}
	
	app.service('categoryResource', categoryResource)
}());
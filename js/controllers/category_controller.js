(function(){
	'use strict';
	var app = angular.module('todo');
	
	function categoryCtrl(categoryResource){
		var ctrl = this;

		ctrl.categories = categoryResource.getCategories();

		categoryResource.getCategories()
			.then(categories => ctrl.categories = categories,
				error => alert(error)

		);

		ctrl.newCategory = function(){
			if(ctrl.newCategoryName === ''){
				return;
			}
			
			ctrl.categories.push(ctrl.newCategoryName);
		
			ctrl.newCategoryName = '';
		};
	}
	
	app.controller('categoryCtrl', categoryCtrl);
	
}());
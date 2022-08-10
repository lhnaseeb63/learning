myApp.directive('fileModel', ['$parse', function($parse){
	return {
		restrict: 'A', //only an attribute
		link: function(scope, element, attrs){
			var model = $parse(attrs.fileModel); 
			var modelSetter = model.assign; 
			element.bind('change', function(){  
				scope.$apply(function(){
					modelSetter(scope, element[0].files[0]); 
				})
			})
		}
	}
}])

//look at attribute expression and find value of it
//in this case its file-model="customer.file"
//find the value of customer.file
//anytime the element (<input/>) changes
//update our scope with the selected file
myApp.directive('fileModel', ['$parse', function($parse){
	return {
		restrict: 'A', //only an attribute
		link: function(scope, element, attrs){
			var model = $parse(attrs.fileModel); //look at attribute expression and find value of it
												 //in this case its file-model="customer.file"
												 //find the value of customer.file
			var modelSetter = model.assign; //

			element.bind('change', function(){ //anytime the element (<input/>) changes 
				scope.$apply(function(){//update our scope with the selected file
					modelSetter(scope, element[0].files[0]); 
				})
			})
		}
	}
}])
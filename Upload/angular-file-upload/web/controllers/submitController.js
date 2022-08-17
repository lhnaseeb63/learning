myApp.controller('submitController', ['$scope', 'multipartForm', function($scope, multipartForm){
	$scope.customer = {};
	$scope.Submit = function(){
		var uploadUrl = '/upload';
		var dbUploadUrl = '/dbUpload';
		multipartForm.post(uploadUrl, $scope.customer);
	}
}]); 
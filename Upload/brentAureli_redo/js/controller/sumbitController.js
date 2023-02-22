myApp.controller('sumbitController', ['$scope', 'multipartForm', function($scope, multipartForm){
    $scope.customer = {};
    $scope.Submit = function(){
        var uploadURL = '/upload';
        multipartForm.post(uploadURL, $scope.customer);
    }
}])
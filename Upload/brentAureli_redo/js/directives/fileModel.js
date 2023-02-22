myApp.directive('fileModel', ['$parse', function($parse){
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            // watching input element for any kind of change
            // when a change happens, it's going to find that attr (customer.file) and change it on the context (scope)
            // $scope.customer.file
            // changing this value to the element[0].files[0]
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                })
            }) 
        }
    }
}])
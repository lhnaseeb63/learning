myApp.service('multipartForm',['$http', function($http){
    this.post = function(uploadURL, data){
        // basically a bunch of key/value pairs 
        var fd = new FormData();
        
        // can take the data object and convert to formdata
        for(var key in data){
            fd.append(key, data[key]);
        }
        // uploadURL, formdata we formatted, and the configuration
        $http.post(uploadURL, fd, {
            // angular tries to serialize when we post and we don't want that
            trasformRequest: angular.identity,
            // going to let the browser handle the data types
            headers:{ 'Content-Type': undefined }
        })
    }
}])
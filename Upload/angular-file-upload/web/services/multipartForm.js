myApp.service('multipartForm', ['$http', function($http){
	this.post = function(uploadUrl, data){
		var fd = new FormData();
		for(var key in data)
			fd.append(key, data[key]);
		$http.post(uploadUrl, fd, {
			transformRequest: angular.indentity,
			headers: { 'Content-Type': undefined }
		});
	}
}])

//uploadUrl --> where to upload our file
//FormData() --> a bunch of key value pairs
//can convert data object to FormData using the following:
		//take every element of 'customer' and put it into formdata as a key
		//take the value of every element in customer and save its a a value to that key
        //uploadUrl, formdata (fd), configuration
        //angular tries to serialize our data when we post and we dont want that in this case
        //let the browser handle the content-type
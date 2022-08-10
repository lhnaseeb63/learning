myApp.service('multipartForm', ['$http', function($http){
	//uploadUrl --> where to upload our file
	this.post = function(uploadUrl, data){
		//FormData() --> a bunch of key value pairs
		var fd = new FormData();
		//can convert data object to FormData using the following:
		//take every element of 'customer' and put it into formdata as a key
		//take the value of every element in customer and save its a a value to that key
		for(var key in data)
			fd.append(key, data[key]);
		//uploadUrl, formdata (fd), configuration
		$http.post(uploadUrl, fd, {
			//angular tries to serialize our data when we post and we dont want that in this case
			transformRequest: angular.indentity,
			//let the browser handle the content-type
			headers: { 'Content-Type': undefined }
		});
	}
}])
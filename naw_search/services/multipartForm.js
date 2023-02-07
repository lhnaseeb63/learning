app.service('multipartForm', [
  '$http',
  function ($http) {
    this.post = function (uploadUrl, files, corNum) {
      var fd = new FormData();
      fd.append('corNum', corNum);
      fd.append('fileCount', files.length);
      for (let i = 0; i < files.length; i++) {
        fd.append('file' + i, files[i]);
      }
      // fd.append('sampleFile', files);

      // for (var key in files) {
      //   fd.append(key, files[key]);
      //   console.log(
      //     'At Service: multipartForm.js: FormData key=',
      //     key,
      //     'files key:',
      //     files[key]
      //   );
      // }
      return $http.post(uploadUrl, fd, {
        transformRequest: angular.indentity,
        headers: { 'Content-Type': undefined }, //files,
      });
    };
  },
]);

//uploadUrl --> where to upload our file
//FormData() --> a bunch of key value pairs
//can convert data object to FormData using the following:
//take every element of 'customer' and put it into formdata as a key
//take the value of every element in customer and save its a a value to that key
//uploadUrl, formdata (fd), configuration
//angular tries to serialize our data when we post and we dont want that in this case
//let the browser handle the content-type

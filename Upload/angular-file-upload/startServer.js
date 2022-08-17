const express = require('express')
const app = express()
const port = 3000

var mysql = require("mysql2");
//var multer = require('multer');
const fileUpload = require('express-fileupload');

var pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "root",
  database: "naw_draft4",
});

app.use(express.static("web"));
app.use(fileUpload());
//app.use(multer({dest:__dirname+'/web/uploads/'}).any());

app.post('/upload', function(req, res){
  console.log(req.body);
  console.log(req.files);
  res.json({success: true});
});

app.post('/exUpload', function(req, res){
  console.log(req.body);
  console.log(req.files);
  res.json({success: true});
});

app.post('/dbUpload', function(req, res){
  console.log('req.body: ')
  console.log(req.body);
  console.log('req.files: ')
  console.log(req.files);
  console.log('Experiment to get to items in req.files: ')
  console.log(req.files[0].originalname);
  
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files[0];
  uploadPath = "uploads/" + sampleFile.originalname;//__dirname + '/somewhere/on/your/server/' + sampleFile.name;
  
  var headers = Object.keys(sampleFile);

  console.log('headers: ');
  console.log(headers);

  //let docVariables = [Buffer.from(req.files.sampleFile.data), 1, JSON.stringify(headers)];

    // pool.query("INSERT INTO Attachments(`content`, `corNum`,`headers`) values (BINARY(?),?,?)", 
    // docVariables,(err, rows, fields) => {
    //     let fileID = rows.insertId; 
    //     res.send(fileID + JSON.stringify(headers));


    // });
    
  

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
const express = require('express')
const app = express()
const port = 3000

var mysql = require("mysql2");
var multer = require('multer');

var pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "root",
  database: "naw_draft4",
});

app.use(express.static("web"));
app.use(multer({dest:__dirname+'/web/uploads/'}).any());

app.post('/upload', function(req, res){
  console.log(req.body);
  console.log(req.files);
  res.json({success: true});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
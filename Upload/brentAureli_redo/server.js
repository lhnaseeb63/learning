const express = require('express')
const app = express()
var port = process.env.PORT || 8080;

var bodyParser = require('body-parser');
// var http = require('http');
var multer = require('multer');

app.use(bodyParser.urlencoded({extended: false})); //if false then parse only strings
app.use(bodyParser.json());
// path to folder we will save our objects in
app.use(multer({dest: './uploads/'}));

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.post('/upload', (req,res)=>{
    console.log(req.body);
    console.log(req.files);
    res.json({
        success:true
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
// var express = require('express');
// var app = express();
// 

// var bodyParser = require('body-parser');
// var http = require('http');
// var multer = require('multer');

// // path to folder we will save our objects in
// app.use(multer({dest:'./uploads/'}));

// app.post('/upload', (req,res)=>{
//     console.log(req.body);
//     console.log(req.files);
//     res.json({
//         success:true
//     })
// })

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
//   });
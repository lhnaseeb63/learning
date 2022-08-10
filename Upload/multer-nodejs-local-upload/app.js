const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');

//Init app
const app = express();

//EJS
app.set('view engine', 'ejs');

//public folder
app.use(express.static('./public'));

const port = process.env.PORT || 3000;

app.get('/', (req, res)=> res.render('index'));



app.listen(port, ()=> console.log(`Server started on port ${port}`));
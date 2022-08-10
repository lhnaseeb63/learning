const express = require("express");
var expHbs = require("express-handlebars");
const fileUpload = require("express-fileupload");
const multer = require("multer");

const app = express();
const port = process.env.PORT || 5000;

//To upload a specific file to our server
const upload = multer({storage:multer.memoryStorage()});

// Database connection
var mysql = require("mysql2");

var pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "root",
  database: "userprofile",
});

// default option, uploading to temporary folder tmp
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// static files
app.use(express.static("public"));
app.use(express.static("tmp"));

//Template Engine, aka a nightmare
var handlebars = expHbs.create({
  defaultLayout: "main",
  extname: ".hbs",
  // helpers: handlebarsHelpers
});
app.engine(".hbs", handlebars.engine);
app.set("view engine", ".hbs");

//----------------------------------------------------------------------------Entry Points
pool.getConnection((err, connection) => {
  if (err) throw err; //not connected
  console.log("Connected to database.");
});

app.get("", (req, res) => {
  pool.query('SELECT * FROM userprofile WHERE id = "1"', (err, rows) => {
    if (!err) {
      res.render("index", { rows });
    }
    else {
        console.log(err);
    }
  });
});

app.post('', (req, res) => {
    let sampleFile;
    let uploadPath;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    // name of the input is sampleFile
    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/tmp/' + sampleFile.name;
  
    console.log(sampleFile);
  
    // Use mv() to place file on the server
    sampleFile.mv(uploadPath, function (err) {
      if (err) return res.status(500).send(err);
  
        pool.query('UPDATE userprofile SET profileImage = ? WHERE id ="1"', [sampleFile.name], (err, rows) => {
          if (!err) {
            res.redirect('/');
          } else {
            console.log(err);
          }
        });
      });
  });

app.listen(port, () => console.log(`Listening on port ${port}`));

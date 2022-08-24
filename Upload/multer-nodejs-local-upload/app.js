/**
 * This project goes over how to upload only images with max size 1MB to a folder using Multer.
 * I modified it so it can upload up to 3 files. It works, but it does not render the images.
 * I am not experienced enough with ejs to do that and for the moment I don't care to try.
 */
const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path'); //core nodejs module

// with multer need to create a storage engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(
      null,
      // defining the new name to have timestamp and filetype
      file.originalname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

// Init upload variable
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, //limiting filesize in bytes, 1MB is one million bytes
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).array('myImage', 3); //want array of files passed in at one field, max is 3 files

// Check File Type
function checkFileType(file, cb) {
  // Allowed extensions (only images)
  const filetypes = /jpeg|jpg|png|gif/;
  // check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // check mimetype
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only');
  }
}

// Init app
const app = express();

//EJS
app.set('view engine', 'ejs');

//public folder
app.use(express.static('./public'));

// -------------------------------------- ROUTES

app.get('/', (req, res) => res.render('index'));

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.render('index', {
        msg: err,
      });
    } else {
      // press submit but no file
      if (req.files == undefined) {
        res.render('index', {
          msg: 'Error: No File Selected!',
        });
      } else {
        // upload file
        res.render('index', {
          msg: 'File Uploaded!',
          file: `uploads/${req.files}`,
        });
      }
    }
  });
});

// -------------------------------------- START SERVER

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));

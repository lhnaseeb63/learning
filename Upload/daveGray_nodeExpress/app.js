const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

const filesPayloadExists = require('./middleware/filesPayloadExists');
const fileExtLimiter = require('./middleware/fileExtLimiter');
const fileSizeLimiter = require('./middleware/fileSizeLimiter');

const PORT = process.env.PORT || 3500;

const app = express();

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, "index.html"));
})

app.post('/upload',
    fileUpload({ createParentPath: true }),
    filesPayloadExists,
    fileExtLimiter(['.png', '.jpg', '.jpeg']),
    fileSizeLimiter,
    (req,res)=>{
        const files =  req.files;
        // nodejs console, not browser console 
        console.log(files);

        Object.keys(files).forEach(key => {
            const filepath = path.join(__dirname, 'files', files[key].name);
            files[key].mv(filepath, (err) => {
                if(err) return res.status(500).json({status:'error', message: err})
            })
        })

        // makes a string of all the filenames the we have successfully loaded
        return res.json({ status: 'success', message: Object.keys(files).toString() })
    }
)





app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
// recieve a parameter

const path = require('path');

const fileExtLimiter = (allowedExtArray) => {
    // called immediately when nodejs app loads
    return (req, res, next)=>{
        const files = req.files;

        const fileExtensions = [];
        Object.keys(files).forEach(key => {
            // get the extension from each file in file object
            // array of file extensions
            fileExtensions.push(path.extname(files[key].name))
        })

        // Are the file extensions allowed?
        const allowed = fileExtensions.every(ext => allowedExtArray.includes(ext))

        if(!allowed){
            const message = `Upload failed. Only ${allowedExtArray.toString()} files allowed.`.replaceAll(",", ", ");

            return res.status(422).json({ status: "error", message });
        }

        next()
    }
}

module.exports = fileExtLimiter;
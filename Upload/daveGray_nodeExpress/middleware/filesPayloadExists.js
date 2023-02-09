// abstracted code to allow for different routes intended to upload different file types

// See if we have supplied the files or not
 const filesPayloadExists = (req, res, next) => {
    if(!req.files) return res.status(400).json({ status: 'error', message: 'Missing Files' })

    next()
 }

 module.exports = filesPayloadExists;
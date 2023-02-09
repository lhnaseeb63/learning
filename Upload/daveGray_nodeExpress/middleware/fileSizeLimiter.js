// 5MB file size limit
const MB = 5;
const FILE_SIZE_LIMIT = MB * 1024 * 1024;

const fileSizeLimiter = (req, res, next)=> {
    const files = req.files;

    const filesOverLimit = []
    // determine which files are over the limit
    Object.keys(files).forEach(key=> {
        if(files[key].size > FILE_SIZE_LIMIT) {
            // Storing the name of the file that is over the limit
            filesOverLimit.push(files[key].name);
        }
    })
    if(filesOverLimit.length){
        // pasted his code to make properly formatted error message
        const properVerb = filesOverLimit.length > 1 ? 'are' : 'is';

        const sentence = `Upload failed. ${filesOverLimit.toString()} ${properVerb} over the file size limit of ${MB} MB.`.replaceAll(",", ", ");

        const message = filesOverLimit.length < 3
            ? sentence.replace(",", " and")
            : sentence.replace(/,(?=[^,]*$)/, " and");

        // returning the response that the file(s) is too big
        return res.status(413).json({ status: "error", message });
    }

    next()
}

module.exports = fileSizeLimiter;
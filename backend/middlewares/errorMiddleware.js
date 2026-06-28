
const errorHandler = (err, req, res, next) => {
    console.log('Error in the server : ' + err.stack);
    res.status(500).json({
        success: false,
        error: "Something went wrong on the server side.",
        message: err.message
    })
}
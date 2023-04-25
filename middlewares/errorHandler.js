const { CustomAPIError } = require('../errors/customAPIError.js')

const errorHandler = (error, req, res, next) => {
    console.error(error);
    if (error instanceof CustomAPIError) {
        return res.status(error.statusCode).json({ message: error.message, success: false })
    }
    // If not error in business logic return this as defaul:
    res.status(500).json({ message: 'ooops, something went wrong', error: error, success: false })

}

module.exports = errorHandler;
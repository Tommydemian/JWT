class CustomAPIError extends Error {
    constructor(statusCode, message){
        super(message) // Cree esta instance en el original obj Error.
        this.statusCode = statusCode
    }  
};

function createNewCustomAPIError(message, statusCode){
    return new CustomAPIError(message, statusCode)
};

module.exports = { CustomAPIError, createNewCustomAPIError }


// creas un obj: 
// error: { statusCode: statusCode, message: message } as CustomAPIError => Que extiende al original obj Error.

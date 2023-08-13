const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.status(statusCode).json({ title: "Validation Failed", "message": err.message, "stacktrace": err.stacktrace })
            break;

        case constants.NOT_FOUND:
            res.status(statusCode).json({ title: "Not Found", "message": err.message, "stacktrace": err.stacktrace })
            break;

        case constants.SERVER_ERROR:
            res.status(statusCode).json({ title: "Server Error", "message": err.message, "stacktrace": err.stacktrace })
            break;

        case constants.FORBIDDEN:
            res.status(statusCode).json({ title: "FORBIDDEN", "message": err.message, "stacktrace": err.stacktrace })
            break;

        case constants.UNAUTHORIZED:
            res.status(statusCode).json({ title: "UNAUTHORIZed", "message": err.message, "stacktrace": err.stacktrace })
            break;

        default:
            console.log("NO Errors ")
    }
}


module.exports = errorHandler;
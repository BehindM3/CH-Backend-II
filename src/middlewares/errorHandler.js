export const errorHandler = (error, req, res, next) => {
    const statusCode = error.statusCode ?? 500;
    res.status(statusCode).json({error : error.name, msg: error.message});
};
exports.errorHandler = (err, req, res, next) => {
    console.log(err);

    res.status(404).json({
        err,
    });
};

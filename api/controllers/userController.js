exports.getUser = (req, res) => {
    res.status(200).json({
        user: {
            username: 'drip',
        },
    });
};

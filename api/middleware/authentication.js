const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        console.log('Token :', req.headers.authorization);
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "secret-jwt-key");
        res.userToken = decoded;
        next();
    }
    catch (error) {
        console.log('Middleware authentication err: ', error);
        res.status(401).json({
            message: 'Unauthorized'
        });
    }
}
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    console.log(token);
    if (!token) return res.send('access denied');

    try {
        const decodedToken = jwt.verify(token, 'jwtPrivateKey');
        req.user = decodedToken;
        next();
    } catch (ex) {
        res.send('hatalı token');
    }
};

module.exports = auth;

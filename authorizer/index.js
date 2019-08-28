const jwt = require('jsonwebtoken');

const jwtSecrete = process.env.JWT_SECRET;
const cookieMaxAge = 60 * 60 * 24 * 14;

class Authorizer {
    initialize(req, res, next) {
        req.isAuthenticated = () => {
            if (req.decoded) return true;
            return false;
        }

        req.login = (id) => {
            const token = jwt.sign({ id }, jwtSecrete);
            res.cookie('token', token, { path: '/', httpOnly: true, maxAge: cookieMaxAge });
        }

        req.logout = () => {
            res.cookie('token', { path: '/', httpOnly: true, maxAge: 0 });
        }

        return next();
    }
}

module.exports = new Authorizer();
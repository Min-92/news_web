class Authorizer {
    initialize(req, res, next) {
        req.isAuthenticated = () => {
            if(req.decoded) return true;
            return false;
        } 
        return next();
    }
}

const authorizer = new Authorizer();
module.exports = authorizer;
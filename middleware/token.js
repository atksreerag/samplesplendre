const jwt = require("jsonwebtoken");
const config = require("../config.json");

module.exports = async(req, res, next) => {
    try {
        console.log('hited');
        //token
        const token = req.headers['x-auth-token'];

        if(!token) {

            const error = config.error;
            error.message = "No token provided !";

            return res.status(401).send(error);
        }

        const decoded = jwt.verify(token, "secret");

        if(!decoded) {
            const error = config.error;
            error.message = "Access denied, Invalid token provided";

            return res.status(401).send(error);
        }
        //console.log('requser',req.user);
        req.user = decoded;
        console.log('useris',req.user);
        next()

    } catch (e) {
        const error = config.error;
        
        return res.status(401).send(error);
    }
}
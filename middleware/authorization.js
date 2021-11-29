const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            throw "A token is required for authentication";
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;

        if (req.user.role !== "teacher") {
            throw "You're not authorized"
        }

        next();
    } catch (err) {
        return res.status(401).send(err);
    }
};

module.exports = verifyToken;
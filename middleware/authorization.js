const jwt = require("jsonwebtoken");

const verifyTeacher = (req, res, next) => {
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

const verifyStudent = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            throw "A token is required for authentication";
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;

        if (req.user.role !== "student") {
            throw "You're not authorized"
        }

        next();
    } catch (err) {
        return res.status(401).send(err);
    }
};


exports.verifyTeacher = verifyTeacher;
exports.verifyStudent = verifyStudent;
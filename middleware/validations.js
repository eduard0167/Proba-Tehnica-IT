const validateRegister = (body) => {
    try {
        const {email, password, confirmation_password, role} = body;

        if (!confirmation_password || password !== confirmation_password) {
            throw "Passwords are not the same!";
        }
        
        if (role === "teacher") {
            const regex = /^.*@onmicrosoft\.upb\.ro*$/;
            if (!regex.test(email)) {
                throw "Invalid email for this role!"
            }
        } else if (role === "student") {
            const regex = /^.*@stud\.upb\.ro*$/;
            if (!regex.test(email)) {
                throw "Invalid email for this role!"
            }
        } else {
            throw "Invalid role!"
        }

    } catch (err) {
        return err;
    }
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err);
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    })
  }

module.exports = validateRegister;
module.exports = authenticateToken;

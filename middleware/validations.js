const validateRegister = (body) => {
    try {
        const {email, password, confirmation_password, role} = body;

        if (!confirmation_password || password !== confirmation_password) {
            throw "Passwords are not the same!";
        }

        if (password.length < 8) {
            throw "Password should have at least 8 characters!";
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

module.exports = validateRegister;

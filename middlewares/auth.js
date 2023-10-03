const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    console.log(authHeader);
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({error: "unauthorized"});
    }

    const secret = process.env.SECRET_KEY;
    jwt.verify(token, secret, (err, user) => {
        if (err) {
            return res.status(403).json({error: "forbidden"})
        }
        req.user = user;
        next();
    })
}

module.exports = {
    auth
}
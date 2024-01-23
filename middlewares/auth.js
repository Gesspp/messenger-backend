const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
    const authHeader = req.headers["authorization"]; // получение заголоовка авторизации
    console.log(authHeader);
    const token = authHeader && authHeader.split(" ")[1]; // получеение токена

    if (!token) {  // проверка на отстутствие заголовка или токена
        return res.status(401).json({error: "unauthorized"});
    }

    const secret = process.env.SECRET_KEY; // получение ключа шифрования
    jwt.verify(token, secret, (err, user) => {  // расшифровка токена
        if (err) {
            return res.status(403).json({error: "forbidden"})
        }
        req.user = user; // добавление информации о пользователе в запрос 
        next(); // передача следующему обработчику
    })
}

module.exports = {
    auth
}
const jwt = require("jsonwebtoken");
let commonUtils = require("../utils/common");
const constant = require("../utils/constant");

module.exports = () => (req, res, next) => {
    try {
        const access_token = req.token || req.header('Access-Token') || req.headers.authorization;

        commonUtils.currentUser = jwt.verify(access_token, constant.SECRET_KEY);

        next();
    } catch (ex) {
        res.status(401).json({
            message: "Unauthorized"
        });
    }
}
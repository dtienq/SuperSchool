var express = require('express');
var router = express.Router();

const refreshTokenSchema = require('../schemas/refresh-token.json');
const userModel = require('../models/user.model');
const validation = require('../middlewares/validate.mdw');
const commonUtils = require('../utils/common');
const constant = require('../utils/constant');
const jwt = require('jsonwebtoken');


/**
 * @api {post} /api/users/refresh-token Refresh Token
 * @apiName Refresh Token
 * @apiGroup Users
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *         "refresh_token": "QhnibXASPJRiDt46hDBWQGljURlZnfgkTOV8U6FRCkVqo0P3Rwx4QBjl9DBFyqLYt41jEiKQWjhUCTFn0ESFu2HLGgiu8pAXolHvhCGihEdCBKne3rh4erT5vv3Kc3yjM4EvjQ4Czine7D15oKT5Qh4d5uKgTrHao3BlzceL7HuTL9WKcWMn9YR9OVDoyjGsRwvNXKqE85xaT4XMWtoIdyH2vGCWTiVVF5T4cV2N2Ju4l7bVNrgD5CyXBd4gUFl"
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxNCIsInVzZXJuYW1lIjoidGllbnFkIiwiZnVsbG5hbWUiOiJRdWFjaCBEaW5oIFRpZW4iLCJwaG9uZU51bWJlciI6bnVsbCwiZW1haWwiOm51bGwsImdyb3VwQ29kZSI6IlNUVURFTlQiLCJpYXQiOjE2MDk1MTYxNzV9.zLGJpdGPrGs6BbfL5r6G1OW3xVhrG-cdzZEeczx2hAI"
 *     }
 */
router.post('/refresh-token', validation(refreshTokenSchema), (req, res, next) => {
  let requestBody = req.body;

  userModel.findByIdAndRefreshToken(commonUtils.currentUser.userId, requestBody.refresh_token).then(data => {
    if(data) {
      const access_token = jwt.sign(commonUtils.parse2Plain(data), constant.SECRET_KEY);

      res.json({
        access_token: access_token
      });
    } else {
      throw "Refresh token fail";
    }
  }).catch(next);
});

module.exports = router;

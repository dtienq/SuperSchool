const userModel = require('../models/user.model');
var express = require('express');
var router = express.Router();
const validation = require('../middlewares/validate.mdw');
const loginSchema = require('../schemas/login.json');
const registerSchema = require('../schemas/register.json');
const jwt = require('jsonwebtoken');
const commonUtils = require('../utils/common');
const constant = require('../utils/constant');
const bcrypt = require('bcrypt');
const randomstring = require('randomstring');
const db = require('../utils/db');

/**
 * @api {post} /api/auth/login Đăng nhập
 * @apiName Đăng nhập
 * @apiGroup Users
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *         "username": "tienqd",    -- bắt buộc
 *         "password": "123456"     -- bắt buộc
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxNCIsInVzZXJuYW1lIjoidGllbnFkIiwiZnVsbG5hbWUiOiJRdWFjaCBEaW5oIFRpZW4iLCJwaG9uZU51bWJlciI6bnVsbCwiZW1haWwiOm51bGwsInJlZnJlc2hfdG9rZW4iOiJRaG5pYlhBU1BKUmlEdDQ2aERCV1FHbGpVUmxabmZna1RPVjhVNkZSQ2tWcW8wUDNSd3g0UUJqbDlEQkZ5cUxZdDQxakVpS1FXamhVQ1RGbjBFU0Z1MkhMR2dpdThwQVhvbEh2aENHaWhFZENCS25lM3JoNGVyVDV2djNLYzN5ak00RXZqUTRDemluZTdEMTVvS1Q1UWg0ZDV1S2dUckhhbzNCbHpjZUw3SHVUTDlXS2NXTW45WVI5T1ZEb3lqR3NSd3ZOWEtxRTg1eGFUNFhNV3RvSWR5SDJ2R0NXVGlWVkY1VDRjVjJOMkp1NGw3YlZOcmdENUN5WEJkNGdVRmwiLCJncm91cENvZGUiOiJTVFVERU5UIiwiaWF0IjoxNjA5NTEzMTA1fQ.URyTjNUu0fg54zXeXH9OENXVISmdTpmOfaihnBfN2x4",
 *         "refresh_token": "QhnibXASPJRiDt46hDBWQGljURlZnfgkTOV8U6FRCkVqo0P3Rwx4QBjl9DBFyqLYt41jEiKQWjhUCTFn0ESFu2HLGgiu8pAXolHvhCGihEdCBKne3rh4erT5vv3Kc3yjM4EvjQ4Czine7D15oKT5Qh4d5uKgTrHao3BlzceL7HuTL9WKcWMn9YR9OVDoyjGsRwvNXKqE85xaT4XMWtoIdyH2vGCWTiVVF5T4cV2N2Ju4l7bVNrgD5CyXBd4gUFl"
 *     }
 */
router.post('/login', validation(loginSchema), function (req, res, next) {
    let userInfo = req.body;

    userModel.getByUserName(userInfo.username).then(data => {
        if (data) {
            let isValid = bcrypt.compareSync(userInfo.password, data.password);
            //check password
            if (isValid) {
                data.password = undefined;
                const access_token = jwt.sign(commonUtils.parse2Plain(data), constant.SECRET_KEY);
                const refresh_token = data.refresh_token;

                res.status(200).json({
                    access_token: access_token,
                    refresh_token: refresh_token
                });
            } else {
                res.status(401).json({
                    message: 'Username or password are not correct'
                });
            }
        } else {
            res.status(401).json({
                message: 'Username or password are not correct'
            });
        }
    }).catch(next);
});

/**
 * @api {post} /api/auth/register Đăng ký
 * @apiName Đăng ký
 * @apiGroup Users
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *         "username": "tienqd",            --bắt buộc
 *         "password": "123456",            --bắt buộc
 *         "usergroupid": 2,                --bắt buộc
 *         "fullname": "Quach Dinh Tien"    --bắt buộc
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxNCIsInVzZXJuYW1lIjoidGllbnFkIiwiZnVsbG5hbWUiOiJRdWFjaCBEaW5oIFRpZW4iLCJwaG9uZU51bWJlciI6bnVsbCwiZW1haWwiOm51bGwsInJlZnJlc2hfdG9rZW4iOiJRaG5pYlhBU1BKUmlEdDQ2aERCV1FHbGpVUmxabmZna1RPVjhVNkZSQ2tWcW8wUDNSd3g0UUJqbDlEQkZ5cUxZdDQxakVpS1FXamhVQ1RGbjBFU0Z1MkhMR2dpdThwQVhvbEh2aENHaWhFZENCS25lM3JoNGVyVDV2djNLYzN5ak00RXZqUTRDemluZTdEMTVvS1Q1UWg0ZDV1S2dUckhhbzNCbHpjZUw3SHVUTDlXS2NXTW45WVI5T1ZEb3lqR3NSd3ZOWEtxRTg1eGFUNFhNV3RvSWR5SDJ2R0NXVGlWVkY1VDRjVjJOMkp1NGw3YlZOcmdENUN5WEJkNGdVRmwiLCJncm91cENvZGUiOiJTVFVERU5UIiwiaWF0IjoxNjA5NTEzMTA1fQ.URyTjNUu0fg54zXeXH9OENXVISmdTpmOfaihnBfN2x4",
 *         "refresh_token": "QhnibXASPJRiDt46hDBWQGljURlZnfgkTOV8U6FRCkVqo0P3Rwx4QBjl9DBFyqLYt41jEiKQWjhUCTFn0ESFu2HLGgiu8pAXolHvhCGihEdCBKne3rh4erT5vv3Kc3yjM4EvjQ4Czine7D15oKT5Qh4d5uKgTrHao3BlzceL7HuTL9WKcWMn9YR9OVDoyjGsRwvNXKqE85xaT4XMWtoIdyH2vGCWTiVVF5T4cV2N2Ju4l7bVNrgD5CyXBd4gUFl"
 *     }
 */
router.post('/register', validation(registerSchema), function (req, res, next) {
    let userInfo = req.body;

    userInfo.refresh_token = randomstring.generate({ length: 255 });
    userInfo.password = bcrypt.hashSync(userInfo.password, constant.SALT_ROUNDS);

    db.transaction(transaction => {
        userModel.create(transaction, userInfo).then(data => {
            let access_token = '';

            data.refresh_token = undefined;
            access_token = jwt.sign(commonUtils.parse2Plain(data), constant.SECRET_KEY);

            transaction.commit();
            res.json({
                refresh_token: userInfo.refresh_token,
                access_token: access_token
            });
        }).catch(err => {
            transaction.rollback();
            next(err);
        });
    });
});

module.exports = router;

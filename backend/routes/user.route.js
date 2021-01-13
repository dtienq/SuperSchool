var express = require('express');
var router = express.Router();

const refreshTokenSchema = require('../schemas/refresh-token.json');
const userModel = require('../models/user.model');
const validation = require('../middlewares/validate.mdw');
const roleValidation = require('../middlewares/validation.role');
const commonUtils = require('../utils/common');
const constant = require('../utils/constant');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const randomstring = require('randomstring');
const db = require('../utils/db');
const { transaction } = require('../utils/db');
const validateMdw = require('../middlewares/validate.mdw');

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

router.post('/updateInfo', validation(require('../schemas/updateInfo.json')), (req, res, next) => {
  let user = req.body;
  
  db.transaction(transaction => {
    if(user.userId != commonUtils.currentUser.userId) {
      res.status(403).json({
        message: 'You are not have permission to access this function'
      });
    }

    userModel.updateInfo(user, commonUtils.currentUser).then(result => {
      res.json({
        message: 'Success'
      });
      transaction.commit();
    }).catch(err => {
      next(err);
      transaction.rollback();
    });
  });
});

router.post('/changePassword', validation(require('../schemas/changePassword.json')), (req, res, next) => {
  let user = req.body;

  db.transaction(transaction => {
    if (true) {}
    userModel.findById(commonUtils.currentUser.userId).then(userFromDB => {
      let encryptedPassword = userFromDB.password;
  
      //kiểm tra nhập đúng password hay không
      let isValid = bcrypt.compareSync(user.oldPassword, encryptedPassword);
      if(!isValid) {
        res.status(500).json({
          message: 'Password incorrect'
        });
      } else {
        if(user.oldPassword == user.newPassword) {
          return res.status(500).json({
            message: 'New password must be different from old password'
          });
        }
  
        user.userId = commonUtils.currentUser.userId;
        user.password = bcrypt.hashSync(user.newPassword, constant.SALT_ROUNDS);
        user.refresh_token = randomstring.generate({ length: 255 });
        userModel.changePassword(user).then(_ => {
          transaction.commit();
          res.json({
            message: 'Success'
          });
        }).catch(err => {
          transaction.rollback();
          next(err);
        });
      }
    })
  });  
})

router.get('/search', roleValidation([constant.USER_GROUP.ADMIN]), function(req, res, next) {
  userModel.search(req.body).then(users => {
    res.json({
      data: users
    })
  }).catch(next);
});

router.get('/getTeacherInfo/:id', (req, res, next) => {
  userModel.getTeacherInfo(req.params.id).then(teacher => {
    res.json({
      data: teacher
    })
  }).catch(next);
});

router.post('/create', roleValidation([constant.USER_GROUP.ADMIN]), validation(require('../schemas/createUpdateUser.json')), (req, res, next) => {
  db.transaction(transaction => {
    //init data before insert
    let user = {}
    let requestBody = req.body;
    
    if(requestBody) {
      user.username = requestBody.username || '';
      user.password = bcrypt.hashSync(requestBody.password, constant.SALT_ROUNDS) || '';
      user.fullname = requestBody.fullname || '';
      user.phonenumber = requestBody.phonenumber || '';
      user.email = requestBody.email || '';
      user.refresh_token = randomstring.generate({ length: 255 });
      user.usergroupid = requestBody.userGroupId;
    }

    userModel.create(transaction, user).then(_ => {
      transaction.commit();
      res.json({
        data: 'Success'
      });
    }).catch(err => {
      transaction.rollback();
      next(err);
    });
  });
});

module.exports = router;

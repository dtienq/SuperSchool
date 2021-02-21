var express = require("express");
var router = express.Router();

const userModel = require("../models/user.model");
const validation = require("../middlewares/validate.mdw");
const roleValidation = require("../middlewares/validation.role");
const commonUtils = require("../utils/common");
const constant = require("../utils/constant");
const bcrypt = require("bcrypt");
const randomstring = require("randomstring");
const db = require("../utils/db");

router.post(
  "/updateInfo",
  validation(require("../schemas/updateInfo.json")),
  (req, res, next) => {
    let user = req.body;

    db.transaction((transaction) => {
      if (user.userId != commonUtils.currentUser.userId) {
        res.status(403).json({
          message: "You are not have permission to access this function",
        });
      }

      userModel
        .updateInfo(user, commonUtils.currentUser)
        .then((result) => {
          res.json({
            message: "Success",
          });
          transaction.commit();
        })
        .catch((err) => {
          next(err);
          transaction.rollback();
        });
    });
  }
);

router.post(
  "/changePassword",
  validation(require("../schemas/changePassword.json")),
  (req, res, next) => {
    let user = req.body;

    db.transaction((transaction) => {
      if (true) {
      }
      userModel.findById(commonUtils.currentUser.userId).then((userFromDB) => {
        let encryptedPassword = userFromDB.password;

        //kiểm tra nhập đúng password hay không
        let isValid = bcrypt.compareSync(user.oldPassword, encryptedPassword);
        if (!isValid) {
          res.status(500).json({
            message: "Password incorrect",
          });
        } else {
          if (user.oldPassword == user.newPassword) {
            return res.status(500).json({
              message: "New password must be different from old password",
            });
          }

          user.userId = commonUtils.currentUser.userId;
          user.password = bcrypt.hashSync(
            user.newPassword,
            constant.SALT_ROUNDS
          );
          user.refresh_token = randomstring.generate({ length: 255 });
          userModel
            .changePassword(user)
            .then((_) => {
              transaction.commit();
              res.json({
                message: "Success",
              });
            })
            .catch((err) => {
              transaction.rollback();
              next(err);
            });
        }
      });
    });
  }
);

router.get(
  "/search",
  roleValidation([constant.USER_GROUP.ADMIN]),
  function (req, res, next) {
    userModel
      .search(req.body)
      .then((users) => {
        res.json({
          data: users,
        });
      })
      .catch(next);
  }
);

router.get("/getTeacherInfo/:id", (req, res, next) => {
  userModel
    .getTeacherInfo(req.params.id)
    .then((teacher) => {
      res.json({
        data: teacher,
      });
    })
    .catch(next);
});

router.post(
  "/create",
  roleValidation([constant.USER_GROUP.ADMIN]),
  validation(require("../schemas/createUpdateUser.json")),
  (req, res, next) => {
    db.transaction((transaction) => {
      //init data before insert
      let user = {};
      let requestBody = req.body;

      if (requestBody) {
        user.username = requestBody.username || "";
        user.password =
          bcrypt.hashSync(requestBody.password, constant.SALT_ROUNDS) || "";
        user.fullname = requestBody.fullname || "";
        user.phonenumber = requestBody.phonenumber || "";
        user.email = requestBody.email || "";
        user.refresh_token = randomstring.generate({ length: 255 });
        user.usergroupid = requestBody.userGroupId;
      }

      userModel
        .create(transaction, user)
        .then((_) => {
          transaction.commit();
          res.json({
            data: "Success",
          });
        })
        .catch((err) => {
          transaction.rollback();
          next(err);
        });
    });
  }
);

module.exports = router;

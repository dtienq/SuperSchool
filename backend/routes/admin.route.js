const userModel = require('../models/user.model');
const courseModel = require('../models/course.model');
const constant = require('../utils/constant');
const mailService = require('../utils/mailService');
const bcrypt = require('bcrypt');
const randomString = require('randomstring');
var express = require('express');
const categoryModel = require('../models/category.model');
// const courseModel = require("../models/course.model");
const loginValidation = require('../middlewares/validation.login');
var router = express.Router();
<<<<<<< HEAD
router.get('/listuser', (req, res, next) => {
  let queryParams = req.query;
  let body = req.body;
  let page = body.page;
  let pageSize = body.pageSize;
=======
const validation = require("../middlewares/validate.mdw");

router.get("/listuser", loginValidation(['ADMIN']), (req, res, next) => {
>>>>>>> release/tienqd
  userModel
    .findAll()
    .then((data) => {
      res.json({
        data,
      });
    })
    .catch(next);
});

//Student = 2; Teacher = 3 && Admin = 1
<<<<<<< HEAD
router.get('/getuserbygroupid/:groupId', (req, res, next) => {
=======
router.get("/getuserbygroupid/:groupId", loginValidation(['ADMIN']), (req, res, next) => {
>>>>>>> release/tienqd
  const { groupId } = req.params;
  userModel
    .getUserbyGroupId(groupId)
    .then((data) => {
      res.json({
        data,
      });
    })
    .catch(next);
});

<<<<<<< HEAD
router.post('/togglestatus', (req, res, next) => {
=======
router.post("/togglestatus", loginValidation(['ADMIN']), validation(require('../schemas/togglestatus.json')), (req, res, next) => {
>>>>>>> release/tienqd
  const { userId, status } = req.body;
  userModel
    .toggleStatus(userId, status)
    .then((data) => {
      res.json({
        data,
      });
    })
    .catch(next);
});

<<<<<<< HEAD
router.post('/createteacher', (req, res, next) => {
=======
router.post("/createteacher", loginValidation(['ADMIN']), validation(require('../schemas/createteacher.json')), (req, res, next) => {
>>>>>>> release/tienqd
  const { fullname, email, picture, usergroupid } = req.body;
  const raw_password = randomString.generate({ length: 6 });
  const password = bcrypt.hashSync(raw_password, constant.SALT_ROUNDS);
  const refresh_token = randomString.generate({ length: 255 });
  userModel
    .addAccount(fullname, email, usergroupid, picture || null, password, refresh_token)
    .then((data) => {
      const dataToSend = {
        to: email,
        subject: 'SuperSchool - Thông tin đăng nhập',
        html: `<div>Email: ${email}</div>
                <div>Mật khẩu:${raw_password}</div>`,
      };
      const sendMail = mailService
        .sendMail(dataToSend)
        .then((sendMail) => {
          if (sendMail)
            res.json({
              data,
            });
        });
    })
    .catch(next);
});

<<<<<<< HEAD
router.get('/deleteteacher/:userId', (req, res, next) => {
=======
router.get("/deleteteacher/:userId", loginValidation(['ADMIN']), (req, res, next) => {
>>>>>>> release/tienqd
  const { userId } = req.params;
  userModel
    .removeTeacher(userId)
    .then((data) => {
      res.json({
        data,
      });
    })
    .catch(next);
});

//without tree
<<<<<<< HEAD
router.get('/getallcourse', (req, res, next) => {
=======
router.get("/getallcourse", loginValidation(['ADMIN']), (req, res, next) => {
>>>>>>> release/tienqd
  categoryModel
    .getParentCategory()
    .then((data) => {
      res.json({
        data,
      });
    })
    .catch(next);
});

//with tree.
<<<<<<< HEAD
router.get('/getcourse', (req, res, next) => {
=======
router.get("/getcourse", loginValidation(['ADMIN']), (req, res, next) => {
>>>>>>> release/tienqd
  categoryModel
    .getListCategory(null)
    .then((data) => {
      if (data)
        res.json({
          data: customizeListCategory(data),
        });
      //   } else {
      //     throw "Refresh token fail";
      //   }
    })
    .catch(next);
});

function customizeListCategory(categoryList) {
  //get parent category
  let parentCategories = categoryList.filter(
    (category) => category.parentId == null
  );
  let children = categoryList.filter((category) => category.parentId != null);
  parentCategories.forEach((parent) => {
    parent.children = children.filter(
      (category) => category.parentId == parent.categoryId
    );
  });
  return parentCategories;
}

<<<<<<< HEAD
router.get('/view/courses/', (req, res, next) => {
=======
router.get("/view/courses/", loginValidation(['ADMIN']), (req, res, next) => {
>>>>>>> release/tienqd
  courseModel
    .viewForAdmin()
    .then((data) => res.json({ data: data }))
    .catch(next);
});

router.get('/view/teachercourses/:id', (req, res, next) => {
  if (!req.params.id) return res.json({ err: 'Không tìm thấy kết quả' });
  courseModel
    .viewForTeacher(req.params.id)
    .then((data) => res.json({ data: data }))
    .catch(next);
});

module.exports = router;

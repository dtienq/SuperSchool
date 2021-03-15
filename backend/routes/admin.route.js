const userModel = require('../models/user.model');
const courseModel = require('../models/course.model');
const randomString = require('randomstring');
var express = require('express');
// const courseModel = require("../models/course.model");
var router = express.Router();
router.get('/listuser', (req, res, next) => {
  let queryParams = req.query;
  let body = req.body;
  let page = body.page;
  let pageSize = body.pageSize;
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
router.get('/getuserbygroupid/:groupId', (req, res, next) => {
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

router.post('/togglestatus', (req, res, next) => {
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

router.post('/createteacher', (req, res, next) => {
  const { fullname, email, picture } = req.body;
  const password = randomString.generate({ length: 6 });
  const refresh_token = randomString.generate({ length: 255 });
  userModel
    .addTeacher(fullname, email, picture, password, refresh_token)
    .then((data) => {
      res.json({
        data,
      });
    })
    .catch(next);
});

router.get('/deleteteacher/:userId', (req, res, next) => {
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

router.get('/view/courses/', (req, res, next) => {
  courseModel
    .viewForAdmin()
    .then((data) => res.json({ data: data }))
    .catch(next);
});

module.exports = router;

var express = require('express');
const validation = require('../middlewares/validate.mdw');
const roleValidation = require('../middlewares/validation.role');
var router = express.Router();
var rn = require('random-number');
const fs = require('fs');
const path = require('path');
const courseModel = require('../models/course.model');
const constant = require('../utils/constant');
const db = require('../utils/db');

/**
 * @api {get} /api/course/findByCategoryId Get course by categoryId
 * @apiName Get course by categoryId
 * @apiGroup Courses
 *
 * @apiParam {Number} categoryId Id của category khóa học.(Bắt buộc)
 * 
 * @apiParamExample {json} Request-Example:
 *     {
 *         "page": 1, 
 *         "pageSize": 10
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "data": [
 *             {
 *                 "courseid": "4",
 *                 "title": "Lập trình C++ ",
 *                 "imagePath": null,
 *                 "description": null,
 *                 "detailDescription": null,
 *                 "views": "0",
 *                 "createddate": "2021-01-02T17:00:00.000Z",
 *                 "price": "1500000.00",
 *                 "categoryid": "2",
 *                 "teacherid": "1"
 *             }
 *         ]
 *     }
 */
router.get('/findByCategoryId', validation(require('../schemas/pagination.json')), (req, res, next) => {
  let queryParams = req.query;
  let body = req.body;
  let page = body.page;
  let pageSize = body.pageSize;

  courseModel.findByCategoryId(queryParams.categoryId, page, pageSize).then(data => {
    res.json({
      data: data
    })
  }).catch(next);
});

/**
 * API get 3-4 khóa học nổi bật trong tuần qua
 */

/**
 * @api {get} /api/course/views/top Top views
 * @apiName Top views
 * @apiGroup Courses
 *
 * @apiParam {Number} quantity Số lượng khóa học có lượt view cao nhất (bắt buộc)
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "data": [
 *             {
 *                 "courseid": "5",
 *                 "title": "Hướng đối tượng với C++",
 *                 "imagePath": null,
 *                 "description": null,
 *                 "detailDescription": null,
 *                 "views": "4",
 *                 "createddate": "2021-01-02T17:00:00.000Z",
 *                 "price": "500000.00",
 *                 "categoryid": "2",
 *                 "teacherid": "1"
 *             }
 *         ]
 *     }
 */
router.get('/views/top', function (req, res, next) {
  var quantity = req.query.quantity;

  courseModel.topView(quantity).then(courses => {
    res.json({
      data: courses
    });
  }).catch(next);
})

/**
 * @api {get} /api/course/register/top Top registration
 * @apiName Top registration
 * @apiGroup Courses
 *
 * @apiParam {Number} quantity Số lượng khóa học có lượt đăng ký cao nhất (bắt buộc)
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "data": [
 *             {
 *                 "courseid": "5",
 *                 "title": "Hướng đối tượng với C++",
 *                 "imagePath": null,
 *                 "description": null,
 *                 "detailDescription": null,
 *                 "views": "4",
 *                 "createddate": "2021-01-02T17:00:00.000Z",
 *                 "price": "500000.00",
 *                 "categoryid": "2",
 *                 "teacherid": "1",
 *                 "countQuantityRegister": "2"
 *             }
 *         ]
 *     }
 */
router.get('/register/top', function (req, res, next) {
  var quantity = req.query.quantity;

  courseModel.topRegister(quantity).then(courses => {
    res.json({
      data: courses
    });
  }).catch(next);
})

/**
 * @api {get} /api/course/search Search courses
 * @apiName Search courses
 * @apiGroup Courses
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *         "pageSize": 10,
 *         "page": 1,
 *         "searchString": "",
 *         "categoryId": 2
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "data": [
 *             {
 *                 "courseid": "4",
 *                 "title": "Lập trình C++ ",
 *                 "imagePath": null,
 *                 "description": null,
 *                 "detailDescription": null,
 *                 "views": "0",
 *                 "createddate": "2021-01-02T17:00:00.000Z",
 *                 "price": "1500000.00",
 *                 "categoryid": "2",
 *                 "teacherid": "1"
 *             }
 *         ]
 *     }
 */
router.post('/search', function (req, res, next) {
  let searchString = "";
  let categoryId = null;
  let page = 1;
  let pageSize = 10;

  if (req.body) {
    searchString = req.body.searchString || "";
    categoryId = req.body.categoryId;
    page = req.body.page || 1;
    pageSize = req.body.pageSize || 10;
  }

  courseModel.searchCourse(searchString, categoryId, page, pageSize).then(courses => {
    res.json({
      data: courses
    })
  }).catch(next);
});

router.post('/create', roleValidation([constant.USER_GROUP.ADMIN, constant.USER_GROUP.TEACHER]), validation(require('../schemas/createUpdateCourse.json')), (req, res, next) => {
  db.transaction(transaction => {
    //init data before insert
    let course = {}
    let requestBody = req.body;
    let now = new Date();
    let publicPath = path.dirname(require.main.filename) + '/public/';

    if (requestBody) {
      course.title = requestBody.title || '';
      course.description = requestBody.description || '';
      course.detailDescription = requestBody.detailDescription || '';
      course.views = 0;
      course.createddate = now;
      course.price = requestBody.price || 0;
      course.categoryid = requestBody.categoryId;
      course.teacherid = requestBody.teacherId;

      if (requestBody.image && requestBody.image.fileName) {
        let fileName = publicPath + now.getTime() + '_' + requestBody.image.fileName;
        fs.writeFile(fileName, requestBody.image.data, "binary", function (err) {
          if (err) {
            res.status(500).json({
              message: CONSTANT.ERRORS.SYSTEM_ERROR
            })
          }
        });
        course.imagePath = fileName;
      }

      if(requestBody.videos) {
        var videos = [];
        requestBody.videos.forEach(element => {
          var video = {};
          if(element.data) {
            video.fileName = publicPath + now.getTime() + '_' + element.fileName;
            fs.writeFile(video.fileName, element.data, "binary", function (err) {
              if (err) {
                res.status(500).json({
                  message: CONSTANT.ERRORS.SYSTEM_ERROR
                })
              }
            });
            videos.push(element);
          }
        });
        course.videos = videos;
      }
    }

    courseModel.create(transaction, course).then(_ => {
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

router.put('/update', roleValidation([constant.USER_GROUP.ADMIN, constant.USER_GROUP.TEACHER]), validation(require('../schemas/createUpdateCourse.json')), (req, res, next) => {
  db.transaction(transaction => {
    //init data before update
    let course = {}
    let requestBody = req.body;
    let now = new Date();

    if (requestBody) {
      course.title = requestBody.title || '';
      course.imagePath = requestBody.imagePath || '';
      course.description = requestBody.description || '';
      course.detailDescription = requestBody.detailDescription || '';
      course.updateddate = now;
      course.price = requestBody.price || 0;
      course.categoryid = requestBody.categoryId;
      course.teacherid = requestBody.teacherId;
    }

    courseModel.update(transaction, course).then(_ => {
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

router.delete('/delete/:id', roleValidation([constant.USER_GROUP.ADMIN, constant.USER_GROUP.TEACHER]), (req, res, next) => {
  db.transaction(transaction => {
    courseModel.delete(transaction, req.params.id).then(_ => {
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

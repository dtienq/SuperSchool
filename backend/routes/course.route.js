var express = require('express');
const validation = require('../middlewares/validate.mdw');
const roleValidation = require('../middlewares/validation.role');
const formValidation = require('../middlewares/validate.mdw');
var router = express.Router();
var rn = require('random-number');
const fs = require('fs');
const path = require('path');
const courseModel = require('../models/course.model');
const constant = require('../utils/constant');
const db = require('../utils/db');

/**
 * @api {get} /api/course/top10View Top 10 khóa học được xem nhiều nhất
 * @apiName Top 10 khóa học được xem nhiều nhất
 * @apiGroup Courses
 *
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *        "data": [
 *            {
 *                "courseid": "3",
 *                "title": "Lập trình Java căn bản",
 *                "imagePath": null,
 *                "description": "",
 *                "detailDescription": "",
 *                "views": "0",
 *                "createddate": "2021-01-09T09:22:06.842Z",
 *                "updateddate": null,
 *                "price": "1200000.00",
 *                "categoryid": "6",
 *                "teacherid": "4",
 *                "status": "INCOMPLETE"
 *            }
 *        ]
 *    }
 */
router.get('/top10View', (req, res, next) => {
  courseModel.getTopByColumnName(10, 'views', 'desc').then(courses => {
    res.json({
      data: courses
    })
  });
});

/**
 * @api {get} /api/course/top10Newest Top 10 khóa học mới nhất
 * @apiName Top 10 khóa học mới nhất
 * @apiGroup Courses
 *
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *        "data": [
 *            {
 *                "courseid": "3",
 *                "title": "Lập trình Java căn bản",
 *                "imagePath": null,
 *                "description": "",
 *                "detailDescription": "",
 *                "views": "0",
 *                "createddate": "2021-01-09T09:22:06.842Z",
 *                "updateddate": null,
 *                "price": "1200000.00",
 *                "categoryid": "6",
 *                "teacherid": "4",
 *                "status": "INCOMPLETE"
 *            }
 *        ]
 *    }
 */
router.get('/top10Newest', (req, res, next) => {
  courseModel.getTopByColumnName(10, 'createddate', 'desc').then(courses => {
    res.json({
      data: courses
    })
  });
});


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
  var categoryId = req.query.categoryId;

  courseModel.topRegister(quantity, categoryId).then(courses => {
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
  let page;
  let pageSize;

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

/**
 * @api {get} /api/course/findById/:id Find course by id
 * @apiName Find course by id
 * @apiGroup Courses
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "data": {
 *             "courseid": "3",
 *             "title": "Lập trình Java căn bản",
 *             "imagePath": null,
 *             "description": "",
 *             "detailDescription": "",
 *             "views": "0",
 *             "createddate": "2021-01-09T09:22:06.842Z",
 *             "updateddate": null,
 *             "price": "1200000.00",
 *             "categoryid": "6",
 *             "teacherid": "4",
 *             "status": "INCOMPLETE"
 *         }
 *     }
 */
router.get('/findById/:id', (req, res, next) => {
  courseModel.findById(req.params.id).then(course => {
    if(!course.courseid) {
      throw "Not found";
    } else {
      res.json({
        data: course
      });
    }
  }).catch(next);
});

/**
 * @api {get} /api/course/create Create a course
 * @apiName Create a course
 * @apiGroup Courses
 * 
 * @apiParams
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "data": {
 *             "courseid": "3",
 *             "title": "Lập trình Java căn bản",
 *             "imagePath": null,
 *             "description": "",
 *             "detailDescription": "",
 *             "views": "0",
 *             "createddate": "2021-01-09T09:22:06.842Z",
 *             "updateddate": null,
 *             "price": "1200000.00",
 *             "categoryid": "6",
 *             "teacherid": "4",
 *             "status": "INCOMPLETE"
 *         }
 *     }
 */
router.post('/create', roleValidation([constant.USER_GROUP.ADMIN, constant.USER_GROUP.TEACHER]), validation(require('../schemas/createUpdateCourse.json')), (req, res, next) => {
  db.transaction(transaction => {
    //init data before insert
    let course = {}
    let requestBody = req.body;
    let now = new Date();
    let publicPath = path.dirname(require.main.filename) + '/public/';
    var videos = [];

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
            transaction.rollback();
            res.status(500).json({
              message: CONSTANT.ERRORS.SYSTEM_ERROR
            })
          }
        });
        course.imagePath = fileName;
      }

      if (requestBody.videos) {
        requestBody.videos.forEach(element => {
          var video = {};
          if (element.data) {
            video.fileName = now.getTime() + '_' + element.fileName;

            fs.writeFile(publicPath + video.fileName, element.data, "binary", function (err) {
              if (err) {
                transaction.rollback();
                res.status(500).json({
                  message: CONSTANT.ERRORS.SYSTEM_ERROR
                })
              }
            });

            videos.push(video);
          }
        });
      }
    }

    courseModel.create(transaction, course, videos).then(_ => {
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

router.get('/findByTeacherId', formValidation(require('../schemas/pagination.json')), (req, res, next) => {
  let teacherId = req.body.teacherId;
  let page;
  let pageSize;

  if (req.body) {
    page = req.body.page || 1;
    pageSize = req.body.pageSize || 10;
  }

  courseModel.findByTeacherId(teacherId, page, pageSize).then(courses => {
    res.json({
      data: courses
    });
  }).catch(next);
});

module.exports = router;

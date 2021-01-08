var express = require('express');
const validation = require('../middlewares/validate.mdw');
var router = express.Router();
var rn = require('random-number');

const courseModel = require('../models/course.model');

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
router.get('/views/top', function(req, res, next) {
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
router.get('/register/top', function(req, res, next) {
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
router.post('/search', function(req, res, next) {
  let searchString = "";
  let categoryId = null;
  let page = 1;
  let pageSize = 10;

  console.info("Random Number", randomNum);

  if(req.body) {
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

module.exports = router;

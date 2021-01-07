var express = require('express');
const validation = require('../middlewares/validate.mdw');
var router = express.Router();

const courseModel = require('../models/course.model');

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

module.exports = router;

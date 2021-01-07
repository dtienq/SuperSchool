var express = require('express');
var router = express.Router();

const categoryModel = require('../models/category.model');

/**
 * @api {get} /api/category/getByParentId Get Category by parentId
 * @apiName Get Category by parentId
 * @apiGroup Category
 *
 * @apiParam {Number} parentId parentId = null nếu như là category cấp 1
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "data": [
 *             {
 *                 "categoryid": "1",
 *                 "name": "Lập trình",
 *                 "code": "CODE",
 *                 "parentid": null
 *             }
 *         ]
 *     }
 */
router.get('/getByParentId', (req, res, next) => {
  let queryParams = req.query;

  categoryModel.findByParentId(queryParams.parentId).then(data => {
    if(data) {
      res.json({
          data: data
      })
    } else {
      throw "Refresh token fail";
    }
  }).catch(next);
});

/**
 * @api {get} /api/category/register/top Top course register
 * @apiName Top course register
 * @apiGroup Category
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "data": [
 *             {
 *                 "categoryid": "2",
 *                 "name": "C++",
 *                 "code": "C++",
 *                 "parentid": "1",
 *                 "count": "2"
 *             }
 *         ]
 *     }
 */
router.get('/register/top', function(req, res, next) {
  categoryModel.getTopRegister().then(categories => {
    res.json({
      data: categories
    });
  }).catch(next);
})

module.exports = router;

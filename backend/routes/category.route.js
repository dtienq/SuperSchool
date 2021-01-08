var express = require('express');
const validateMdw = require('../middlewares/validate.mdw');
var router = express.Router();

const categoryModel = require('../models/category.model');
const common = require('../utils/common');
const constant = require('../utils/constant');
const db = require('../utils/db');
const roleValidation = require('../middlewares/validation.role');

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
});

router.get('/findById/:id', (req, res, next) => {
  categoryModel.findById(req.params.id).then(category => {
    res.json({
      data: category
    })
  }).catch(next);
})

router.post('/create', roleValidation([constant.USER_GROUP.ADMIN]), validateMdw(require('../schemas/createCategory.json')), (req, res, next) => {
  db.transaction(transaction => {
    categoryModel.create(transaction, req.body).then(_ => {
      transaction.commit();
      res.json({
        data: 'Success'
      });
    }).catch(err => {
      transaction.rollback();
      next(err);
    });
  });
})

module.exports = router;

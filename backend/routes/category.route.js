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

/**
 * @api {get} /api/category/findById/:id Get details of category
 * @apiName Get details of category
 * @apiGroup Category
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "data": {
 *             "categoryid": "6",
 *             "name": "Lập trình Java",
 *             "code": "C01.2",
 *             "parentid": "4",
 *             "english": "Java Basic"
 *         }
 *     }
 */
router.get('/findById/:id', roleValidation([constant.USER_GROUP.ADMIN]), (req, res, next) => {
  categoryModel.findById(req.params.id).then(category => {
    res.json({
      data: category
    })
  }).catch(next);
})

/**
 * @api {post} /api/category/create Create a category
 * @apiName Create a category
 * @apiGroup Category
 * 
 * @apiParamExample {json} Request-Example:
 *     {
 *         "name": "C++",
 *         "code": "C01",
 *         "parentId": null
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "data": "Success"
 *     }
 */
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
});

/**
 * @api {delete} /api/category/delete/:id Delete a category
 * @apiName Delete a category
 * @apiGroup Category
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "data": "Success"
 *     }
 */
router.delete('/delete/:id', roleValidation([constant.USER_GROUP.ADMIN]), (req, res, next) => {
  db.transaction(transaction => {
    categoryModel.delete(transaction, req.params.id).then(_ => {
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

/**
 * @api {put} /api/category/update Update a category
 * @apiName Update a category
 * @apiGroup Category
 * 
 * @apiParamExample {json} Request-Example:
 *     {
 *         "categoryId": 8, -- Bắt buộc
 *         "name": "Lập trình C++ 1234",
 *         "code": "C01.12345", 
 *         "parentId": null
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "data": "Success"
 *     }
 */
router.put('/update', roleValidation([constant.USER_GROUP.ADMIN]), validateMdw(require('../schemas/updateCategory.json')), (req, res, next) => {
  db.transaction(transaction => {
    categoryModel.update(transaction, req.body).then(_ => {
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

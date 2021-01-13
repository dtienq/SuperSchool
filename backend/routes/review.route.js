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
const reviewModel = require('../models/review.model');

router.get('/findByCourseId', (req, res, next) => {
    let courseId = req.body.courseId;

    reviewModel.findByCourseId(courseId).then(reviews => {
        res.json({
            data: reviews
        })
    }).catch(next);
});

module.exports = router;

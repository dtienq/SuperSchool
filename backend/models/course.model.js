const db = require('../utils/db');

module.exports = {
    findByCategoryId: (categoryId, page, pageSize) => {
        let query = db('course');

        if(categoryId) {
            query.where('categoryid', categoryId);
        } else {
            query.where('categoryid', null);
        }

        if(pageSize && pageSize > 0) {
            query.offset(pageSize * (page - 1));
            query.limit(pageSize);
        }

        return query;
    },
    topView: (quantity) => {
        let query = db('course').orderByRaw('views desc nulls last');

        if(quantity) {
            query.limit(quantity);
        }

        return query;
    },
    topRegister: (quantity) => {
        let query = db.from('course as c')
                    .leftJoin('student_course as sc', 'c.courseid', 'sc.courseid')
                    .select('c.*')
                    .count('sc.studentcourseid as countQuantityRegister')
                    .groupBy('c.courseid')
                    .distinct()
                    .orderByRaw('"countQuantityRegister" desc nulls last');

        if(quantity) {
            query.limit(quantity);
        }

        return query;
    },
    searchCourse: (searchString, categoryId, page, pageSize) => {
        let query = db.from('course as c')
                    .where('title', 'like', `%${searchString}%`);

        if(categoryId) {
            query.where('categoryid', categoryId);
        }

        if(pageSize) {
            query.limit(pageSize);
            query.offset((page - 1) * pageSize);
        }

        return query;
    }
}
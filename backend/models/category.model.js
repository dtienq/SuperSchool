const db = require('../utils/db');

module.exports = {
    findByParentId: (parentId) => {
        let query =  db('category');

        if(parentId) {
            query.where('parentid', parentId);
        } else {
            query.where('parentid', null);
        }

        return query;
    },
    getTopRegister: () => {
        let query = db
                    .from('category as c')
                    .innerJoin('course as co', 'c.categoryid', 'co.categoryid')
                    .leftJoin('student_course as cs', 'cs.courseid', 'co.courseid')
                    .select('c.*')
                    .count('cs.studentcourseid')
                    .groupBy('c.categoryid');

        return query;
    },
    findById: (id) => {
        let query = db
                    .from('category')
                    .where('categoryid', id)
                    .first();

        return query;
    },
    create: (transaction, category) => {
        return transaction('category').insert({
            code: category.code,
            name: category.name,
            parentid: category.parentId
        });
    }
}
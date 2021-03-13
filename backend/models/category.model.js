const db = require('../utils/db');

module.exports = {
    getParentCategory: () => {
        return db('category').where('parentid', null);
    },
    getListCategory: () => {
        let query =  db('category');
        query.orderByRaw('parentid nulls first');
        return query.select('categoryid as categoryId', 'name as categoryName', 'parentid as parentId');
    },
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
    },
    delete: (transaction, id) => {
        return transaction('category').where('categoryid', id).del();
    },
    update: (transaction, category) => {
        let query = transaction('category').where('categoryid', category.categoryId).update({
            code: category.code.toUpperCase(),
            name: category.name
        });

        if(category.parentId !== undefined) {
            query.update({
                parentid: category.parentId
            });
        }

        return query;
    }
}
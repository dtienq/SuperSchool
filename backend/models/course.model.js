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
    }
}
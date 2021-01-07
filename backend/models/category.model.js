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
}
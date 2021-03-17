const db = require('../utils/db');

module.exports = {
    findByCourseId: (queryParams) => {
        let query = db('coursevideo').where('courseid', queryParams.courseId);

        if(queryParams.pageSize) {
            query.limit(queryParams.pageSize);
            query.offset(queryParams.offset);
        }

        query.orderBy('orderno', 'asc');

        return query;
    },
    createMutiple: (videos) => {
        let query = db('coursevideo').insert(videos);

        return query;
    },
    deleteById: (id) => {
        return db('coursevideo').where('coursevideoid', id).del();
    }
}
const db = require('../utils/db');

module.exports = {
    findByCourseId: (courseId) => {
        return db('review').where('courseid', courseId).orderBy('updateddate', 'desc');
    }
}
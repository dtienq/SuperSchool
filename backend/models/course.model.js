const db = require('../utils/db');

module.exports = {
    findByCategoryId: (categoryId, page, pageSize) => {
        let query = db('course');

        if (categoryId) {
            query.where('categoryid', categoryId);
        } else {
            query.where('categoryid', null);
        }

        if (pageSize && pageSize > 0) {
            query.offset(pageSize * (page - 1));
            query.limit(pageSize);
        }

        return query;
    }, 
    findByTeacherId: (teacherId, page, pageSize) => {
        let query = db('course');

        query.where('categoryid', teacherId);

        if (pageSize && pageSize > 0) {
            query.offset(pageSize * (page - 1));
            query.limit(pageSize);
        }

        return query;
    }, 
    findById: (id) => {
        return db('course').where('courseid', id).first();
    },
    topView: (quantity) => {
        let query = db('course').orderByRaw('views desc nulls last');

        if (quantity) {
            query.limit(quantity);
        }

        return query;
    },
    topRegister: (quantity, categoryId) => {
        let query = db.from('course as c')
            .leftJoin('student_course as sc', 'c.courseid', 'sc.courseid')
            .select('c.*')
            .count('sc.studentcourseid as countQuantityRegister')
            .groupBy('c.courseid')
            .distinct()
            .orderByRaw('"countQuantityRegister" desc nulls last');

        if (quantity) {
            query.limit(quantity);
        }

        if(categoryId) {
            query.where('categoryid', categoryId);
        }

        return query;
    },
    searchCourse: (searchString, categoryId, page, pageSize) => {
        let query = db.from('course as c')
            .where('title', 'like', `%${searchString}%`);

        if (categoryId) {
            query.where('categoryid', categoryId);
        }

        if (pageSize) {
            query.limit(pageSize);
            query.offset((page - 1) * pageSize);
        }

        return query;
    },
    create: async (transaction, course, videos) => {
        let courseId = await transaction('course').insert(course).returning('courseid');

        if (videos && videos.length > 0) {
            videos.forEach(video => {
                transaction('coursevideo').insert({
                    courseid: courseId,
                    videopath: video.fileName
                });
            });
        }

        return;
    },
    update: (transaction, course) => {
        return transaction('course').where('courseid', course.courseId).update(course);
    },
    delete: (transaction, id) => {
        return transaction('course').where('courseid', id).del();
    }
}
const db = require('../utils/db');
const commonUtils = require('../utils/common');

module.exports = {
    findByCategoryId: (categoryId, page, pageSize) => {
        let query = db('course as co')
            .innerJoin('category as ca', 'co.categoryid', 'ca.categoryid')
            .innerJoin('user as u', 'u.userid', 'co.teacherid')
            .leftJoin('review as re', 're.courseid', 'co.courseid')
            .leftJoin('promotion as pr', 'pr.courseid', 'co.courseid');

        if (categoryId) {
            query.where('ca.categoryid', categoryId);
        } else {
            query.where('ca.categoryid', null);
        }

        if (pageSize && pageSize > 0) {
            query.offset(pageSize * (page - 1));
            query.limit(pageSize);
        }

        query.select('co.title as title', 'ca.name as categoryName', 'u.fullname as teacherName', db.raw('sum(re.rating)/count(re.reviewid) as ratingAvg'), db.raw('count(distinct re.userid) as ratingCount'), 'co.imagePath as image', 'co.price as originalPrice', 'pr.value as discountPrice');
        query.groupBy("title", "categoryName", "teacherName", "image", "originalPrice", "discountPrice");

        return query;
    },
    countByCategoryId: (categoryId) => {
        let query = db('course as co');

        if (categoryId) {
            query.where('co.categoryid', categoryId);
        } else {
            query.where('co.categoryid', null);
        }

        return query.count().first();
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
        return db('course as c')
            .leftJoin('review as r', 'r.courseid', 'c.courseid')
            .leftJoin('student_course as sc', 'sc.courseid', 'c.courseid')
            .leftJoin('promotion as p', 'p.courseid', 'c.courseid')
            .select(
                'c.courseid',
                'c.imagePath',
                'c.title as courseName',
                'c.description as shortDescription',
                'c.detailDescription',
                db.raw('coalesce(round(cast(avg(r.rating) as numeric), 1), 0) as "ratingAvgPoint"'),
                db.raw('count(distinct r.userid) as "totalReviewPerson"'),
                db.raw('count(distinct sc.studentid) as "totalStudentRegister"'),
                'p.value as priceDiscount',
                'c.price',
                'c.updateddate'

        ).where('c.courseid', id).groupBy(
                'c.courseid',
                'c.imagePath',
                'courseName',
                'shortDescription',
                'c.detailDescription',
                'priceDiscount',
                'c.price',
                'c.updateddate',
            ).first();
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

        if (categoryId) {
            query.where('categoryid', categoryId);
        }

        return query;
    },
    searchCourse: (body) => {
        let {searchString, categoryId, orderBy, orderType, fullText} = body;

        let query = db.select(db.raw(' c.*, case when maxCourse.courseid = c.courseid then true else false end as "isBestSeller"\n' +
            'from course c \n' +
            'inner join category ca \n' +
            'on c.categoryid = ca.categoryid \n' +
            'left join (\n' +
            '\tselect sc0.courseid, count(distinct sc0.studentid) as totalStudents\n' +
            '\tfrom student_course sc0\n' +
            '\tgroup by sc0.courseid\n' +
            '\torder by totalStudents\n' +
            '\tlimit 1\n' +
            ') as maxCourse\n' +
            'on c.courseid = maxcourse.courseid and maxCourse.totalStudents > 0 '));

        query.where('title', 'like', `%${searchString}%`);

        if(fullText) {
            query.whereRaw(`to_tsvector(c.title || ' ' || ca.name) @@ plainto_tsquery('${fullText}')`);
        }

        if (categoryId) {
            query.where('categoryid', categoryId);
        }

        if(orderBy) {
            query.orderBy(orderBy, orderType ? orderType : 'asc');
        }

        let queryCount = db.from('course as c')
            .where('title', 'like', `%${searchString}%`);

        if (categoryId) {
            queryCount.where('categoryid', categoryId);
        }

        queryCount.count('c.courseid as totalItems').first();

        return [query, queryCount];
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
    },
    getTopByColumnName: (quantity, columnName, order) => {
        let query = db('course');

        query.orderBy(columnName, order);
        query.limit(quantity);

        return query;
    },
    topHighlight: (quantity) => {
        let mondayOfLastWeek = commonUtils.getMondayOfLastWeek();
        let sundayOfLastWeek = commonUtils.getSundayOfLastWeek();

        let query = db('course as c');

        query.innerJoin('student_course as sc', 'sc.courseid', 'c.courseid');
        query.select(db.raw('count(sc.studentcourseid) as totalStudents'));

        query.where('sc.createddate', '>=', mondayOfLastWeek);
        query.where('sc.createddate', '<=', sundayOfLastWeek);

        return query.select('c.*').groupBy('c.courseid').limit(quantity);
    }
};
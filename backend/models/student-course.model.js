const knex = require('../utils/db');

module.exports = {
  registerCourse: (studentCourse) => {
    return knex('student_course').insert({
      studentid: studentCourse.studentId,
      courseid: studentCourse.courseId,
      createddate: studentCourse.createdDate
    }).returning('*');
  },
  findByStudentAndCourse: (studentCourse) => {
    return knex('student_course').where({
      studentid: studentCourse.studentId,
      courseid: studentCourse.courseId,
    }).first();
  },
  getList: (userId) => {
    return knex('student_course as sc')
      .innerJoin('course as c', 'sc.courseid', 'c.courseid')
      .where({
      studentid: userId
    })
      .orderBy('sc.createddate', 'desc')
      .select(
        'c.courseid',
        'c.title as courseName',
        'c.imagePath as imagePath',
        'c.description',
        'sc.status'
      );
  }
};
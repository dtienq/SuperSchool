const knex = require('../utils/db');

module.exports = {
    addToFavorite: (studentCourse) => {
        return knex('favoritecourse').insert({
          courseid: studentCourse.courseId,
          studentid: studentCourse.studentId,
        }).returning('*');
    },
  findByStudentAndCourse: (studentCourse) => {
    return knex('favoritecourse').where({
      courseid: studentCourse.courseId,
      studentid: studentCourse.studentId,
    }).first();
  },
  getList: (studentId) => {
    return knex('favoritecourse as fc')
      .innerJoin('course as c', 'fc.courseid', 'c.courseid')
      .where({
      studentid: studentId
    })
      .orderBy('fc.favoritecourseid', 'asc')
      .select(
      'c.courseid as courseId',
      'c.title as courseName',
      'c.imagePath as imagePath',
      'c.description',
      'fc.favoritecourseid as favoriteCourseId'
    );
  },
  removeFromFavorite: (id) => {
      return knex('favoritecourse').where({
        'favoritecourseid': id
      }).del().returning('*');
  }
};
const path = require('path');

const knex = require('knex')({
  client: 'pg',
  searchPath: 'superschool',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: '123456',
    database: 'SuperSchool',
    port: 5432
  },
  pool: {
    min: 0,
    max: 50
  }
});

module.exports = knex;
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'sql10.freemysqlhosting.net',
        user: 'sql10383069',
        password: 't3bIXrqKy6',
        database: 'sql10383069',
        port: '3306'
    }
});

module.exports = knex;
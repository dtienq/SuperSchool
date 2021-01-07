const db = require('../utils/db');

module.exports = {
    findAll: () => {
        return db('user');
    },
    getByUserName: (username) => {
        return db.from('user as u').innerJoin('usergroup as g', 'u.usergroupid', 'g.usergroupid').select('u.userid as userId', 'u.username', 'u.fullname', 'u.phonenumber as phoneNumber', 'u.email', 'u.refresh_token', 'g.code as groupCode', 'u.password').where('username', username).first();
    },
    create: async (user) => {
        const userIds = await db('user').insert(user).returning('userid');

        return db.from('user as u').innerJoin('usergroup as g', 'u.usergroupid', 'g.usergroupid').select('u.userid as userId', 'u.username', 'u.fullname', 'u.phonenumber as phoneNumber', 'u.email', 'u.refresh_token', 'g.code as groupCode').where('userid', userIds[0]).first();
    },
    findByIdAndRefreshToken: (userId, refreshToken) => {
        return db
            .from('user as u')
            .innerJoin('usergroup as g', 'u.usergroupid', 'g.usergroupid')
            .select('u.userid as userId', 'u.username', 'u.fullname', 'u.phonenumber as phoneNumber', 'u.email', 'g.code as groupCode')
            .where({'u.userid': userId, 'u.refresh_token': refreshToken})
            .first();
    }
}
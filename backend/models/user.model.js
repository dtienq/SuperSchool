const db = require('../utils/db');

module.exports = {
    findAll: () => {
        return db('user');
    },
    getByUserName: (username) => {
        return db.from('user as u').innerJoin('usergroup as g', 'u.usergroupid', 'g.usergroupid').select('u.userid as userId', 'u.username', 'u.fullname', 'u.email', 'u.refresh_token', 'g.code as groupCode', 'u.password').where('username', username).first();
    },
    findById: (id) => {
        return db('user').where('userid', id).first();
    },
    create: async (transaction, user) => {
        const userIds = await transaction('user').transacting(transaction).insert(user).returning('userid');

        return transaction.from('user as u').innerJoin('usergroup as g', 'u.usergroupid', 'g.usergroupid').select('u.userid as userId', 'u.username', 'u.fullname', 'u.phonenumber as phoneNumber', 'u.email', 'u.refresh_token', 'g.code as groupCode').where('userid', userIds[0]).first();
    },
    findByIdAndRefreshToken: (userId, refreshToken) => {
        return db
            .from('user as u')
            .innerJoin('usergroup as g', 'u.usergroupid', 'g.usergroupid')
            .select('u.userid as userId', 'u.username', 'u.fullname', 'u.phonenumber as phoneNumber', 'u.email', 'g.code as groupCode')
            .where({'u.userid': userId, 'u.refresh_token': refreshToken})
            .first();
    },
    updateInfo: (user, currentUser) => {
        return db('user')
            .where('userid', currentUser.userId)
            .update({
            email: user.email,
            fullname: user.fullname
            });
    },
    changePassword: (user) => {
        return db('user')
            .where('userid', user.userId)
            .update({
                password: user.password,
                refresh_token: user.refresh_token
            });
    },
    search: (condition) => {
        let fullname = condition.fullname || "";
        let query = db('user').whereRaw(`lower(fullname) like '%${fullname.toLowerCase()}%'`).orderBy('userid', 'desc');

        return query;
    },
    getTeacherInfo: (id) => {
        return db('user').where('userid', id).first();
    }
}
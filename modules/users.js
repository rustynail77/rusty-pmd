const db = require('../connections/heroku-pg.js');

const getUsers = () => {
    return db('users').select('*');
}

module.exports = {
    getUsers
}
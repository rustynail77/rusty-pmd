const db = require('../connections/heroku-pg.js');

const getPropTracs = (prop_id) => {
    return db('transactions')
    .select('*')
    .where({prop_id:prop_id})
}

const insertTrac = (trac) => {
    return db('transactions')
    .insert(trac)
    .returning('*')
}

const updateTrac = (id, trac) => {
    return db('transactions')
    .update(trac)
    .where({t_id:id})
    .returning('*')
}

const insertLogRec = (log_rec) => {
    return db('tracs_log')
    .insert(log_rec)
    .returning('*')
}

module.exports = {
    getPropTracs,
    insertTrac,
    updateTrac,
    insertLogRec
};
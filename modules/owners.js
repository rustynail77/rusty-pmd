const db = require('../connections/heroku-pg.js');

const getAllOwners = () => {
    return db('owners')
    .select('*')
    .orderBy('fname')
}

const getOwner = (owner_id) => {
    return db('owners')
    .select('*')
    .where({o_id:owner_id})
}

// const getOwnersOfProp = (property_id) => {
//     return db('property_ownership')
//     .select('*')
//     .where({prop_id:property_id})
//     .join('owners', 'property_ownership.owner_id','owners.o_id')
// }

const insertOwner = (owner) => {
    return db('owners')
    .insert(owner)
    .returning('*')
}

// const insertPropOwnership = (ownership) => {
//     return db('property_ownership')
//     .insert(ownership)
//     .returning('*')
// }

const deleteOwner = (id) => {
    return db('owners')
    .where({o_id:id}).delete()
    .del()
    .returning('*')
}

const updateOwner = (id, owner) => {
    return db('owners')
    .update(owner)
    .where({o_id:id})
    .returning('*')
}

const updatePropOwnership = (id, ownership) => {
    return db('property_ownership')
    .update(ownership)
    .where({relation_id:id})
    .returning('*')
}

module.exports = {
    getAllOwners,
    getOwner,
    insertOwner,
    deleteOwner,
    updateOwner,
    updatePropOwnership
};
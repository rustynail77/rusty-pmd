const db = require('../connections/heroku-pg.js');


const getAllProperties = () => {
    return db('properties')
    .select('*')
    .orderBy('p_id')
}

// const getProperty = (property_id) => {
//     return db('properties')
//     .select('*')
//     .where({p_id:property_id})
// }

const getProperty = (property_id) => {
    return db('properties')
    .select('*')
    .where({p_id:property_id})
    .join('transactions','properties.p_id','transactions.prop_id')    
}

// const searchProperty = (query) => {
//     return db('properties')
//     .select('p_id','active')
//     .whereILike('name', `%${query}%`)
// }

const insertProperty = (property) => {
    return db('properties')
    .insert(property)
    .returning('*')
}

const insertPropOwnership = (ownership) => {
    return db('property_ownership')
    .insert(ownership)
    .returning('*')
}

const deleteProperty = (id) => {
    return db('properties')
    .where({p_id:id}).delete()
    .del()
    .returning('*')
}

const updateProperty = (id, property) => {
    return db('properties')
    .update(property)
    .where({p_id:id})
    .returning('*')
}

module.exports = {
    getAllProperties,
    getProperty,
    // searchProperty,
    insertProperty,
    insertPropOwnership,
    deleteProperty,
    updateProperty
}
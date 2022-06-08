const   { 
    getAllProperties, 
    getProperty, 
    // searchProperty,
    insertProperty,
    deleteProperty,
    updateProperty
    } = require('../modules/properties.js');

//READ - GET get all properties
const _getAllProperties = (req,res) => {
    getAllProperties()
    .then(data => {
        res.json(data)
    })
    .catch(err=>{
        res.json({msg:err.message})
    })
}

//READ - GET get one Property
const _getProperty = (req,res) => {
    getProperty(req.params.id)
    .then(data => {
        res.json(data)
    })
    .catch(err=>{
        res.json({msg:err.message})
    })
}

//READ - GET search Property
// const _searchProperty = (req, res) => {
// searchProperty(req.query.q)
// .then(data => {
//     res.json(data)
// })
// .catch(err=>{
//     res.json({msg:err.message})
// })
// }


const _insertProperty = (req, res) => {
    insertProperty(req.body)
    .then(data => {
        res.json(data)
    })
    .catch(err=>{
        res.json({msg:err.message})
    })
}

//DELETE - delete a Property
const _deleteProperty = (req, res) => {
    deleteProperty(req.params.id)
    .then(data => {
        res.json(data)
    })
    .catch(err=>{
        res.json({msg:err.message})
    })
}

//UPDATE - PUT - update a Property
const _updateProperty = (req, res) => {
    console.log('req.params in _update:',req.params);
    updateProperty(req.params.id, req.body)
    .then(data => {
        res.json(data)
    })
    .catch(err=>{
        res.json({msg:err.message})
    })
}

module.exports = {
    _getAllProperties,
    _getProperty,
    // _searchProperty,
    _insertProperty,
    _deleteProperty,
    _updateProperty
}
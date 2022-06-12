const   { 
    getAllProperties, 
    getProperty, 
    insertProperty,
    updateProperty
    } = require('../modules/properties.js');

const _getAllProperties = (req,res) => {
    getAllProperties()
    .then(data => {
        res.json(data)
    })
    .catch(err=>{
        res.json({msg:err.message})
    })
}

const _getProperty = (req,res) => {
    getProperty(req.params.id)
    .then(data => {
        res.json(data)
    })
    .catch(err=>{
        res.json({msg:err.message})
    })
}

const _insertProperty = (req, res) => {
    insertProperty(req.body)
    .then(data => {
        res.json(data)
    })
    .catch(err=>{
        res.json({msg:err.message})
    })
}

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
    _insertProperty,
    _updateProperty
}
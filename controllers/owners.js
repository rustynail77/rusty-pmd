const {
    getAllOwners,
    getOwner,
    insertOwner,
    deleteOwner,
    updateOwner
    } = require('../modules/owners.js');

const _getAllOwners = (req,res) => {
    getAllOwners()
    .then(data => {
        res.json(data)
    })
    .catch(err=>{
        res.json({msg:err.message})
    })
}

const _getOwner = (req,res) => {
    getOwner(req.params.id)
    .then(data => {
        res.json(data)
    })
    .catch(err=>{
        res.json({msg:err.message})
    })
}

const _getOwnersOfProp = (req,res) => {
    getOwnersOfProp(req.params.id)
    .then(data => {
        res.json(data)
    })
    .catch(err=>{
        res.json({msg:err.message})
    })
}

const _insertOwner = (req, res) => {
    insertOwner(req.body)
    .then(data => {
        res.json(data)
    })
    .catch(err=>{
        res.json({msg:err.message})
    })
}
  
const _deleteOwner = (req, res) => {
    deleteOwner(req.params.id)
    .then(data => {
        res.json(data)
    })
    .catch(err=>{
        res.json({msg:err.message})
    })
}
    
const _updateOwner = (req, res) => {
    console.log('in server:',req.params.id,req.body)
    updateOwner(req.params.id, req.body)
    .then(data => {
        res.json(data)
    })
    .catch(err=>{
        res.json({msg:err.message})
    })
}


module.exports = {
    _getAllOwners,
    _getOwner,
    _getOwnersOfProp,
    _insertOwner,
    _deleteOwner,
    _updateOwner
};
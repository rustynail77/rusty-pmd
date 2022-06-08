const {
    getPropTracs,
    insertTrac,
    updateTrac,
    insertLogRec
    } = require('../modules/transactions.js');

const _getPropTracs = (req,res) => {
    getPropTracs(req.params.id)
    .then(data => {
        res.json(data)
    })
    .catch(err=>{
        res.json({msg:err.message})
    })
}

const _insertTrac = (req, res) => {
    insertTrac(req.body)
    .then(data => {
        res.json(data)
    })
    .catch(err=>{
        res.json({msg:err.message})
    })
}
     
const _updateTrac = (req, res) => {
    updateTrac(req.params.id, req.body)
    .then(data => {
        res.json(data)
    })
    .catch(err=>{
        res.json({msg:err.message})
    })
}

const _insertLogRec = (req, res) => {
    insertLogRec(req.body)
    .then(data => {
        res.json(data)
    })
    .catch(err=>{
        res.json({msg:err.message})
    })
}

module.exports = {
    _getPropTracs,
    _insertTrac,
    _updateTrac,
    _insertLogRec
};
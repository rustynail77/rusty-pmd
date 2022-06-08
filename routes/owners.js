const express = require('express');
const router = express.Router();

const {
        _getAllOwners,
        _getOwner,
        _getOwnersOfProp,
        _insertOwner,
        _deleteOwner,
        _updateOwner
        } = require('../controllers/owners.js');

router.get('/all-owners', _getAllOwners); //http://localhost:5000/api/owners/all-owners
router.get('/ownr/:id',_getOwner);
router.get('/prop-ownrs/:id',_getOwnersOfProp);
router.post('/ownr', _insertOwner);
router.delete('/ownr/:id', _deleteOwner);
router.put('/ownr/:id', _updateOwner);

module.exports = router;
const express = require('express');
const router = express.Router();

const {
        _getPropTracs,
        _insertTrac,
        _updateTrac,
        _insertLogRec
        } = require('../controllers/transactions.js');

router.get('/trac/:id',_getPropTracs);
router.post('/trac', _insertTrac);
router.put('/trac/:id', _updateTrac);
router.post('/log', _insertLogRec);

module.exports = router;
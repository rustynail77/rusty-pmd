const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const defaultImage = 'http://rustynail77.com/budapest-apartments/images/house.png';

const   { 
        _getAllProperties, 
        _getProperty, 
        // _searchProperty, 
        _insertProperty,
        _deleteProperty,
        _updateProperty
        } = require('../controllers/properties.js');
const   {
        insertProperty,
        insertPropOwnership,
        updateProperty
        } = require ('../modules/properties.js');

const storageFunc = multer.diskStorage({
        destination: (req,file,cbfunc) => {
                cbfunc(null,'uploads')
        },
        filename: (req,file,cbfunc) => {
                cbfunc(null, Date.now() + path.extname(file.originalname))
        }
})

const fileFilterFunc = (req,file,cbfunc) => {
        if(file.mimetype=='image/jpeg' || file.mimetype=='image/png'){
                cbfunc(null,true)
        } else {
                cbfunc(null,false)
        }
}

const upload = multer({storage:storageFunc, fileFilter: fileFilterFunc})

// router.get('/search', _searchProperty);
router.get('/prop/:id',_getProperty);
router.get('/all-props', _getAllProperties);
// router.post('/prop', _insertProperty);
router.delete('/prop/:id', _deleteProperty);
// router.put('/prop/:id', _updateProperty);

router.put('/prop/:id', upload.single('img_src'),(req,res)=>{

        if (req.file) req.body['img_src'] = `/${req.file.destination}/${req.file.filename}`;
        console.log('in router:', req.body.active);
        delete req.body.p_id; 
        updateProperty(req.params.id, req.body)
        .then(data => {
                res.json(data)
            })
            .catch(err=>{
                res.json({msg:err.message})
            })
        console.log('req.params',req.params);
        console.log('req.file:',req.file);
        console.log('req.body:',req.body);
})

router.post('/prop', upload.single('img_src'),(req,res)=>{

        if (req.file) req.body['img_src'] = `/${req.file.destination}/${req.file.filename}`;

        delete req.body.p_id; 
        insertProperty(req.body)
        .then(data => {
                res.json(data)
            })
            .catch(err=>{
                res.json({msg:err.message})
            })
        console.log('req.file:',req.file);
        console.log('req.body:',req.body);
})

module.exports = router;
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const properties_router = require('./routes/properties.js');
const owners_router = require('./routes/owners.js');
const transactions_router = require('./routes/transactions.js');
const path = require('path');
const bp = require('body-parser');

dotenv.config();
const app = express();
app.use(cors());

app.use(bp.json());
app.use(bp.urlencoded({extended:true}));

app.listen(process.env.PORT||8080, ()=> {
    console.log(`listening carefully on port ${process.env.PORT||8080}`);
})



app.use('/api/properties', properties_router);
app.use('/api/owners', owners_router);
app.use('/api/transactions', transactions_router);
app.use('/uploads', express.static(path.join(__dirname,'/uploads')));

// app.use('/', express.static(path.join(__dirname,'/public')));


app.use('/', express.static(path.join(__dirname, 'pmd-client/build')));
app.get('*',(req, res) => {
    res.sendFile(path.resolve(__dirname, './pmd-client/build', 'index.html'))
});
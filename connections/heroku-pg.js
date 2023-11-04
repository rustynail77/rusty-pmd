const knex = require('knex');
const dotenv = require('dotenv');

dotenv.config();

const db = knex ({
    client: 'pg',
    // connection:{
    //     host:process.env.DB_HOST,
    //     port:process.env.DB_PORT,
    //     user:process.env.DB_USER,
    //     password:process.env.DB_PASS,
    //     database:process.env.DB_NAME,
    //     ssl:{rejectUnauthorized:false}
    // }
    connection:{
        host:"srv572.hstgr.io",
        port:3306,
        user:"u346477415_pmd",
        password:"pmd_DB_1955!",
        database:"u346477415_pmd_new",
        ssl:{rejectUnauthorized:false}
    }
})

module.exports = db;
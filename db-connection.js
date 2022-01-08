const { Pool } = require('pg'); 

const conn = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'book_attic_project_db',
    user: 'postgres',
    password: 'postgres'
});

module.exports = conn;
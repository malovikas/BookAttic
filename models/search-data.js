const conn = require('../db-connection');

let searchData = function(searchName){
    return new Promise(function(resolve, reject){
        let query = `
            SELECT title, isbn
            FROM booksData
            WHERE title ILIKE '%${searchName}%'
            ORDER BY title;
        `;

        conn.query(query, function(err, result){
            if(err)
                reject(err);
            else{
                resolve(result['rows']);
            }
        });
    });
};

module.exports = searchData;
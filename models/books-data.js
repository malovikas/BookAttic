const conn = require('../db-connection');

let booksData = function(){
    return new Promise(function(resolve, reject){
        let query = `
            select title, isbn, thumbnailurl
            from booksData
            order by title;
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

module.exports = booksData;
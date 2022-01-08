const conn = require('../db-connection');

let bookDetailsData = function(bookId){
    return new Promise(function(resolve, reject){
        let query = `
            select * 
            from booksData
            join authors 
            on (authors.id) = any(booksData.authorsId)
            join categories
            on categories.id = any(booksData.categoriesId)
            where isbn = '${bookId}';
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

module.exports = bookDetailsData;
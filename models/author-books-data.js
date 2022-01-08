const conn = require('../db-connection');

let authorBooksData = function(authorName){
    return new Promise(function(resolve, reject){
        let query = `
            select distinct title, isbn
            from booksData, authors
            where (
	            select id
	            from authors
	            where name = '${authorName}'
		        ) = any (authorsId)
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

module.exports = authorBooksData;
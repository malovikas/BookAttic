const conn = require('../db-connection');

let categoryBooksData = function(categoryType){
    return new Promise(function(resolve, reject){
        let query = `
            select distinct title, isbn
            from booksData, categories
            where (
	            select id
	            from categories
	            where type = '${categoryType}'
		        ) = any (categoriesId)
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

module.exports = categoryBooksData;
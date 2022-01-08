const conn = require('../db-connection');

let categoriesData = function(){
    return new Promise(function(resolve, reject){
        let query = `
            select type
            from categories
            order by type;
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

module.exports = categoriesData;
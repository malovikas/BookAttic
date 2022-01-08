const conn = require('../db-connection');

let authorsData = function(){
    return new Promise(function(resolve, reject){
        let query = `
            select name
            from authors
            order by name;
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

module.exports = authorsData;
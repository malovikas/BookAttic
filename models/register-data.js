const conn = require('../db-connection');

let loginData = function(userName, userEmail, userPass){
    return new Promise(function(resolve, reject){
        let query = `
        insert into users values
        ('${userName}', '${userEmail}', '${userPass}');      
        `;

        conn.query(query, function(err, result){
            if(err)
                reject(err);
            else
                resolve(result['rows']);
        });
    });
};

module.exports = loginData;
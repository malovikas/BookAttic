const conn = require('../db-connection');

let loginData = function(userEmail, userPass){
    return new Promise(function(resolve, reject){
        let query = `
            select count(email)
            from users
            where email = '${userEmail}' and pass = '${userPass}';       
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
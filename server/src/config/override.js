const {con} = require('./db');

const execute = (sql, values = []) => {
    return new Promise((resolve, reject) => {
        con.query(sql, values, (err, result) => {
            if(err) return reject(err);
            else return resolve(result);
        });
    })
}

module.exports = {execute};
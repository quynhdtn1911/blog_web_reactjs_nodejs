const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'blog',
    port: '3306'
})

const connectToDB = () => {
    con.connect(err => {
        if(err) console.log(err);
        else console.log('Access connect to database');
    })
}

module.exports = {
    con,
    connectToDB
};
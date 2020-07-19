var mysql = require('mysql');
var connMySQL = () =>{
    console.log('conexão com o banco estabelecida');
    return mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : '1234',
        database : 'portal_noticias'
    });

}
module.exports = () =>{
    return connMySQL;
}
var mongo = require('mongodb');
var connMongoDB = () =>{
    var db = new mongo.Db(
        'got',
        new mongo.Server(
            'localhost',//string contendo o endereço do banco de dados
            27017,//porta de conexao
            {}
        ),
        {}//configurações adicionais

    );
    return db;
}
module.exports = () => {
    return connMongoDB;
}
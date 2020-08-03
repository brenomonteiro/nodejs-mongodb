var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');

var app = express();

//bodyParser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var port = 80;
app.listen(port);

var db = new mongodb.Db(
    'instagram',
    new mongodb.Server(
        'localhost',27017,{}),
    {}
);



console.log(`Servidor escutando na porta ${port}`);

app.get('/',function(req,res){
    //res.send({msg:'olá'});
});

app.post('/api',function(req,res){
    var dados = req.body;
    db.open(function(err, mongoclient){
        mongoclient.collection("postagens",function(err,collection){
            collection.insert(dados,function(err, records){
                if(err){
                    res.json(err);
                }else{
                    res.send(records);
                }
                mongoclient.close();
            });
        });
    });
    //res.send(dados);
});
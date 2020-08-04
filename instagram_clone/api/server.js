var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
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

//POST
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

//GET ALL
app.get('/api',function(req,res){
    var dados = req.body;
    db.open(function(err, mongoclient){
        mongoclient.collection("postagens",function(err,collection){
            collection.find().toArray(function(err,results){
                if(err){
                    res.json(err);
                }else{
                    res.json(results);
                }

                mongoclient.close();
            });
               
        });
    });
    //res.send(dados);
});

//GET BY ID
app.get('/api/:id',function(req,res){
    var dados = req.body;
    db.open(function(err, mongoclient){
        mongoclient.collection("postagens",function(err,collection){
            collection.find(ObjectId(req.params.id)).toArray(function(err,results){
                if(err){
                    res.json(err);
                }else{
                    res.status(200).json(results);
                }

                mongoclient.close();
            });
               
        });
    });
    
});

//PUT
app.put('/api/:id',function(req,res){
    var dados = req.body;
    db.open(function(err, mongoclient){
        mongoclient.collection("postagens",function(err,collection){
            collection.update(
                {_id:ObjectId(req.params.id)},
                {$set:{titulo:req.body.titulo}},
                {},
                function(err,records){
                    if(err){
                        res.json(err);
                    }else{
                        res.json(records);
                    }
                    mongoclient.close();
                }

            );
               
        });
    });
    
});

//DELETE
app.delete('/api/:id',function(req,res){
    var dados = req.body;
    db.open(function(err, mongoclient){
        mongoclient.collection("postagens",function(err,collection){
            collection.remove(
                {_id:ObjectId(req.params.id)},
               
                function(err,records){
                    if(err){
                        res.json(err);
                    }else{
                        res.json(records);
                    }
                    mongoclient.close();
                }

            );
               
        });
    });
    
});
var express = require('express');
var bodyParser = require('body-parser');
var multiparty = require('connect-multiparty');
var mongodb = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
var fs = require('fs');//fili system

var app = express();

//bodyParser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(multiparty());

app.use(function(req,res,next){
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers","content-type");
    res.setHeader("Access-Control-Allow-Credentials",true);
    next();
});
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

    res.setHeader("Access-Control-Allow-Origin","*");
    var date = new Date();
    var time_stamp = date.getTime();
    var url_imagem = time_stamp+'_'+req.files.arquivo.originalFilename;

    var path_origem = req.files.arquivo.path;
    var path_destino = './uploads/'+url_imagem;
    
    
    fs.rename(path_origem,path_destino,function(err){
        if(err){
            res.status(500).json({error:err});
            return;
        }

        var dados = {
            url_imagem:url_imagem,
            titulo: req.body.titulo
        }
        db.open(function(err, mongoclient){
            mongoclient.collection("postagens",function(err,collection){
                collection.insert(dados,function(err, records){
                    if(err){
                        res.json({'status':'erro'});
                    }else{
                        res.send({'status':'inclusão realizada com sucesso'});
                    }
                    mongoclient.close();
                });
            });
        });
    });
   
    
    //res.send(dados);
});

//GET ALL
app.get('/api',function(req,res){
    res.setHeader("Access-Control-Allow-Origin","*");
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

app.get('/imagens/:imagem',function(req,res){
    var img = req.params.imagem;

    fs.readFile('./uploads/'+img,function(err,content){
        if(err){
            res.status(400).json(err);
            return;
        }

        res.writeHead(200,{'content-type':'image/jpg'});
        res.end(content);
    });
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
   
    //res.setHeader("Access-Control-Allow-Origin","*");
    var dados = req.body;
    db.open(function(err, mongoclient){
        mongoclient.collection("postagens",function(err,collection){
            collection.update(
                {_id:ObjectId(req.params.id)},
                {$push:{comentários:{
                    id_comentário:new ObjectId,
                    comentário: req.body.comentario}}},
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
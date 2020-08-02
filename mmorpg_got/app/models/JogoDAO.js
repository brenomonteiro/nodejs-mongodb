
var ObjectID = require('mongodb').ObjectId;
function JogoDAO(connection){
    this._connection = connection();
    
    }
    
    JogoDAO.prototype.gerarParametros = function(usuario){
        this._connection.open(function(err,mongoClient){
      mongoClient.collection('jogo',(err,collection)=>{
             collection.insert({
                 usuario: usuario,
                 moeda:15,
                 suditos:10,
                 temor: Math.floor(Math.random() * 1000),
                 sabedoria:Math.floor(Math.random() * 1000),
                 comercio:Math.floor(Math.random() * 1000),
                 magia:Math.floor(Math.random() * 1000)
             });
             mongoClient.close();
         });
     
        });
        
     
     }
     
     JogoDAO.prototype.iniciarJogo = function(usuario,res,casa,msg){
        this._connection.open(function(err,mongoClient){
            mongoClient.collection("jogo",function(err,collection){
                   collection.find({usuario:usuario}).toArray(function(err,result){
                    console.log(result[0]);
                    res.render('jogo',{img_casa: casa,jogo: result[0], msg: msg});
                    mongoClient.close();
                   });
                 
                   
                   
               });
              
           
              });
        
     
     }
   
 

     JogoDAO.prototype.acao = function(acao){
        this._connection.open(function(err,mongoClient){
      mongoClient.collection('acao',(err,collection)=>{
          console.log(acao)
        var date = new Date();
        var tempo = null;

        switch(parseInt(acao.acao)){
            case 1: tempo = 1 * 60 * 60000;break;
            case 2: tempo = 2 * 60 * 60000;break;
            case 3: tempo = 5 * 60 * 60000;break;
            case 4: tempo = 5 * 60 * 60000;break;
            
        }
        acao.acao_termina_em = date.getTime()+tempo;
        collection.insert(acao);
            //console.log(result[0]);
            //res.render('jogo',{img_casa: casa,jogo: result[0], comando_invalido: comando_invalido});
            
         });

         mongoClient.collection('jogo',(err,collection)=>{

            var moedas = null;
            switch(parseInt(acao.acao)){
                case 1: moedas = -2 * acao.quantidade;break;
                case 2: moedas = -3 * acao.quantidade;break;
                case 3: moedas = -1 * acao.quantidade;break;
                case 4: moedas = -1 * acao.quantidade;break;
                
            }

            collection.update(
                {usuario: acao.usuario},//critério de pesquisa
                {$inc:{moeda : moedas}}//instrução de atualização
                
            );
            mongoClient.close();
         });
     
        });
        
     
     }

     JogoDAO.prototype.getAcoes = function(usuario,res){
        this._connection.open(function(err,mongoClient){
      mongoClient.collection('acao',(err,collection)=>{
   
      var date = new Date();
      var momento_atual = date.getTime();

        collection.find({usuario : usuario,acao_termina_em: {$gt:momento_atual}}).toArray(function(err, result){
            console.log(result+'-'+momento_atual)
            res.render('pergaminhos',{acoes:result})
            mongoClient.close();
        });
            //console.log(result[0]);
            //res.render('jogo',{img_casa: casa,jogo: result[0], comando_invalido: comando_invalido});
            
         });
     
        });
        
     
     }

     JogoDAO.prototype.revogarAcao = function(_id,res){
        this._connection.open(function(err,mongoClient){
            mongoClient.collection('acao',(err,collection)=>{
         
            var date = new Date();
            var momento_atual = date.getTime();
      
             collection.remove(
                 {_id : ObjectID(_id)},
                 function(err,result){
                     res.redirect("jogo?msg=d");
                     mongoClient.close();
                 }
             )
                  //console.log(result[0]);
                  //res.render('jogo',{img_casa: casa,jogo: result[0], comando_invalido: comando_invalido});
                  
               });
           
              });
     }

     
    
    module.exports =function(){
        return JogoDAO;
    }
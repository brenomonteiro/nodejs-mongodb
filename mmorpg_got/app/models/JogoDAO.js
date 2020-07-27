
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
     
     JogoDAO.prototype.iniciarJogo = function(usuario,res,casa){
        this._connection.open(function(err,mongoClient){
            mongoClient.collection("jogo",function(err,collection){
                   collection.find({usuario:usuario}).toArray(function(err,result){
                    console.log(result[0]);
                    res.render('jogo',{img_casa: casa,jogo: result[0]});
                    mongoClient.close();
                   });
                 
                   
                   
               });
              
           
              });
        
     
     }
   
    
    module.exports =function(){
        return JogoDAO;
    }
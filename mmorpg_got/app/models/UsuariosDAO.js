var crypto = require("crypto");

function UsuariosDAO(connection){
this._connection = connection();

}

UsuariosDAO.prototype.inserirUsuario = function(usuario){
   this._connection.open(function(err,mongoClient){
 mongoClient.collection('usuarios',(err,collection)=>{
        
        var senha_criptografada=crypto.createHash('md5').update(usuario.senha).digest('hex')
        console.log('cripto--'+senha_criptografada)
        usuario.senha = senha_criptografada;
        collection.insert(usuario);
        mongoClient.close();
    });

   });
   

}

UsuariosDAO.prototype.autenticar = function(usuario,req,res){
    this._connection.open(function(err,mongoClient){
        mongoClient.collection("usuarios",function(err,collection){
               
            var senha_criptografada=crypto.createHash('md5').update(usuario.senha).digest('hex')
            usuario.senha = senha_criptografada;
            collection.find(usuario).toArray(function(err,result){
                
               if(result.length>0){
                    req.session.autorizado = true;
                    req.session.usuario = result[0].usuario;
                    req.session.casa = result[0].casa;
                }else{
                    req.session.autorizado = false;
                }

                if( req.session.autorizado){
                    res.redirect('jogo');
     
                }else{
                    res.render('index',{validacao:{}});
                }
             

               });
             
               
               mongoClient.close();
           });
          
       
          });
}

module.exports =function(){
    return UsuariosDAO;
}
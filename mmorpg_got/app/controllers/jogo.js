module.exports.jogo = (application,req,res) => {
    
    if(req.session.autorizado!==true){
        res.send('Usuário precisa fazer login');
    
        return;    
        }
        var usuario = req.session.usuario;
        var casa = req.session.casa;

        var connection = application.config.dbconection;
        var JogoDAO = new application.app.models.JogoDAO(connection);
        
        
        var parametros = JogoDAO.iniciarJogo(usuario,res,casa);
            

    
}

module.exports.sair = (application,req,res) => {
    
    
        req.session.destroy(function(err){

            res.render('index',{validacao:{}});
        });
    
}


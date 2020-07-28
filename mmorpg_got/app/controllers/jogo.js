module.exports.jogo = (application,req,res) => {
    
    if(req.session.autorizado!==true){
        res.send('Usuário precisa fazer login');
    
        return;    
        }
        var comando_invalido ='n';
        if(req.query.comando_invalido == 's'){
            comando_invalido = 's';
        }

        var usuario = req.session.usuario;
        var casa = req.session.casa;

        var connection = application.config.dbconection;
        var JogoDAO = new application.app.models.JogoDAO(connection);
        
        
        var parametros = JogoDAO.iniciarJogo(usuario,res,casa,comando_invalido);
            

    
}

module.exports.sair = (application,req,res) => {
    
    
        req.session.destroy(function(err){

            res.render('index',{validacao:{}});
        });
    
}

module.exports.suditos = (application,req,res) => {
    if(req.session.autorizado!==true){
        res.send('Usuário precisa fazer login');
    
        return;    
        }
    
        res.render('aldeoes',{validacao:{}});

}

module.exports.pergaminhos = (application,req,res) => {
    if(req.session.autorizado!==true){
        res.send('Usuário precisa fazer login');
    
        return;    
        }
        res.render('pergaminhos',{validacao:{}});
    

}

module.exports.ordenar_acao_sudito = (application,req,res) => {
    if(req.session.autorizado!==true){
        res.send('Usuário precisa fazer login');
    
        return;    
        }
    var dadosForm = req.body;
    req.assert('acao','Ação deve ser informada').notEmpty();
    req.assert('quantidade','quantidade deve ser informada').notEmpty();

    var erros = req.validationErrors();

    if(erros){
       res.redirect('jogo?comando_invalido=s');
       return;
    }
    res.send('tudo ok');

}


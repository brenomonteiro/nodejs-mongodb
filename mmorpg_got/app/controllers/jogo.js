module.exports.jogo = (application,req,res) => {
    
    if(req.session.autorizado){
    res.render('jogo',{img_casa: req.session.casa});
    }else{
        res.send('Usuário precisa fazer login');
    }
}

module.exports.sair = (application,req,res) => {
    
    
        req.session.destroy(function(err){

            res.render('index',{validacao:{}});
        });
    
}


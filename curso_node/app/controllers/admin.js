module.exports.formulario_inclusao_noticia = function(app,req,res){
    res.render('admin/form_add_noticia',{val:{},noticia:{}});
}

module.exports.noticias_salvar = function(app,req,res){
    var noticia = req.body;
    
    req.assert('titulo','Titulo é obrigatório').notEmpty();
    req.assert('resumo','Resumo é obrigatório').notEmpty();
    req.assert('resumo','Resumo deve conter entre 10 e 100 caracteres').len(10,100);
    req.assert('autor','Autor é obrigatório').notEmpty();
    req.assert('data_noticia','Data é obrigatório').notEmpty().isDate({format: 'yyyy-MM-DD'});
    req.assert('noticia','Noticia é obrigatório').notEmpty();

    var erros = req.validationErrors();
    if(erros){
        
        res.render('admin/form_add_noticia', {val : erros, noticia : noticia});
        return;
    }

    //res.render('admin/form_add_noticia');

    var connection = app.config.dbConnection();
    var noticiasModel = new app.app.models.noticiasDAO(connection);

    noticiasModel.salvarNoticia(noticia,(error,result) => {

        res.redirect('/noticias');
});


}
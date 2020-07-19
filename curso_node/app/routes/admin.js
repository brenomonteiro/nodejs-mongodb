module.exports = function(app){

app.get('/formulario_inclusao_noticia',function(req, res){
    res.render('admin/form_add_noticia');
});

app.post('/noticias/salvar',function(req, res){
    var noticia = req.body;
    
    //res.render('admin/form_add_noticia');

    var connection = app.config.dbConnection();
    var noticiasModel = app.app.models.noticiasModel;

    noticiasModel.salvarNoticia(noticia, connection,(error,result) => {

       // res.render('noticias/noticias',{noticias : result});
        res.redirect('/noticias');
});


});

}
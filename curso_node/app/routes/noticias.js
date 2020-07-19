
module.exports = function(app){
    
    app.get('/noticias',function(req, res){
   
    var connection = app.config.dbConnection();
    var noticiasModel = new app.app.models.noticiasDAO(connection);

    noticiasModel.getNoticias((error,result) => {

        res.render('noticias/noticias',{noticias : result});
    
});
   
    
});
}
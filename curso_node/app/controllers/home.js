module.exports.index = function(app,req,res){

    var connection = app.config.dbConnection();
    var noticiasModel  = new app.app.models.noticiasDAO(connection);

    noticiasModel.getUltimasNoticias((error, result) =>{

        res.render('home/index',{noticias : result});
    });

    
}
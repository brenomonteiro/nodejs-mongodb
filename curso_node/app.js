var app =  require('./config/server');

var rotaNoticias = require('./app/routes/noticias');
var rotaFormularioNoticia = require('./app/routes/formulario_inclusao_noticia');
var rotaHome = require('./app/routes/home');

rotaNoticias(app);
rotaFormularioNoticia(app);
rotaHome(app);

app.listen(3000,function(){
    console.log('servidor com nodemon iniciado');
});
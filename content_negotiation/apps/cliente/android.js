var http = require('http');
var buffer_corpo_response = [];
var opcoes = {

    hostname:'teste',
    port:80,
    path:'/',
    method: 'get',
    headers:{

        'Accept': 'application/json',
        'Content-type':'application/json'
    }

}
var html = 'nome=josé';
var json = JSON.stringify({nome:'josé'});

//content-type

var req = http.request(opcoes,function(res){
 res.on('data',function(pedaco){
     buffer_corpo_response.push(pedaco);

    console.log(pedaco.toString());
 })

 res.on('end',function(){
     var corpo_response = Buffer.concat(buffer_corpo_response).toString();
     console.log(corpo_response);
})
});

req.write(json);
req.end();
var stdin = process.openStdin();
var fs = require("fs");

var base = {
	db:{
		project_db_name:"",
		port:"27017",
		host:"localhost"
	},
	secret_name:"",
	base_name:""
}

var cont = -1;
var preguntas = ["Nombre de la compañia:","Identificador secreto:","Nombre de la base de datos:","Puerto: (27017)","Host/Dominio: (localhost)","Finalizar: y/Y"];
var respuestas = [null,true,null,"27017","localhost"];


function send(){
	console.log(preguntas[cont+1]);
}

function save(d) {
	cont++;
	var tab = respuestas[cont];
	if (typeof tab == 'boolean') {
		respuestas[cont] = Number(new Date());
	}else{
		respuestas[cont] = d;
	}
}

function finish() {
	base["base_name"] = respuestas[0];
	base["secret_name"] = respuestas[1];
	base["db"]["project_db_name"] = respuestas[2];
	base["db"]["port"] = respuestas[3];
	base["db"]["host"] = respuestas[4];

	console.log(base);

	fs.writeFile("./data.json", JSON.stringify(base), function(err) {
		process.exit(1);    
	});
}

send();
stdin.addListener("data", function(d) {
    var value = d.toString().trim();

    if (value == "y" || value == "Y") {
    	finish();
    }else if (value.length > 0 && cont < 5) {
    	save(value);
    }

    send();
});
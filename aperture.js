var DB = require("thinkdb");

var dataconfig = require("./data.json");

DB.domain = dataconfig["db"]["host"];
DB.port = dataconfig["db"]["port"];
DB.projectname = dataconfig["db"]["project_db_name"];

var ins = require("./Configure.json");
ins = ins.instancias;
function savedata(db) {
	DB.removeCollection(function(result){
		if (result.result.n == 0) {
			console.log("Fail: "+db);
		}else{
			console.log(db);
		}
	    DB.insert(require("./jsons/"+String(db)+".json"), function(result){
	    },String(db));
	},String(db));
}

for (var i = 0; i < ins.length; i++) {
	var db = require("./jsons/"+ins[i]+".json");
	savedata(ins[i]);
	for (var j = 0; j < (db.contenido).length; j++) {
		var df = (db.contenido)[j];
		savedata(df);
	};
};
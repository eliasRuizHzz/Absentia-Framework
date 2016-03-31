var fs = require('fs');
var dataconfig = require("./data.json");

var name_ins = process.argv[2];

function create_html(ext) {
	
		fs.exists("./build/"+name_ins+"."+ext, function(exists) {
	    	if (!exists) {
				fs.readFile('./libs/instancias/file.'+ext, 'utf8', function (err,data) {
				  if (err) {
				    return console.log(err);
				  }else{
				  	data = data.split("123456789").join(name_ins);
				  	fs.writeFile("./build/"+name_ins+"."+ext, data, function(err) {
						if(err) {
						    console.log(name_ins+"."+ext+"  > error");
						}else{
							console.log(name_ins+"."+ext+" > success");
						}
					}); 
				  }
				});
			}else{
	    		console.log("Fail was exist: "+name_ins);
	    	}
		});
}

function create_js(ext) {
	
		fs.exists("./build/js/"+name_ins+".min."+ext, function(exists) {
	    	if (!exists) {
				fs.readFile('./libs/instancias/file.'+ext, 'utf8', function (err,data) {
				  if (err) {
				    return console.log(err);
				  }else{
				  	data = data.split("123456789").join(name_ins);
				  	fs.writeFile("./build/js/"+name_ins+".min."+ext, data, function(err) {
						if(err) {
						    console.log(name_ins+".min."+ext+"  > error");
						}else{
							console.log(name_ins+".min."+ext+" > success");
						}
					}); 
				  }
				});
			}else{
	    		console.log("Fail was exist: "+name_ins);
	    	}
		});
}

function create_json(ext) {
	
		fs.exists("./jsons/"+name_ins+"."+ext, function(exists) {
	    	if (!exists) {
				fs.readFile('./libs/instancias/file.'+ext, 'utf8', function (err,data) {
				  if (err) {
				    return console.log(err);
				  }else{
				  	data = data.split("Project").join(dataconfig["base_name"]);
				  	data = data.split("123456789").join(name_ins);
				  	fs.writeFile("./jsons/"+name_ins+"."+ext, data, function(err) {
						if(err) {
						    console.log(name_ins+"."+ext+"  > error");
						}else{
							console.log(name_ins+"."+ext+" > success");
						}
					}); 
				  }
				});
			}else{
	    		console.log("Fail was exist: "+name_ins);
	    	}
		});
}

if (name_ins != undefined && typeof name_ins === "string") {
	name_ins = name_ins.split(" ").join("-");
	var config = require("./Configure.json");
	var check = false;
	for (var i = 0; i < (config.instancias).length; i++) {
		if((config.instancias)[i] == name_ins){
			check = true;
		}
		if (i == (config.instancias).length-1 && check == false) {
			config.instancias.push(name_ins);
			create_html("html");
			create_js("js");
			create_json("json");
			fs.writeFile("./Configure.json", JSON.stringify(config), function(err) {
				if(err) {
				    console.log("Configure.js  > error");
				}else{
					console.log("Configure.js > success");
				}
			});
		}else{
			console.log("Fail was exist: "+name_ins);
		}
	};
}else{
	console.log("Fail not included nametag: 'sudo node newins.js name-my-instance'");
}

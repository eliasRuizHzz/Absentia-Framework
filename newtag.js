var fs = require("fs");

var name_tag = process.argv[2];

if (name_tag != undefined && typeof name_tag === "string") {
	fs.exists("./tags/"+name_tag+".tag", function(exists) {
	    if (!exists) {
	    	console.log("Ready: "+name_tag);
	        fs.writeFile("./tags/"+name_tag+".tag", "<"+name_tag+"><div id='"+name_tag+"' class='container'></div><script></script><style type='text/css'></style></"+name_tag+">", function(err) {
			    if(err) {
			        console.log(name_tag+".tag > error");
			    }else{
			    	console.log(name_tag+".tag > success");
			    }
			}); 
			var newob = {};
			newob[name_tag] = {};
			fs.writeFile("./jsons/"+name_tag+".json", JSON.stringify(newob), function(err) {
			    if(err) {
			        console.log(name_tag+".json > error");
			    }else{
			    	console.log(name_tag+".json > success");
			    }
			});
	    }else{
	    	console.log("Fail was exist: "+name_tag);
	    }
	});
}else{
	console.log("Fail not included nametag: 'sudo node newtag.js name-my-tag'");
}


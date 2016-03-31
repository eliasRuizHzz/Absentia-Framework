//sudo mongod --dbpath /data/db
//sudo mongod --fork --logpath /data/db/mongodb.log --logappend
var DB = require("thinkdb");
var express = require('express');
var app = express();
var unploadFiles = express();
var busboy = require("connect-busboy");
var fs = require("fs");
var atob = require('atob')
var Ext = require('./ext.js');

DB.domain = "localhost";
DB.port = "27017";
DB.projectname = "project";

var instancesObj = require("./Configure.json");

app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: '©Project', cookie:{maxAge:(1000)*(60)*(60)}}));
app.use('/js', express.static('build/js'));
app.use('/tags', express.static('build/js/tags'));
app.use('/css', express.static('build/css'));
app.use('/font', express.static('build/fonts'));
app.use('/image', express.static('img'));
app.use('/video', express.static('media'));
app.use('/bootstrap', express.static('node_modules/bootstrap'));

app.post('/checkuser/:user', function (req, res) {
	var user = String(req.params.user);
	var pass = String(req.body.pass);
	DB.findOne({name_user:user,password:pass},function(document){
		if (document) {
			var cook = Date.now();
			req.session.login = String(cook);
			res.send({login:"success"});
		}else{
			res.send({login:"error"});
		}
	},"login");
});

app.get('/logout', function (req, res) {
	if (req.session.login != undefined) {
		req.cookies = {};
		req.session.destroy();
	}
	res.redirect("/");
});

app.get('/admin', function (req, res) {
	if (req.session.login == undefined) {
		res.sendfile(__dirname + '/build/login.html');
	}else{
		res.redirect("/");
	}
});

app.post('/instance/:cual', function (req, res) {
	var cual = req.params.cual;
	DB.findOne({instancia:cual},function(document){
	    var ins = Ext.clone(document);
	    Ext.Looper(ins["contenido"],function(tg,i,callback) {
	    	DB.findOne({},function(tag){
	    		ins[tg] = tag[tg];
	    		callback();
	    	},tg);
	    },function() {
      		if (req.session.login != undefined) {
				ins["loged"] = true;
				res.send(ins);
			}else{
				ins["loged"] = false;
				res.send(ins);
			}
    	});
	},cual);
});
app.get('/', function (req, res) {
	res.redirect("/index");
});
app.get('/:ins', function (req, res) {
	var ins = req.params.ins;
	Ext.Looper(instancesObj.instancias,function(val, i, callback) {
		console.log(val);
		if(val == ins){
			res.sendfile(__dirname + '/build/'+ins+'.html');
		}else{
			callback();
		}
	},function() {
		res.send({call:"404"});
	});
});

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('©Project service listening at http://%s:%s', host, port);
});


unploadFiles.use(busboy());

unploadFiles.post('/unpload/image/:image', function (req, res) {
	var image = String(atob(req.params.image));
	var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename); 
        fstream = fs.createWriteStream(__dirname + "/img/"+image);
        file.pipe(fstream);
        fstream.on('close', function () {
            console.log("success");
			res.send({unpload:"success"});
        });
    });
});

var fileSys = unploadFiles.listen(8081, function () {
  var host = fileSys.address().address;
  var port = fileSys.address().port;
  console.log('project service listening at http://%s:%s', host, port);
});
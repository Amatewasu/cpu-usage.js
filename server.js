var app = require('express').createServer(),
	io = require('socket.io').listen(app),
	spawn = require('child_process').spawn;

app.listen(8080);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

var com = spawn('dstat', ['-c', '--nocolor']);
com.stdout.on('data', function(data){
	var txt = new Buffer(data).toString('utf8', 0, data.length);
	io.sockets.send(100 - parseInt(txt.split('  ')[2]));
});

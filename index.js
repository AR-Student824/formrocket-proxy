/*var http = require('http');

http.createServer(onRequest).listen(3000);

function onRequest(client_req, client_res) {
  console.log('serve: ' + client_req.url);

  var options = {
    hostname: 'www.formrocket.me',
    port: 80,
    path: client_req.url,
    method: client_req.method,
    headers: client_req.headers
  };

  var proxy = http.request(options, function (res) {
    client_res.writeHead(res.statusCode, res.headers)
    res.pipe(client_res, {
      end: true
    });
  });

  client_req.pipe(proxy, {
    end: true
  });
}
*/

var app = require('express')(), axios = require('axios')

app.use((req, res) => {
  if (!req.path) return res.sendStatus(404)
	if (!req.path.startsWith('/api')) return res.sendStatus(400)
	axios.get(`https://www.formrocket.me${req.path}`).then(api => {
		res.send(api)
	}).catch(e => {
		res.status(parseInt(e.message.split('Request failed with status code ')[1])).send(e)
	})
}).listen(3000, () => {
	console.log('Proxy ready on port 3000')
})
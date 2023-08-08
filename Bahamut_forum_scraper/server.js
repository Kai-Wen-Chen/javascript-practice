const http = require('http');
const fs = require('fs');
const express = require('express');
const app = express();
const server = http.createServer(app);
let data = fs.readFileSync('main.html');
app.use('/css', express.static('css'));
app.use('/script', express.static('script'));

app.get('/', (req, res) => {
    res.writeHeader(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
});

app.post('/', (req, res) => {
    let body = '';
    let req_body = null;
    req.on('data', chunk => {
        body += chunk.toString();
        req_body = JSON.parse(body);
    });
    
    req.on('end', () => {
        //console.log(req_body);
        if (req_body.method === 'onInputAddress') {
            console.log(req_body.value);
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.end(`{"action": "updateKeywordUI", "arguments": [true]}`)
        } else if (req_body.method === 'onClickSearchBtn') {
            console.log('click search btn');
            // TODO: access to destination of url and check if it is valid page
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.end(`{"action": "updateKeywordUI", "arguments": [false]}`)
        } else if (req_body.method === 'onInputKeyword') {
            console.log(req_body.value);
            res.end('ok');
        } else
            res.end('ok');
    });
});

const hostname = '127.0.0.1';
const port = 3000;

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
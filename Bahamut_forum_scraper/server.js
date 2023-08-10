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

const axios = require('axios');

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
        } else if (req_body.method === 'onClickSearchAddressBtn') {
            console.log('click search address');
            AccessURL(res, req_body.value);
        } else if (req_body.method === 'onInputKeyword') {
            console.log(req_body.value);
            res.end('ok');
        } else if (req_body.method === 'onClickSearchKeywordBtn') {
            console.log('click search keyword');
            // TODO: search contents by keyword
            res.end('ok');
        } else if (req_body.method === 'onRequestLogin') {
            console.log('request login');
            if (req_body.value.length != 2) {
                res.writeHead(404);
                res.end('wrong account or password');
            } else
                Login(req_body.value[0], req_body.value[1], res);
        } else
            res.end('ok');
    });
});

const hostname = '127.0.0.1';
const port = 3000;

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

/* ----------- Request handler function ------------- */
const domain = 'https://forum.gamer.com.tw/C.php';

function AccessURL(res, url=null) {
    if (!url || !url.startsWith(domain)) {
        res.writeHead(404);
        res.end('wrong url');
        return;
    }
    
    axios.get(url)
        .then((axios_res) => {
            res.setHeader('Content-Type', 'text/html');
            res.writeHead(200);
            res.end(axios_res.data);
        })
        .catch((error) => {
            res.writeHead(404);
            res.end('wrong url');
        });
}

function Login(account, password, res) {
    // TODO: handle login
    res.end('ok');
}


const http = require('http');
const fs = require('fs');
const express = require('express');
const app = express();
const server = http.createServer(app);
let data = fs.readFileSync('main.html');
app.use('/css', express.static('css'));
app.use('/script', express.static('script'));

app.get('/', (req, res) => {
    //res.statusCode = 200;
    res.writeHeader(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
});

const hostname = '127.0.0.1';
const port = 3000;

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
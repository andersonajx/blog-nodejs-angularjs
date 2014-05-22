var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser());

app.post('/pessoa/salvar', function (req, res) {
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    salvarPessoa(JSON.parse(req.body.pessoa));
    res.send("OK");
});

app.get('/pessoas', function (req, res) {
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    obterPessoas(res);
});

app.listen(8000, function() {
    console.log("Servidor iniciado na porta 8000");
});

function salvarPessoa(pessoa) {
    var client = getConnection();
    client.query("INSERT INTO pessoa VALUES(NULL, ?, ?, ?)", [pessoa.nome, pessoa.telefone, pessoa.email]);
    client.end();
}

function obterPessoas(res) {
    var client = getConnection();
    client.query("SELECT * FROM pessoa", function(err, results, fields) {
        res.send(JSON.stringify(results));
    });
    client.end();
}

function getConnection() {
    return mysql.createConnection({host: 'localhost', user: 'cadastronodejs', password: 'cadastronodejs', database: 'cadastronodejs'});
}

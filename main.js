var express = require('express');
var fs = require('fs');
const { fstat } = require('fs');
var app = express();
app.set('view engine', 'html');

app.use(express.json());
app.use(express.static('image'));



var http = require('http');

app.get('/main', (req, res) => {
    fs.readFile('main.html', function(error, data){
        if (error){
            console.log(error);
        }
        else{
            
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
           
        }
    });
});

app.get('/map', (req, res) => {
    fs.readFile('map.html', function(error, data){
        if (error){
            console.log(error);
        }
        else{
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        }
    });
});


app.get('/result', (req, res) => {
    fs.readFile('result.html', function(error, data){
        if (error){
            console.log(error);
        }
        else{
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        }
    });
});

app.use((req, res, next) => {
    res.sendStatus(404);
})

app.use((err, req, res, next) => {
    console.log('Error!')
    console.log(err);
    res.sendStatus(500);
})

app.listen(80);
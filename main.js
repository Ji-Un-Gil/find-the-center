const express = require('express');
const fs = require('fs');
const { fstat } = require('fs');
const path = require('path');
const http = require('http');
const HTTPS = require('https');
const domain = "2018102160.osschatbot2022.tk"
const sslport = 23023;
const app = express();

app.use(express.json());
app.use(express.static('image'));

app.get('/', (req, res) => {
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

//If you use localhost, comment out line 64 ~ 77 and use line 79.
try {
    const option = {
      ca: fs.readFileSync('/etc/letsencrypt/live/' + domain +'/fullchain.pem'),
      key: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/' + domain +'/privkey.pem'), 'utf8').toString(),
      cert: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/' + domain +'/cert.pem'), 'utf8').toString(),
    };
  
    HTTPS.createServer(option, app).listen(sslport, () => {
      console.log(`[HTTPS] Server is started on port ${sslport}`);
    });
  } catch (error) {
    console.log('[HTTPS] HTTPS 오류가 발생하였습니다. HTTPS 서버는 실행되지 않습니다.');
    console.log(error);
  }

  //app.listen(8080);
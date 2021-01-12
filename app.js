// załadowanie modułów dodatkowych i plików aplikacji
const express = require('express');
// moduł do obsługi routingu
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// nasz plik definiujący odpowiedzi dla ścieżek
const routes = require('./routes/index');

const app = express();

// konfiguracja parserów
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

// konfiguracja routera dla wszystkich ścieżek
app.use('/', routes);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
module.exports = app;
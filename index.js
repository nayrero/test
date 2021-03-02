const http = require('http');
const express = require('express');
const expressHbs = require('express-handlebars');
const hbs = require('hbs');
const app = express();
var router = express.Router();
const path = require('path');


app.use(express.static('public'));
// устанавливаем настройки для файлов layout
app.engine(
  'hbs',
  expressHbs({
    layoutsDir: 'views/layouts',
    defaultLayout: 'layout',
    extname: 'hbs',
  })
);
//handlabars
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

var routes = require('./routes/routes');
app.use('/', routes);

app.listen(3000);
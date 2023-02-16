const path = require('path');

const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const baseRoute = require('./routes/base.route');

app.use(baseRoute);

app.listen(3000);
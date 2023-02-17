const path = require('path');

const express = require('express');

const app = express();

const baseRoute = require('./routes/base.route');
const userRoute = require('./routes/user.route');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.use(baseRoute);
app.use(userRoute);

app.listen(3000);
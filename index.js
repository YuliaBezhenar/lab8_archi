//console.log('Hello world');

const express = require('express');
const bodyParser = require('body-parser');

const PORT = 5000;
const app = express();

var connection = require('./config/config.bd');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "hbs");

app.get('/', (req, res) => {
    res.status(200).json('Server works');
})


const clientRoutes = require('./router/client.router');
app.use('/api/client', clientRoutes);


app.listen(PORT, () => console.log('SERVER START'));
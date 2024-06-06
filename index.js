//console.log('Hello world');

const express = require('express');
const bodyParser = require('body-parser');

const PORT = 5000;
const app = express();

var connection = require('./config/config.bd');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "hbs");

/*app.get('/', (req, res) => {
    res.status(200).json('Server works');
})*/


const clientRoutes = require('./router/client.router');
app.use('/api/client', clientRoutes);

const vetRoutes = require('./router/vet.router');
app.use('/api/vet', vetRoutes);

const serviceRoutes = require('./router/service.router');
app.use('/api/service', serviceRoutes);

const appointmentRoutes = require('./router/appointment.router');
app.use('/api/appointment', appointmentRoutes);


app.listen(PORT, () => console.log('SERVER START'));

app.use(express.static("."));

app.get('/', (req, res) => {
    res.render('index.ejs');
});
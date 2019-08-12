var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var config = require('./config.js');

app.use(bodyParser.json());
app.use(cors());

require('./Models/Classroom');
require('./Models/Student');
require('./Models/StudyRoom');
require('./Models/Teacher');
require('./Models/Users');
require('./routes')(app);



mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useCreateIndex: true })
    .then(() =>

        app.listen(config.appPort, () => {
            console.log('server run...');
        })
    )
    .catch(() => console.error('db no connect'));
var dtae = new Date();
app.get('/', (req, res)=> {
    res.send(dtae);
})
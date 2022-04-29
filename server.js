

//express
const express = require('express');
const app = express();


//cors
const cors = require('cors');
app.use(cors());


//body-parser

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express())
app.use(express.static('website'));

const port = 8000;

const server = app.listen(port, listening);

function listening() {
    console.log('Server is running');
    console.log(`Server is running on: ${port}`);
}

let projectData = {};

//GET
app.get('/getWeather', getWeather);
function getWeather(req, res) {
    res.send(projectData)
    console.log(projectData)
}


// POST
app.post('/postWeather', postWeather);
function postWeather(req, res) {
    projectData = req.body;
    console.log(projectData);

}
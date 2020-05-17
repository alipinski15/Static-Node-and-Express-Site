const express = require('express');
const bodyParser = require('body-parser');
const { data } = require('../Static-Node-and-Express-Site/data.json');

// console.log(data.projects[0].image_urls[0])
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use('/static', express.static('public'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/layout', (req, res) => {
    res.render('layout');
})

app.get('/project', (req, res) => {
    data.projects.forEach(project => {
        res.render('project', {project})
    });
});

app.listen(3000, () => {
    console.log('The application is running localhost:3000');

});
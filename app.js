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


app.get('/project/:id', (req, res) => {
    const { id } = req.params;
    data.projects.forEach(project => {
        if(id === project.id){
            res.render('project', {project})
        }
    });
});

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
})


app.listen(3000, () => {
    console.log('The application is running localhost:3000');

});
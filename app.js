/**
 * Global Variables 
 */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();


// Variable containing data from json file.

const { projects } = require('./data.json');


app.use(bodyParser.urlencoded({extended: false}));
app.use('/static', express.static('public'));
app.set('view engine', 'pug');

//Renders the index page.

app.get('/', (req, res, next) => {
    res.render('index', { projects });
})

//Renders the about page.

app.get('/about', (req, res) => {
    res.render('about');
})

//Checks the 'id' of each page. renders the appropriate page if 'id' matches.

app.get('/project/:id', (req, res, next) => {
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === projectId);
    if(project){
        res.render('project', { project });
    } else {
        res.sendStatus(404);
    }
}); 

//Handles an error if the page is not found. 

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    console.log('Oops, It likes we have a problem');
    next(err);
})

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error', err);
})

//Handle the localhost server.

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);
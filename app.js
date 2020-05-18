/**
 * Global Variables 
 */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();


// Variable containing data from json file.accordion

const { projects } = require('../Static-Node-and-Express-Site/data.json');


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
    next(err);
})

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error', err);

})

//Handle the localhost server.

app.listen(3000, () => {
    console.log('The application is running localhost:3000');

});
/**
 * Entry point to Express web server.
 *
 * Import external library modules as needed (eg. body-parser, etc).
 */
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const db = require('./db');

const handlebarsConfig = {
    extname: '.handlebars',
    layoutsDir: 'views',
    defaultLayout: 'layout'
};

// Init express app
const app = express();

// Set up middleware
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.static('public'));

// Set handlebars to be the default view engine
app.engine('handlebars', handlebars.create(handlebarsConfig).engine);
app.set('view engine', 'handlebars');

// Import routes to match incoming requests
require('./routes')(app, db);

// Root GET request (it doesn't belong in any controller file)
app.get('/', (request, response) => {

    let loggedIn = request.cookies['loggedIn'];
    let username = request.cookies['username'];
    let userid = request.cookies['userid'];

    db.pool.query('SELECT * FROM clubs', (error, queryResult) => {
        if (error) console.error('error', error);
        
        let context = {
            loggedIn: loggedIn,
            username: username,
            userid: userid,
            clubid: queryResult.rows[0].id,
            clubimg: queryResult.rows[0].img
        };

        response.render('home', context);
    });
});

// app.get('*', (request, response) => {
//     response.render('404');
// });

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log('~~~ Tuning in to the waves of port '+PORT+' ~~~'));

server.on('close', () => {
    console.log('Closed express server');

    db.pool.end(() => {
        console.log('Shut down db connection pool');
    });
});
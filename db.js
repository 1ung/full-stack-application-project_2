const pg = require('pg');
const club = require('./models/club');
const user = require('./models/user');





//require the url library
//this comes with node, so no need to yarn add
const url = require('url');
console.log('~~~~~~#1~~~~~~');

//check to see if we have this heroku environment variable
if (process.env.DATABASE_URL) {
    console.log('~~~~~~#2~~~~~~');
    console.log(process.env.DATABASE_URL);

    //we need to take apart the url so we can set the appropriate configs

    const params = url.parse(process.env.DATABASE_URL);
    const auth = params.auth.split(':');

    //make the configs object
    var configs = {
        user: auth[0],
        password: auth[1],
        host: params.hostname,
        port: params.port,
        database: params.pathname.split('/')[1],
        ssl: true
    };

} else {
    console.log('~~~~~~#3~~~~~~');
    const configs = {
        user: '1ung',
        host: '127.0.0.1',
        database: 'project_2',
        port: 5432
    };
}
//this is the same
const pool = new pg.Pool(configs);

pool.on('error', function (err) {
    console.log('idle client error', err.message, err.stack);
});

module.exports = {
    pool: pool,
    user: user(pool),
    club: club(pool)
};
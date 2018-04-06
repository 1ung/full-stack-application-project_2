const pg = require('pg');
const club = require('./models/club');
const user = require('./models/user');

const configs = {
    user: '1ung',
    host: '127.0.0.1',
    database: 'project_2',
    port: 5432
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
    console.log('idle client error', err.message, err.stack);
});

module.exports = {
    pool: pool,
    user: user(pool)
};
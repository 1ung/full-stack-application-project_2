const bcrypt = require('bcrypt');

module.exports = (dbPool) => {
    return {
        create: (user, callback) => {
            bcrypt.hash(user.password, 1, (err, hashed) => {
                if (err) console.error('error!', err);

                const queryString = 'INSERT INTO users (name, email, password, admin) VALUES ($1, $2, $3, $4) RETURNING id';
                const values = [user.name, user.email, hashed, 'false'];

                dbPool.query(queryString, values, (error, queryResult) => {
                    callback(error, queryResult);
                });
            });
        },

        get: (id, callback) => {

            const queryString = 'SELECT * FROM users WHERE id=$1';
            const values = [id];

            dbPool.query(queryString, values, (error, queryResult) => {
                callback(error, queryResult);
            });
        },

        login: (user, callback) => {

            const queryString = 'SELECT * FROM users WHERE name=$1'
            const values = [user.name];

            dbPool.query(queryString, values, (error, queryResult) => {
                bcrypt.compare(user.password, queryResult.rows[0].password, (err, res) => {
                    if (res) {
                        callback(error, queryResult);
                    } else {
                        callback(error, queryResult);
                    }
                });
            });
        },

        update: (user, callback) => {

            const queryString = 'UPDATE users SET email=$1, img=$2 WHERE id=$3';
            const values = [user.email, user.img, parseInt(user.id)];

            dbPool.query(queryString , values, (error, queryResult) => {
                console.log(queryResult);
                callback(error, queryResult);
            });
        },
    };
};
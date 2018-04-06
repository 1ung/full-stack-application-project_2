module.exports = (dbPool) => {

    return {
        get: (id, callback) => {

            const queryString = 'SELECT * FROM clubs WHERE id=$1';
            const values = [id];

            dbPool.query(queryString, values, (error, queryResult) => {
                callback(error, queryResult);
            });
        }
    };
};
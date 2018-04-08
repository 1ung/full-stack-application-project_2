module.exports = (dbPool) => {

    return {
        get: (id, callback) => {

            const queryString = 'SELECT * FROM clubs WHERE id=$1';
            const values = [id];

            dbPool.query(queryString, values, (error, queryResult) => {
                callback(error, queryResult);
            });
        },

        update: (club, callback) => {

            const queryString = 'UPDATE clubs SET user_id=$1, name=$2, img=$3, location=$4, postal_code=$5, description=$6 WHERE id=$7';
            const values = [club.userid, club.name, club.img, club.location, club.postal_code, club.description, club.id];

            dbPool.query(queryString, values, (error, queryResult) => {
                callback(error, queryResult);
            });
        },

        create: (club, callback) => {
            const queryString = 'INSERT INTO clubs (user_id, name, img, location, postal_code, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id';
            const values = [club.userid, club.name, club.img, club.location, club.postal_code, club.description];

            dbPool.query(queryString, values, (error, queryResult) => {
                callback(error, queryResult);
            });
        },

        delete: (id, callback) => {

            const queryString = 'DELETE FROM clubs WHERE id=$1';
            const values = [id];

            dbPool.query(queryString, values, (error, queryResult) => {
                callback(error, queryResult);
            });
        },

        rating: (id, callback) => {

            const queryString = 'SELECT * FROM reviews WHERE club_id=$1';
            const values = [id];

            dbPool.query(queryString, values, (error, queryResult) => {
                callback(error, queryResult);
            });
        }
        
        // cRating: (club, calback) => {
        //     const queryString = 'INSERT INTO reviews (user_id=$1, club_id=$2, price=$3, size=$4, crowd=$5, music=$6, model=$7, singer=$8, customer_svc=$9, overall=$10) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
        //     const values = [club.userid, club.clubid, ]
        // }

    };
};
const newForm = (request, response) => {

    let loggedIn = request.cookies['loggedIn'];
    let username = request.cookies['username'];

    let context = {
        loggedIn: loggedIn,
        username: username,
    };

    response.render('club/new', context);
};

const clubImage = (db) => {
    return (request, response) => {

        let loggedIn = request.cookies['loggedIn'];
        let username = request.cookies['username'];
        let userid = request.cookies['userid'];

        let context = {
            loggedIn: loggedIn,
            username: username,
            userid: userid
        };

        db.club.get(request.params.id, (error, clubResult) => {

            db.user.get(userid, (error, userResult) => {

                if (error) {
                    console.error(error);
                }
                if (request.params.id == clubResult.rows[0].id) {
                    context.name = clubResult.rows[0].name;
                    context.clubImg = clubResult.rows[0].img;
                    context.postalCode = clubResult.rows[0].postal_code;
                    context.location = clubResult.rows[0].location;
                }
                if (userid == userResult.rows[0].id) {
                    context.userImg = userResult.rows[0].img;
                }
                response.render('club/review', context);
            });
        });
    };
};

module.exports = {
    newForm,
    clubImage
};
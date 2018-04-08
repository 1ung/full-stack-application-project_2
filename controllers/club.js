const newForm = (request, response) => {

    let loggedIn = request.cookies['loggedIn'];
    let username = request.cookies['username'];
    let userid = request.cookies['userid'];
    let admin = request.cookies['admin'];

    let context = {
        loggedIn: loggedIn,
        username: username,
        userid: userid,
        admin: admin
    };

    response.render('club/new', context);
};

const clubImage = (db) => {
    return (request, response) => {

        // if (loggedIn === 'true') {
        let loggedIn = request.cookies['loggedIn'];
        let username = request.cookies['username'];
        let userid = request.cookies['userid'];
        let admin = request.cookies['admin'];

        let context = {
            loggedIn: loggedIn,
            username: username,
            userid: userid,
            admin: admin
        };
        // } else {
        //     alert('Please Log In');
        // }

        db.club.get(request.params.id, (error, clubResult) => {

            let creatorid = clubResult.rows[0].user_id

            db.user.get(creatorid, (error, creatorResult) => {

                db.user.get(userid, (error, userResult) => {

                    db.club.rating(request.params.id, (error, ratingResult) => {

                        if (error) {
                            console.error(error);
                        }
                        if (request.params.id == clubResult.rows[0].id) {
                            context.name = clubResult.rows[0].name;
                            context.clubImg = clubResult.rows[0].img;
                            context.postalCode = clubResult.rows[0].postal_code;
                            context.location = clubResult.rows[0].location;
                            context.clubid = clubResult.rows[0].id;
                            context.description = clubResult.rows[0].description;
                            context.creatorImg = creatorResult.rows[0].img;
                            context.creatorname = creatorResult.rows[0].name;
                            context.userImg = userResult.rows[0].img;
                            context.price = ratingResult.rows[0].price;
                            context.size = ratingResult.rows[0].size;
                            context.crowd = ratingResult.rows[0].crowd;
                            context.music = ratingResult.rows[0].music;
                            context.model = ratingResult.rows[0].model;
                            context.singer = ratingResult.rows[0].singer;
                            context.cust_svc = ratingResult.rows[0].customer_svc;
                            context.overall = Math.round(ratingResult.rows[0].overall * 10) / 10;
                        }
                        if (userid == clubResult.rows[0].user_id || admin === 'true') {
                            context.edit = true;
                        }
                        response.render('club/review', context);
                    });
                });
            });
        });
    };
};

const editForm = (db) => {

    return (request, response) => {

        let loggedIn = request.cookies['loggedIn'];
        let username = request.cookies['username'];
        let userid = request.cookies['userid'];
        let admin = request.cookies['admin'];

        let context = {
            loggedIn: loggedIn,
            username: username,
            userid: userid,
            admin: admin
        };

        db.club.get(request.params.id, (error, queryResult) => {
            if (error) {
                console.error(error);
            }

            let user_id = queryResult.rows[0].user_id;

            if (userid == user_id || admin === 'true') {
                context.clubid = queryResult.rows[0].id;
                context.name = queryResult.rows[0].name;
                context.location = queryResult.rows[0].location;
                context.postalCode = queryResult.rows[0].postal_code;
                context.img = queryResult.rows[0].img;
                context.description = queryResult.rows[0].description;
            }

            response.render('club/edit', context);
        });
    }
};

const editClub = (db) => {
    return (request, response) => {

        let loggedIn = request.cookies['loggedIn'];
        let username = request.cookies['username'];
        let userid = request.cookies['userid'];
        let admin = request.cookies['admin'];

        let context = {
            loggedIn: loggedIn,
            username: username,
            userid: userid,
            admin: admin
        };

        request.body.id = parseInt(request.params.id);
        request.body.userid = parseInt(userid);

        db.club.update(request.body, (error, queryResult) => {
            if (error) {
                console.error(error);
            } else {
                response.redirect('/clubs/' + request.body.id + '/review')
            }
        });
    }
};

const create = (db) => {
    return (request, response) => {

        let userid = request.cookies['userid'];
        request.body.userid = parseInt(userid);
        let clubid = null;

        db.club.create(request.body, (error, queryResult) => {
            if (error) {
                console.error('error creating new club:', error);
                response.sendStatus(500);
            }
            if (queryResult.rowCount >= 1) {
                console.log('Club created successfully');
                clubid = queryResult.rows[0].id;
            } else {
                console.log('Club could not be created');
            }
            response.redirect('/clubs/' + clubid + '/review');
        });
    }
};

const del = (db) => {
    return (request, response) => {

        let clubid = parseInt(request.params.id);
        db.club.delete(clubid, (error, queryResult) => {
            if (error) {
                console.error(error);
            }
            response.redirect('/');
        });

    }
};

module.exports = {
    newForm,
    clubImage,
    editForm,
    editClub,
    del,
    create
};
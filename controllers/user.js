const newForm = (request, response) => {
    response.render('user/new');
};

const editForm = (db) => {
    return (request, response) => {

        let loggedIn = request.cookies['loggedIn'];
        let username = request.cookies['username'];
        let userid = request.cookies['userid'];

        let context = {
            loggedIn: loggedIn,
            username: username,
            userid: userid,
        };

        db.user.get(userid, (error, queryResult) => {
            if (error) {
                console.error(error);
            }

            if (userid == queryResult.rows[0].id) {
                context.email = queryResult.rows[0].email;
                context.avatar = queryResult.rows[0].img;
            }
            response.render('user/edit', context);
        });
    };
};

const profile = (db) => {
    return (request, response) => {

        let loggedIn = request.cookies['loggedIn'];
        let username = request.cookies['username'];
        let userid = request.cookies['userid'];

        db.user.get(userid, (error, queryResult) => {

            if (error) {
                // console.log('ERRRRROR!')
                console.error(error);
            }

            let context = {
                loggedIn: loggedIn,
                username: username,
                userid: userid
            };

            if (userid == queryResult.rows[0].id) {

                context.img = queryResult.rows[0].img;
            }

            response.render('user/profile', context);
        });
    };
};

const create = (db) => {
    return (request, response) => {
        let data = request.body;
        if (data.password !== data.confirmedpassword) {
            let context = {
                passworderror: 'Passwords not matched!'
            };
            response.render('user/new', context);
            return;
        }
        db.user.create(request.body, (error, queryResult) => {
            if (error) {
                console.error('error creating new user:', error);
                response.sendStatus(500);
            }

            if (queryResult.rowCount >= 1) {
                console.log('User created successfully');
                response.cookie('loggedIn', true);
                response.cookie('username', request.body.name);
                response.cookie('userid', queryResult.rows[0].id);
            } else {
                console.log('User could not be created');
            }

            response.redirect('/');
        });

    };
};

const logout = (request, response) => {
    response.clearCookie('loggedIn');
    response.clearCookie('username');
    response.redirect(301, '/');
};

const loginForm = (request, response) => {
    if (request.cookies['loggedIn'] == true) {
        response.redirect('/');
    } else {
        response.render('user/login');
    }
};

const login = (db) => {
    return (request, response) => {
        db.user.login(request.body, (error, queryResult) => {
            if (queryResult) {
                response.cookie('loggedIn', true);
                response.cookie('username', request.body.name);
                response.cookie('userid', queryResult.rows[0].id);
                response.redirect(301, '/');
            } else {
                response.redirect('/users/login');
            }
        });
    };
};

const userUpdate = (db) => {
    return (request, response) => {
        console.log('updating');
        let loggedIn = request.cookies['loggedIn'];
        let username = request.cookies['username'];
        let userid = request.cookies['userid'];

        let context = {
            loggedIn: loggedIn,
            username: username,
            userid: userid
        };

        request.body.id = parseInt(userid);

        db.user.update(request.body, (error, queryResult) => {

            if (error) {
                console.error(error);
            } else {
                response.redirect('/users/' + request.body.id + '/profile');
            }
        });
    }
};

module.exports = {
    newForm,
    create,
    logout,
    loginForm,
    login,
    profile,
    editForm,
    userUpdate
};
const newForm = (request, response) => {
    response.render('user/new');
};

const editForm = (request, response) => {
    let loggedIn = request.cookies['loggedIn'];
    let username = request.cookies['username'];

    db.user.get(request, response(error, queryResult) => {

    let context = {
        loggedIn: loggedIn,
        username: username,
        user: queryResult.rows[0]
    };

    response.render('user/edit', context);
};


const profile = (request, response) => {
    let loggedIn = request.cookies['loggedIn'];
    let username = request.cookies['username'];

    db.user.get(request, response)
    let context = {
        loggedIn: loggedIn,
        username: username,
    };

    response.render('user/profile', context);
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
                response.redirect(301, '/');
            } else {
                response.redirect('/users/login');
            }
        });
    };
};

module.exports = {
    newForm,
    create,
    logout,
    loginForm,
    login,
    profile,
    editForm
};
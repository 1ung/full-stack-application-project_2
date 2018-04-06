const newForm = (request, response) => {

    let loggedIn = request.cookies['loggedIn'];
    let username = request.cookies['username'];

    let context = {
        loggedIn: loggedIn,
        username: username,
    };

    response.render('club/new', context);
};

const clubImage = (request, response) => {

        let loggedIn = request.cookies['loggedIn'];
        let username = request.cookies['username'];

        let context = {
            loggedIn: loggedIn,
            username: username,
        };

        response.render('club/review', context);
    };

    module.exports = {
        newForm,
        clubImage
    };
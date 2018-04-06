const clubs = require('./controllers/club');
const users = require('./controllers/user');

module.exports = (app, db) => {
    
    app.get('/users/new', users.newForm);
    app.post('/users', users.create(db));
    app.get('/users/:id/edit', users.editForm(db));

    app.post('/users/logout', users.logout);
    app.get('/users/login', users.loginForm);
    app.post('/users/login', users.login(db));
    
    app.get('/users/profile', users.profile(db));

    app.get('/clubs/new', clubs.newForm);
    // app.post('/clubs', clubs.create(db));
    app.get('/clubs/review/:id', clubs.clubImage);
};
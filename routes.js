const clubs = require('./controllers/club');
const users = require('./controllers/user');

module.exports = (app, db) => {
    
    app.get('/users/new', users.newForm);  
    app.get('/users/:id/edit', users.editForm(db));
    app.post('/users/logout', users.logout);
    app.get('/users/login', users.loginForm);
    app.post('/users/login', users.login(db));
    app.get('/users/:id/profile', users.profile(db));
    app.put('/users/:id', users.userUpdate(db));
    app.post('/users', users.create(db));


    app.get('/clubs/new', clubs.newForm);
    app.post('/clubs', clubs.create(db));
    app.get('/clubs/:id/review', clubs.clubImage(db));
    app.get('/clubs/:id/edit', clubs.editForm(db));
    app.put('/clubs/:id', clubs.editClub(db));
    app.delete('/clubs/:id', clubs.del(db));
};
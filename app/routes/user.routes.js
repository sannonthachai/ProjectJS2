module.exports = (app) => {
    let user = require('../controllers/user.controllers');

    // Passport Project
    app.route('/signup')
        .get(user.renderSignup)
        .post(user.signup);
    app.route('/login')
        .get(user.renderLogin)
        .post(user.login);
    app.get('/logout',user.logout);

    // body-parser
    app.route('/user')
        .post(user.create)
        .get(user.list);
    app.route('/user/:username')
        .get(user.read)
        .put(user.update)
        .delete(user.delete);
    app.param('username',user.userByUsername);
};
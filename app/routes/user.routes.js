module.exports = (app) => {
    let user = require('../controllers/user.controllers');
    app.post('/login',user.login);
    app.post('/logout',user.logout);
    app.route('/user')
        .post(user.create)
        .get(user.list);
    app.route('/user/:username')
        .get(user.read)
        .put(user.update);
    app.param('username',user.userByUsername);
};
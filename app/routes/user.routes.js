module.exports = (app) => {
    let user = require('../controllers/user.controllers');
    app.post('/login',user.login);
};
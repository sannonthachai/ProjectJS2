module.exports = (app) => {
    let index = require('../controllers/index.controllers');
    app.get('/',index.render);
    app.get('/profile',index.renderProfile);

    app.get('/setCookies',index.cookie);
    app.get('/loginquery',index.queryString);
};
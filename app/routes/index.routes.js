const { ensureAuthenticated, forwardAuthenticated } = require('../../config/forwardauth');

module.exports = (app) => {
    let index = require('../controllers/index.controllers');
    app.get('/',forwardAuthenticated,index.render);
    app.get('/profile',ensureAuthenticated,index.renderProfile);

    app.get('/setCookies',index.cookie);
    app.get('/loginquery',index.queryString);
};
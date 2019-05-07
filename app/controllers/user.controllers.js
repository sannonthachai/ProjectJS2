exports.login = (req,res) => {
    console.log(req.body);
    console.log('Email: ' + req.body.email);
    console.log('Passwaord: ' + req.body.password);

    res.render('index',{
        title: 'Logged in as ' + req.body.email,
        isLoggedIn: true
    });
};

exports.logout = (req,res) => {
    res.render('index',{
        title: 'See you again later',
        isLoggedIn: false
    });
};
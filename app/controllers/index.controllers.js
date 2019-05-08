exports.render = (req,res) => {
    let isLoggedIn = false;

    if (typeof req.session.remember !== 'undefined'){
        isLoggedIn = req.session.remember;
    }

    res.render('index',{
        title: 'Hellow World',
        message: 'How are you',
        isLoggedIn: isLoggedIn
    });
};

exports.cookie = (req,res) => {
    res.cookie("myName","Chai@Sannonthachai",{
        maxAge: 1000 * 60 * 60
    })
    console.log(req.cookies.myName);
    res.end();
};

exports.queryString = (req,res) => {
    res.send('Hellow')
    console.log('Login Query String Check!')
    console.log(req.query)
    console.log(req.query.userName)
};
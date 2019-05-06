exports.render = (req,res) => {
    res.render('index',{
        title : 'Hellow World',
        message : 'How are you'
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

exports.body = (req,res) => {
    res.send('Hellow Body')
    console.log(req.body)
    console.log(req.body.userName);
    console.log(req.body.password);
    res.end();
};
exports.login = (req,res) => {
    console.log(req.body);
    console.log('Email: ' + req.body.email);
    console.log('Passwaord: ' + req.body.passwaord);
};
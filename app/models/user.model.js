const mongoose = require('mongoose');
const bcrypt = require('bcrypt');;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: String,
    lastname: String,
    username: String,
    email: String,
    password: String
});

UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// checking if password is valid
UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

// UserSchema.pre('save', (next) => {
//     if(this.password) {
//         this.salt = new Buffer(crypto.randomBytes(16).toString('base64'),'base64');
//         this.password = this.hashPassword(this.password);
//     }
//     next();
// });

// UserSchema.methods.hashPassword = (password) => {
//     return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
// };

// UserSchema.methods.authenticate = (password) => {
//     return this.password === this.hashPassword(password);
// };

mongoose.model('User',UserSchema);


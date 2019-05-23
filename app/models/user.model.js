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


// checking if password is valid
// UserSchema.methods.validPassword = (password) => {
//     return bcrypt.compareSync(password, this.local.password);
// };

// UserSchema.pre('save', (next) => {
//     if(this.password) {
//         this.password = this.generateHash(this.password);
//     }
//     next();
// });

// UserSchema.methods.generateHash = (password) => {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8),null);
// };
// UserSchema.methods.hashPassword = (password) => {
//     return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
// };

// UserSchema.methods.authenticate = (password) => {
//     return this.password === this.generateHash(password);
// };

mongoose.model('User',UserSchema);


const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: {
        type: String,
        unique: true,
        trim: true,
        required: 'Username is required'
    },
    email: {
        type: String,
        index: true,
        match: /.+\@.+\.+/
    },
    password: {
        type: String,
        validate: [
            (password) => {
                return password && password.length >= 6;
            },
            'Password must be at least 6 characters'
        ]
    },
    salt: {
        type: String
    },
    provider: {
        type: String,
        required: 'Provider is required'
    },
    providerId: String,
    providerData: {},
    created: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', (next) => {
    if(this.password) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'),'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

UserSchema.methods.hashPassword = (password) => {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

UserSchema.methods.authenticate = (password) => {
    return this.password === this.hashPassword(password);
};

mongoose.model('User',UserSchema);

